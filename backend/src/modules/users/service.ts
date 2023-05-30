import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import {
  CreateUserInput,
  DeleteUserInput,
  UpdateUserInput,
  GetUserInput,
  GetUsersInput,
} from './inputs';
import { UserEntity } from './entities';
import { CryptoService } from '../crypto/service';

@Injectable()
export class UsersService {
  @InjectRepository(UserEntity)
  private readonly repository: Repository<UserEntity>;

  constructor(private cryptoService: CryptoService) {}

  async getUser({ id, email }: GetUserInput): Promise<UserEntity> {
    return this.repository.findOneBy({ id, email });
  }

  async getUsers({ roles }: GetUsersInput): Promise<UserEntity[]> {
    const queryBuilder: SelectQueryBuilder<UserEntity> =
      this.repository.createQueryBuilder('user');

    queryBuilder.leftJoinAndSelect('user.organizations', 'organizations');

    if (roles?.length > 0) {
      queryBuilder.where('user.role IN (:...roles)', { roles });
    }

    return queryBuilder.getMany();
  }

  async createUser({
    username,
    email,
    role,
    password,
  }: CreateUserInput): Promise<UserEntity> {
    const passwordHash = await this.cryptoService.cryptoPassword(password);

    const user = this.repository.create({
      username,
      email,
      role,
      password: passwordHash,
    });

    return this.repository.save(user);
  }

  async updateUser({ id, username, email, role }: UpdateUserInput) {
    const query = this.repository.createQueryBuilder();

    query.where('id = :id', { id: id });

    username && query.andWhere(`username = :username`, { username });
    email && query.andWhere(`email = :email`, { email });
    role && query.andWhere(`role = :role`, { role });

    return query.execute();
  }

  async deleteUser({ id }: DeleteUserInput) {
    return this.repository.delete(id);
  }
}
