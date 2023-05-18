import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserInput } from '../../dto/update-user.input';
import { GetUsersInput } from '../../dto/get-users.input';
import { ProfileEntity } from '../../entities/profile.entity';
import { CreateUserInput } from '../../dto/create-user.input';

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
    const user = this.userRepository.create({
      email,
      userName,
      profile,
    });

    // Сохраняем пользователя и профиль в базе данных
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
    try {
      return await this.userRepository.findOneOrFail({
        where: { id },
        relations: { profile: true },
      });
    } catch (error) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async removeUser(id: number): Promise<number> {
    await this.userRepository.delete({ id });
    return id;
  }

  async updateUser(updateUserInput: UpdateUserInput): Promise<UserEntity> {
    const { id, email, userName, firstName, lastName, age, city, role } =
      updateUserInput;

    // Проверяем наличие обязательных полей
    if (!email || !userName) {
      throw new BadRequestException('Email and userName are required');
    }

    // Получаем существующего пользователя
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { profile: true },
    });

    // Обновляем поля пользователя
    user.email = email;
    user.userName = userName;

    // Получаем профиль пользователя
    const profile = user.profile;

    // Обновляем поля профиля
    profile.firstName = firstName;
    profile.lastName = lastName;
    profile.age = age;
    profile.city = city;
    profile.role = role;

    // Сохраняем изменения в базе данных
    return await this.userRepository.save(user);
  }
}