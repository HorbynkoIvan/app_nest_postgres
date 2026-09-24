import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { OrganizationEntity } from './entities/organization.entity';
import { PaginationInput } from '../commons/dto';
import {
  CreateOrganizationInput,
  UpdateOrganizationsInput,
  OrganizationsFilterInput,
  OrganizationOutput,
} from './dto';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(OrganizationEntity)
    private readonly organizationRepository: Repository<OrganizationEntity>,
  ) {}

  async createOrganization(input: CreateOrganizationInput) {
    const newOrganization = this.organizationRepository.create(input);

    await this.organizationRepository.save(newOrganization);

    return this.organizationRepository.findOneOrFail({
      where: {
        id: newOrganization.id,
      },
    });
  }

  async updateOrganization({ id, ...updateData }: UpdateOrganizationsInput) {
    const organization = await this.organizationRepository.findOneOrFail({
      where: { id },
    });

    Object.assign(organization, updateData);

    await this.organizationRepository.save(organization);

    return this.organizationRepository.findOneOrFail({
      where: { id },
      relations: ['projects'],
    });
  }

  async getOrganizations(
    { page, pageSize }: PaginationInput = {},
    { id, name }: OrganizationsFilterInput = {},
  ): Promise<OrganizationOutput> {
    const [organizations, totalCount] =
      await this.organizationRepository.findAndCount({
        where: {
          ...(id !== undefined && { id }),
          ...(name && { name: ILike(`%${name}%`) }),
        },
        relations: ['projects'],
        ...(page !== undefined &&
          pageSize !== undefined && {
            skip: (page - 1) * pageSize,
            take: pageSize,
          }),
      });

    return {
      organizations,
      totalCount,
    };
  }

  async getOrganization(id: number): Promise<OrganizationEntity | null> {
    return this.organizationRepository.findOne({
      where: [{ id }],
      relations: ['projects'],
    });
  }

  async deleteOrganization(id: number) {
    return this.organizationRepository.delete({ id });
  }
}
