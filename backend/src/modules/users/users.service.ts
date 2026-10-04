import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';
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
    private readonly cryptoService: CryptoService,
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  private async checkUniqueField(
    field: 'username' | 'email',
    value: string,
  ): Promise<void> {
    const exists = await this.getUser({ [field]: value });

    if (exists) {
      throw new ConflictException(`A user with this ${field} already exists.`);
    }
  }

  async getUser({
    id,
    email,
    username,
  }: GetUserInput): Promise<UserEntity | null> {
    return this.repository.findOne({
      where: [{ id }, { email }, { username }],
      relations: ['profile'],
    });
  }

  async getUsers(
    { page, pageSize }: PaginationInput = {},
    { id, username, roles, status }: UsersFilterInput = {},
  ): Promise<GetUsersOutput> {
    const [users, totalCount] = await this.repository.findAndCount({
      where: {
        ...(id !== undefined && { id }),
        ...(username && { username: ILike(`%${username}%`) }),
        ...(status !== undefined && { status }),
        ...(roles?.length && { role: In(roles) }),
      },
      relations: ['profile'],
      ...(page !== undefined &&
        pageSize !== undefined && {
          skip: (page - 1) * pageSize,
          take: pageSize,
        }),
    });

    return {
      users,
      totalCount,
    };
  }

  async createUser({
    username,
    email,
    role,
    password,
  }: CreateUserInput): Promise<UserEntity> {
    if (username) {
      await this.checkUniqueField('username', username);
    }

    if (email) {
      await this.checkUniqueField('email', email);
    }

    const passwordHash = await this.cryptoService.hashPassword(password);

    const user = this.repository.create({
      username,
      email,
      role,
      password: passwordHash,
    });

    return this.repository.save(user);
  }

  async updateUser(updateUserInput: UpdateUserInput): Promise<UserEntity> {
    const { id, ...userData } = updateUserInput;

    await this.repository.update(id, { ...userData });

    return this.getUser({ id });
  }

  async deleteUser(id: number):Promise<boolean> {
    const result = await this.repository.delete(id);

    return (result.affected ?? 0) > 0;
  }
}
