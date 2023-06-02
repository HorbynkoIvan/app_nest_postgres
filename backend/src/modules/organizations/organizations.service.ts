import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, SelectQueryBuilder } from 'typeorm';
import { UserEntity } from '../users/entities';
import { EntEntity } from '../ents/entities/ent.entity';
import { OrganizationEntity } from './entities/organization.entity';
import {
  CreateOrganizationsInput,
  UpdateOrganizationsInput,
  OrganizationsFilterInput,
  OrganizationOutput,
  OrganizationsPaginationInput,
} from './dto';

@Injectable()
export class OrganizationsService {
  @InjectRepository(OrganizationEntity)
  private readonly organizationRepository: Repository<OrganizationEntity>;

  @InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>;

  @InjectRepository(EntEntity)
  private readonly entRepository: Repository<EntEntity>;

  async createOrganization({
    title,
    image,
    description,
    status,
    parentId,
    ents,
    users,
    creatorId,
  }: CreateOrganizationsInput) {
    const organization = this.organizationRepository.create({
      title,
      image,
      description,
      status,
      parentId,
      creatorId,
    });

    if (users?.length) {
      const dataUsers = await this.userRepository.findBy({
        id: In(users),
      });

      organization.users = dataUsers;
    }

    if (ents?.length) {
      organization.ents = await this.entRepository.findBy({
        id: In(ents),
      });
    }

    await this.organizationRepository.save(organization);

    return this.organizationRepository.findOne({
      where: {
        id: organization.id,
      },
      relations: {
        parent: true,
        users: true,
        subOrganizations: true,
      },
    });
  }

  async updateOrganization(data: UpdateOrganizationsInput) {
    const { id, users, ...fields } = data;

    const organization = await this.organizationRepository.findOne({
      where: {
        id,
      },
      relations: {
        users: true,
        subOrganizations: true,
      },
    });

    if (users?.length) {
      const dataUsers = await this.userRepository.findBy({
        id: In(users),
      });

      organization.users = dataUsers;
    }

    for (const key in fields) {
      organization[key] = fields[key];
    }

    await this.organizationRepository.save(organization);

    return this.organizationRepository.findOne({
      where: {
        id: organization.id,
      },
      relations: {
        parent: true,
        users: true,
        subOrganizations: true,
      },
    });
  }

  async getOrganizations(
    { page, pageSize }: OrganizationsPaginationInput,
    { id, title }: OrganizationsFilterInput,
  ): Promise<OrganizationOutput> {
    const queryBuilder = this.organizationRepository
      .createQueryBuilder('org')
      .leftJoinAndSelect('org.parent', 'parent')
      .leftJoinAndSelect('org.subOrganizations', 'subOrganizations')
      // ToDo uncomment after UserEntity will be refactored
      // .leftJoinAndSelect('org.users', 'users')
      .leftJoinAndSelect('org.ents', 'ents')
      .skip((page - 1) * pageSize)
      .take(pageSize);

    if (id) {
      queryBuilder.andWhere('org.id = :id', { id });
    }

    if (title) {
      queryBuilder.andWhere('org.title ILIKE :title', { title: `%${title}%` });
    }

    const [organizations, totalCount] = await queryBuilder.getManyAndCount();

    return {
      organizations,
      totalCount,
    };
  }

  async getOrganization(id: number) {
    return await this.organizationRepository.findOne({
      where: {
        id,
      },
      relations: {
        parent: true,
        users: true,
        subOrganizations: true,
      },
    });
  }

  async deleteOrganization(id: number) {
    return this.organizationRepository.delete({ id });
  }
}
