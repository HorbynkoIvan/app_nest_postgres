import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, SelectQueryBuilder } from 'typeorm';
import { UserEntity } from '../users/entities';
import { EntEntity } from '../ents/entities/ent.entity';
import { OrgEntity } from './entities/org.entity';
import { CreateOrganizationsInput, UpdateOrganizationsInput } from './dto';

@Injectable()
export class OrganizationsService {
  @InjectRepository(OrgEntity)
  private readonly orgRepository: Repository<OrgEntity>;

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
    const organization = this.orgRepository.create({
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

    await this.orgRepository.save(organization);

    return this.orgRepository.findOne({
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

    const organization = await this.orgRepository.findOne({
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

    await this.orgRepository.save(organization);

    return this.orgRepository.findOne({
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
    const queryBuilder: SelectQueryBuilder<OrgEntity> =
      this.orgRepository.createQueryBuilder('org');

    queryBuilder.leftJoinAndSelect('org.parent', 'parent');
    queryBuilder.leftJoinAndSelect('org.subOrganizations', 'subOrganizations');
    // ToDo uncomment after UserEntity will be refactored
    // queryBuilder.leftJoinAndSelect('org.users', 'users');
    queryBuilder.leftJoinAndSelect('org.ents', 'ents');

    return queryBuilder.getMany();
  }

  async getOrganization(id: number) {
    return await this.orgRepository.findOne({
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
    return this.orgRepository.delete({ id });
  }
}
