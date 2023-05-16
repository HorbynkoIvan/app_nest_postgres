import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgencyEntity } from '../../entities/agency.entity';
import { UpdateAgencyInput } from '../../dto/update-agency.input';
import { CreateAgencyInput } from '../../dto/create-agency.input';
import { GetAgenciesInput } from '../../dto/get-agencies.input';
import { PaginationInput } from '../../dto/pagination.input';

@Injectable()
export class AgencyService {
  constructor(
    @InjectRepository(AgencyEntity)
    private readonly agencyRepository: Repository<AgencyEntity>,
  ) {}

  async createAgency(
    createAgencyInput: CreateAgencyInput,
  ): Promise<AgencyEntity> {
    const agency = this.agencyRepository.create(createAgencyInput);

    return await this.agencyRepository.save(agency);
  }

  async getAgencies(
    filterInput: GetAgenciesInput,
    paginationInput: PaginationInput,
  ): Promise<AgencyEntity[]> {
    const { page, perPage } = paginationInput;
    const query = this.agencyRepository.createQueryBuilder('agency');

    if (filterInput) {
      const { id, types, title, parentId } = filterInput;

      if (id) {
        query.andWhere('agency.id = :id', { id });
      }

      if (parentId) {
        query.andWhere('agency.parentId = :parentId', { parentId });
      }

      if (types && types.length > 0) {
        query.andWhere('agency.type IN (:...types)', { types });
      }

      //ILIKE performs a case-insensitive search
      //LIKE - case-sensitive
      if (title) {
        query.andWhere('agency.title ILIKE :title', { title: `%${title}%` });
      }
    }

    query.skip((page - 1) * perPage).take(perPage);

    return await query.getMany();
  }

  async getAgency(id: number): Promise<AgencyEntity | undefined> {
    const agency = await this.agencyRepository.findOne({
      where: { id },
    });

    if (!agency) {
      throw new NotFoundException(`Agency with ID ${id} not found`);
    }

    return agency;
  }

  async removeAgency(id: number): Promise<number> {
    await this.agencyRepository.delete({ id });

    return id;
  }

  async updateAgency(
    updateAgencyInput: UpdateAgencyInput,
  ): Promise<AgencyEntity> {
    const { id, ...agencyData } = updateAgencyInput;
    await this.agencyRepository.update(id, agencyData);

    return await this.agencyRepository.findOne({
      where: { id },
    });
  }
}
