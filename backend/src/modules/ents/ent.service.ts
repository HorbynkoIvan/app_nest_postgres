import { Injectable } from '@nestjs/common';
import { CreateEntInput } from './dto/create-ent.input';
import { UpdateEntInput } from './dto/update-ent.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { UsersService } from '../users';
import { EntEntity } from './entities/ent.entity';
import { FilterInput, UsersPaginationInput } from './dto/list-ent.input';
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
    paginationInput: UsersPaginationInput,
    filterInput: FilterInput,
  ): Promise<GetEntsOutput> {
    const queryBuilder: SelectQueryBuilder<EntEntity> =
      this.entsRepository.createQueryBuilder('ent');

    queryBuilder.leftJoinAndSelect('ent.parent', 'parent');
    queryBuilder.leftJoinAndSelect('ent.organizations', 'organizations');
    queryBuilder.leftJoinAndSelect('ent.creator', 'creator');
    queryBuilder.leftJoinAndSelect('ent.editor', 'editor');
    queryBuilder.loadRelationCountAndMap(
      'ent.dependentCount',
      'ent.dependents',
    );

    if (filterInput?.types?.length) {
      queryBuilder.andWhere('ent.type IN (:...types)', {
        types: filterInput.types,
      });
    }

    if (filterInput?.title) {
      queryBuilder.andWhere('ent.title ILIKE :title', {
        title: `%${filterInput.title}%`,
      });
    }

    if (filterInput?.id) {
      queryBuilder.andWhere('ent.id = :id', { id: filterInput.id });
    }

    const [ents, totalCount] = await queryBuilder
      .skip((paginationInput.page - 1) * paginationInput.pageSize)
      .take(paginationInput.pageSize)
      .getManyAndCount();

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
