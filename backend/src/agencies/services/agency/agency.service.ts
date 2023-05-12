import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgencyEntity } from '../../entities/agency.entity';
import { UpdateAgencyInput } from '../../inputs/update-agency.input';
import { CreateAgencyInput } from '../../inputs/create-agency.input';
import { GetAgenciesInput } from '../../inputs/get-agencies.input';

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

  async getAgencies({ type }: GetAgenciesInput): Promise<AgencyEntity[]> {
    return await this.agencyRepository.find();
  }

  async getAgency(id: number): Promise<AgencyEntity> {
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
