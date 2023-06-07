import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CryptoService } from '../crypto/service';
import { UserEntity } from './entities/user.entity';
import {
  CreateUserInput,
  GetUserInput,
  GetUsersFiltersInput,
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

  async getUser({ id, email }: GetUserInput): Promise<UserEntity> {
    return await this.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.organizations', 'organizations')
      .where('user.id = :id OR user.email = :email', { id, email })
      .getOne();
  }

  async getUsers(
    { page, pageSize }: PaginationInput,
    { loginTypes }: GetUsersFiltersInput,
  ): Promise<GetUsersOutput> {
    const queryBuilder: SelectQueryBuilder<UserEntity> =
      this.repository.createQueryBuilder('user');

    queryBuilder.leftJoinAndSelect('user.organizations', 'organizations');

    if (loginTypes?.length > 0) {
      queryBuilder.where('user.loginType IN (:...loginTypes)', { loginTypes });
    }

    const [users, totalCount] = await queryBuilder
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return { users, totalCount };
  }

  async createUser({
    username,
    email,
    loginType,
    password,
  }: CreateUserInput): Promise<UserEntity> {
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
