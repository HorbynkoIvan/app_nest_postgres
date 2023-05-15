import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgencyEntity } from '../../entities/agency.entity';
import { UpdateAgencyInput } from '../../dto/update-agency.input';
import { CreateAgencyInput } from '../../dto/create-agency.input';
import { GetAgenciesInput } from '../../dto/get-agencies.input';

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

  async getAgencies({ types }: GetAgenciesInput): Promise<AgencyEntity[]> {
    const query = this.agencyRepository.createQueryBuilder('agency');

    if (types && types.length > 0) {
      query.where('agency.type IN (:...types)', { types });
    }

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
