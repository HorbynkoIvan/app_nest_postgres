import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, In, Repository } from 'typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { EntEntity } from '../ents/entities/ent.entity';
import { OrganizationEntity } from './entities/organization.entity';
import { PaginationInput } from '../commons/dto';
import {
  CreateOrganizationsInput,
  UpdateOrganizationsInput,
  OrganizationsFilterInput,
  OrganizationOutput,
} from './dto';
import { UsersService } from '../users';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(OrganizationEntity)
    private readonly organizationRepository: Repository<OrganizationEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(EntEntity)
    private readonly entRepository: Repository<EntEntity>,
    private readonly userService: UsersService,
  ) {}

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

    // todo: Get user from request after authorization will be implemented
    const creator = await this.userService.getUser({
      email: 'admin@gmail.com',
    });

    const newOrganization = this.organizationRepository.create({
      ...newOrganizationFields,
      users: dataUsers,
      ents: dataEnts,
      creator,
    });

    await this.organizationRepository.save(newOrganization);

    return this.organizationRepository.findOneOrFail({
      where: {
        id: newOrganization.id,
      },
      relations: [
        'parent',
        'users',
        'ents',
        'subOrganizations',
        'creator',
        'editor',
      ],
    });
  }

  async updateOrganization({
    id,
    usersIds,
    entsIds,
    ...updateData
  }: UpdateOrganizationsInput) {
    const organization = await this.organizationRepository.findOneOrFail({
      where: { id },
      relations: ['users', 'ents', 'creator', 'editor'],
    });

    Object.assign(organization, updateData);

    // Related users and ents update
    const dataUsers = usersIds
      ? await this.userRepository.findBy({ id: In(usersIds) })
      : [];

    const dataEnts = entsIds
      ? await this.entRepository.findBy({ id: In(entsIds) })
      : [];

    organization.users = dataUsers;
    organization.ents = dataEnts;

    organization.editor = await this.userService.getUser({
      email: 'admin@gmail.com',
    });

    await this.organizationRepository.save(organization);

    return organization;
  }

  async getOrganizations(
    { page, pageSize }: PaginationInput = {},
    { id, title }: OrganizationsFilterInput = {},
  ): Promise<OrganizationOutput> {
    const queryBuilder = this.organizationRepository
      .createQueryBuilder('org')
      .leftJoinAndSelect('org.parent', 'parent')
      .leftJoinAndSelect('org.subOrganizations', 'subOrganizations')
      .leftJoinAndSelect('org.users', 'users')
      .leftJoinAndSelect('org.ents', 'ents')
      .leftJoinAndSelect('org.creator', 'creator')
      .leftJoinAndSelect('org.editor', 'editor');

    if (id) {
      queryBuilder.andWhere('org.id = :id', { id });
    }

    if (title) {
      queryBuilder.andWhere('org.title ILIKE :title', { title: `%${title}%` });
    }

    if (page && pageSize) {
      queryBuilder.skip((page - 1) * pageSize).take(pageSize);
    }

    const [organizations, totalCount] = await queryBuilder.getManyAndCount();

    return {
      organizations,
      totalCount,
    };
  }

  async getOrganization(id: number): Promise<OrganizationEntity | null> {
    const options: FindOneOptions<OrganizationEntity> = {
      where: { id },
      relations: [
        'parent',
        'users',
        'subOrganizations',
        'ents',
        'creator',
        'editor',
      ],
    };

    const organization = await this.organizationRepository.findOne(options);

    if (!organization) {
      return null;
    }

    return organization;
  }

  async deleteOrganization(id: number) {
    return this.organizationRepository.delete({ id });
  }
}
