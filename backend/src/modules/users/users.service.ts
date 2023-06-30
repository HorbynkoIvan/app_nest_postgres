import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CryptoService } from '../crypto/service';
import { UserEntity } from './entities/user.entity';
import {
  CreateUserInput,
  GetUserInput,
  UsersFilterInput,
  UpdateUserInput,
} from './dto';
import { PaginationInput } from '../commons/dto';
import { GetUsersOutput } from './dto/list-user.output';

@Injectable()
export class UsersService {
  constructor(
    private cryptoService: CryptoService,
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  private async checkUniqueField(
    field: string,
    value: string | number,
  ): Promise<void> {
    const exists = await this.getUser({ [field]: value });
    if (exists) {
      throw new ConflictException(`A user with this ${field} already exists.`);
    }
  }

  async getUser({ id, email, username }: GetUserInput): Promise<UserEntity> {
    return this.repository.findOne({
      where: [{ id }, { email }, { username }],
      relations: ['organizations', 'profile'],
    });
  }

  async getUsers(
    { page, pageSize }: PaginationInput = {},
    { id, username, loginTypes, organizationId, status }: UsersFilterInput = {},
  ): Promise<GetUsersOutput> {
    const queryBuilder: SelectQueryBuilder<UserEntity> = this.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.organizations', 'organizations');

    if (loginTypes?.length > 0) {
      queryBuilder.where('user.loginType IN (:...loginTypes)', { loginTypes });
    }

    if (username) {
      queryBuilder.andWhere('user.username ILIKE :username', {
        username: `%${username}%`,
      });
    }

    if (id) {
      queryBuilder.andWhere('user.id = :id', { id });
    }

    if (organizationId) {
      queryBuilder
        .leftJoin('user.organizations', 'org')
        .andWhere('org.id = :organizationId', { organizationId });
    }

    if (status) {
      queryBuilder.andWhere('user.status = :status', { status });
    }

    if (page && pageSize) {
      queryBuilder.skip((page - 1) * pageSize).take(pageSize);
    }

    const [users, totalCount] = await queryBuilder.getManyAndCount();

    return { users, totalCount };
  }

  async createUser({
    username,
    email,
    loginType,
    password,
  }: CreateUserInput): Promise<UserEntity> {
    if (username) {
      await this.checkUniqueField('username', username);
    }

    if (email) {
      await this.checkUniqueField('email', email);
    }

    const passwordHash = await this.cryptoService.cryptoPassword(password);

    const user = this.repository.create({
      username,
      email,
      loginType,
      password: passwordHash,
    });

    return this.repository.save(user);
  }

  async updateUser(updateUserInput: UpdateUserInput): Promise<UserEntity> {
    const { id, ...userData } = updateUserInput;

    await this.repository.update(id, { ...userData });

    return this.getUser({ id });
  }

  async deleteUser(id: number) {
    return this.repository.delete(id);
  }
}
