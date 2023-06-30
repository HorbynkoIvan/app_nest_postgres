import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfileEntity } from './entities/user-profile.entity';
import { QueryPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { CreateUserProfileInput, UpdateUserProfileInput } from './dto';
import { UsersService } from './users.service';

@Injectable()
export class UserProfileService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(UserProfileEntity)
    private readonly repository: Repository<UserProfileEntity>,
  ) {}

  async getUserProfile(id: number): Promise<UserProfileEntity> {
    return await this.repository.findOne({
      relations: ['user'],
      where: { user: { id } },
    });
  }

  async createUserProfile({
    userId,
    firstName,
    lastName,
    picture,
  }: CreateUserProfileInput): Promise<UserProfileEntity> {
    const userProfile = this.repository.create({
      userId,
      firstName,
      lastName,
      picture,
    });

    userProfile.user = await this.usersService.getUser({ id: userId });

    return this.repository.save(userProfile);
  }

  async updateUserProfile(
    updateUserProfileInput: UpdateUserProfileInput,
  ): Promise<UserProfileEntity> {
    const { userId, ...userData } = updateUserProfileInput;
    const {
      profile: { id },
    } = await this.usersService.getUser({ id: userId });

    await this.repository.update(id, {
      ...(userData as QueryPartialEntity<UserProfileEntity>),
    });

    return this.getUserProfile(userId);
  }

  async deleteUserProfile(userId: number): Promise<boolean> {
    const {
      profile: { id },
    } = await this.usersService.getUser({ id: userId });

    try {
      const result = await this.repository.delete(id);
      return result.affected > 0;
    } catch (e) {
      throw new Error('Error deleting user profile');
    }
  }
}
