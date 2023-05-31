import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UserEntity } from '../users/entities';

import { OrgEntity } from './entities/org.entity';
import { CreateOrganizationsInput, UpdateOrganizationsInput } from './dto';
import { EntEntity } from '../ents/entities/ent.entity';

@Injectable()
export class OrganizationsService {
  @InjectRepository(OrgEntity)
  private readonly repository: Repository<OrgEntity>;

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
    const organization = this.repository.create({
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

    await this.repository.save(organization);

    return this.repository.findOne({
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

    const organization = await this.repository.findOne({
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

    await this.repository.save(organization);

    return this.repository.findOne({
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

  async getOrganizations() {
    return this.repository.find({
      relations: { parent: true, users: true, subOrganizations: true },
    });
  }

  async getOrganization(id: number) {
    return await this.repository.findOne({
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
    return this.repository.delete({ id });
  }
}
