import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserInput } from '../../inputs/update-user.input';
import { GetUsersInput } from '../../inputs/get-users.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserInput: UserEntity): Promise<UserEntity> {
    return await this.userRepository.save({ ...createUserInput });
  }

  async getUsers({ roles }: GetUsersInput): Promise<UserEntity[]> {
    const query = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile');

    if (roles && roles.length > 0) {
      query.andWhere('profile.role IN (:...roles)', { roles });
    }
    return await query.getMany();
  }

  async getUser(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { id },
      relations: { profile: true },
    });
  }

  async removeUser(id: number): Promise<number> {
    await this.userRepository.delete({ id });
    return id;
  }

  async updateUser(updateUserInput: UpdateUserInput): Promise<UserEntity> {
    await this.userRepository.update(
      { id: updateUserInput.id },
      { ...updateUserInput },
    );
    return await this.getUser(updateUserInput.id);
  }
}
