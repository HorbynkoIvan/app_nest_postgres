import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserInput } from '../../inputs/update-user.input';
import { GetUsersInput } from '../../inputs/get-users.input';
import { ProfileEntity } from '../../entities/profile.entity';
import { CreateUserInput } from '../../inputs/create-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
  ) {}

  async createUser(createUserInput: CreateUserInput): Promise<UserEntity> {
    const { email, userName, firstName, lastName, age, city, role } =
      createUserInput;

    // Проверяем наличие обязательных полей
    if (!email || !userName) {
      throw new BadRequestException('Email and userName are required');
    }

    // Создаем профиль с помощью репозитория
    const profile = await this.profileRepository.create({
      firstName,
      lastName,
      age,
      city,
      role,
    });

    // Создаем пользователя и связываем его с профилем
    const user = new UserEntity();
    user.email = email;
    user.userName = userName;
    user.profile = profile;

    // Сохраняем пользователя и профиль в базе данных
    const savedProfile = await this.profileRepository.save(profile);
    user.profile = savedProfile;
    return await this.userRepository.save(user);
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
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { profile: true },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
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
