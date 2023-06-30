import { Injectable } from '@nestjs/common';
import { CreateEntInput } from './dto/create-ent.input';
import { UpdateEntInput } from './dto/update-ent.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { UsersService } from '../users';
import { EntEntity } from './entities/ent.entity';
import { FilterInput } from './dto/filter.input';
import { PaginationInput, SortInput } from '../commons/dto';
import { GetEntsOutput } from './dto/list-ent.output';
import { GetEntOutput } from './dto/details-ent.output';

@Injectable()
export class EntService {
  constructor(
    @InjectRepository(EntEntity)
    private readonly entsRepository: Repository<EntEntity>,
    private readonly userService: UsersService,
  ) {}

  async getEnt(id: number): Promise<GetEntOutput> {
    return await this.entsRepository.findOneOrFail({
      where: { id },
      relations: {
        parent: true,
        dependents: true,
        organizations: true,
        creator: true,
        editor: true,
      },
    });
  }

  async getEnts(
    { page, pageSize }: PaginationInput = {},
    { id, title, types }: FilterInput = {},
    { sortOrderById }: SortInput = {},
  ): Promise<GetEntsOutput> {
    const queryBuilder: SelectQueryBuilder<EntEntity> = this.entsRepository
      .createQueryBuilder('ent')
      .orderBy('ent.id', sortOrderById)
      .leftJoinAndSelect('ent.parent', 'parent')
      .leftJoinAndSelect('ent.organizations', 'organizations')
      .leftJoinAndSelect('ent.creator', 'creator')
      .leftJoinAndSelect('ent.editor', 'editor')
      .loadRelationCountAndMap('ent.dependentCount', 'ent.dependents');

    if (types?.length) {
      queryBuilder.andWhere('ent.type IN (:...types)', {
        types,
      });
    }

    if (title) {
      queryBuilder.andWhere('ent.title ILIKE :title', {
        title: `%${title}%`,
      });
    }

    if (id) {
      queryBuilder.andWhere('ent.id = :id', { id: id });
    }

    if (page && pageSize) {
      queryBuilder.skip((page - 1) * pageSize).take(pageSize);
    }

    const [ents, totalCount] = await queryBuilder.getManyAndCount();

    return { ents, totalCount };
  }

  async create(createEntInput: CreateEntInput): Promise<GetEntOutput> {
    const { parentId, ...entData } = createEntInput;

    const ent = this.entsRepository.create(entData);

    // todo: Get user from request after authorization will be implemented
    ent.creator = await this.userService.getUser({
      email: 'admin@gmail.com',
    });

    if (parentId) {
      ent.parent = await this.getEnt(parentId);
    }

    await this.entsRepository.insert(ent);

    return await this.getEnt(ent.id);
  }

  async updateEnt(updateEntInput: UpdateEntInput): Promise<GetEntOutput> {
    const { id, parentId, ...entData } = updateEntInput;

    // todo: Get user from request after authorization will be implemented
    const editor = await this.userService.getUser({
      email: 'admin@gmail.com',
    });

    const editDate = new Date();

    const parent = await this.getEnt(parentId);

    await this.entsRepository.update(id, {
      ...entData,
      parent,
      editor,
      editDate,
    });

    return await this.getEnt(id);
  }

  async deleteEnt(id: number): Promise<number> {
    await this.entsRepository.delete(id);

    return id;
  }
}
