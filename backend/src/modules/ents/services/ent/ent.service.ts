import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntEntity } from '../../entities/ent.entity';
import { UpdateEntInput } from '../../dto/update-ent.input';
import { CreateEntInput } from '../../dto/create-ent.input';
import { GetEntInput } from '../../dto/get-ent.input';
import { PaginationInput } from '../../dto/pagination.input';

type EntsType = {
  ents: EntEntity[];
  totalCount: number;
};

@Injectable()
export class EntService {
  constructor(
    @InjectRepository(EntEntity)
    private readonly entRepository: Repository<EntEntity>,
  ) {}

  async createEnt(createEntInput: CreateEntInput): Promise<EntEntity> {
    const ent = this.entRepository.create(createEntInput);

    return await this.entRepository.save(ent);
  }

  async getEnts(
    filterInput: GetEntInput,
    paginationInput: PaginationInput,
  ): Promise<EntsType> {
    const { page, pageSize } = paginationInput;
    const query = this.entRepository.createQueryBuilder('ent');

    if (filterInput) {
      const { id, types, title, parentId } = filterInput;

      if (id) {
        query.andWhere('ent.id = :id', { id });
      }

      if (parentId) {
        query.andWhere('ent.parentId = :parentId', { parentId });
      }

      if (types && types.length > 0) {
        query.andWhere('ent.type IN (:...types)', { types });
      }

      //ILIKE performs a case-insensitive search
      //LIKE - case-sensitive
      if (title) {
        query.andWhere('ent.title ILIKE :title', { title: `%${title}%` });
      }
    }

    query.skip((page - 1) * pageSize).take(pageSize);

    // const agencies = await query.getMany();
    const [ents, totalCount] = await query.getManyAndCount();

    return { ents, totalCount };
  }

  async getEnt(id: number): Promise<EntEntity | undefined> {
    const ent = await this.entRepository.findOne({
      where: { id },
    });

    if (!ent) {
      throw new NotFoundException(`Ent with ID ${id} not found`);
    }

    return ent;
  }

  async removeEnt(id: number): Promise<number> {
    await this.entRepository.delete({ id });

    return id;
  }

  async updateEnt(updateEntInput: UpdateEntInput): Promise<EntEntity> {
    const { id, ...entData } = updateEntInput;
    await this.entRepository.update(id, entData);

    return await this.entRepository.findOne({
      where: { id },
    });
  }

  //need for seeds
  async getEntsCount(): Promise<number> {
    return await this.entRepository.count();
  }
}
