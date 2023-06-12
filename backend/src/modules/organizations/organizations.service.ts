import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, In, Repository } from 'typeorm';
import { UserEntity } from '../users/entities/user.entity';
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
    entsIds,
    usersIds,
    ...newOrganizationFields
  }: CreateOrganizationsInput) {
    // Related users and ents
    const dataUsers = usersIds
      ? await this.userRepository.findBy({ id: In(usersIds) })
      : [];
    const dataEnts = entsIds
      ? await this.entRepository.findBy({ id: In(entsIds) })
      : [];

    const newOrganization = this.organizationRepository.create({
      ...newOrganizationFields,
      users: dataUsers,
      ents: dataEnts,
    });

    await this.organizationRepository.save(newOrganization);

    return this.organizationRepository.findOneOrFail({
      where: {
        id: newOrganization.id,
      },
      relations: ['parent', 'users', 'subOrganizations'],
    });
  }

  async updateOrganization({
    id,
    title,
    image,
    description,
    status,
    parentId,
    creatorId,
    entsIds,
    usersIds,
  }: UpdateOrganizationsInput) {
    const organization = await this.organizationRepository.findOneOrFail({
      where: { id },
      relations: ['users', 'ents'],
    });

    // Update organization fields
    organization.title = title ?? organization.title;
    organization.image = image ?? organization.image;
    organization.description = description ?? organization.description;
    organization.status = status ?? organization.status;
    organization.parentId = parentId ?? organization.parentId;
    organization.creatorId = creatorId ?? organization.creatorId;

    // Related users and ents update
    const dataUsers = usersIds
      ? await this.userRepository.findBy({ id: In(usersIds) })
      : [];

    const dataEnts = entsIds
      ? await this.entRepository.findBy({ id: In(entsIds) })
      : [];

    organization.users = dataUsers;
    organization.ents = dataEnts;

    await this.organizationRepository.save(organization);

    return organization;
  }

  async getOrganizations(
    { page, pageSize, getAll }: OrganizationsPaginationInput,
    { id, title }: OrganizationsFilterInput,
  ): Promise<OrganizationOutput> {
    const queryBuilder = this.organizationRepository
      .createQueryBuilder('org')
      .leftJoinAndSelect('org.parent', 'parent')
      .leftJoinAndSelect('org.subOrganizations', 'subOrganizations')
      .leftJoinAndSelect('org.users', 'users')
      .leftJoinAndSelect('org.ents', 'ents');

    if (id) {
      queryBuilder.andWhere('org.id = :id', { id });
    }

    if (title) {
      queryBuilder.andWhere('org.title ILIKE :title', { title: `%${title}%` });
    }

    if (!getAll) {
      queryBuilder.skip((page - 1) * pageSize).take(pageSize);
    }

    const [organizations, totalCount] = await queryBuilder.getManyAndCount();

    return {
      organizations,
      totalCount,
    };
  }

  async getOrganization(id: number): Promise<OrganizationEntity | null> {
    try {
      return await this.organizationRepository.findOne({
        where: {
          id,
        },
        relations: {
          parent: true,
          users: true,
          subOrganizations: true,
          ents: true,
        },
      });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        return null;
      }
      throw error;
    }
  }

  async deleteOrganization(id: number) {
    return this.organizationRepository.delete({ id });
  }
}
