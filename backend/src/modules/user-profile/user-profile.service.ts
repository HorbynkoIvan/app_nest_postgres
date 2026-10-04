import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfileEntity } from './entities/user-profile.entity';
import { CreateUserProfileInput, UpdateUserProfileInput } from './dto';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfileEntity)
    private readonly repository: Repository<UserProfileEntity>,
  ) {}

  // async getUserProfile(id: number): Promise<UserProfileEntity> {
  //   return this.repository.findOne({
  //     relations: ['user'],
  //     where: { user: { id } },
  //   });
  // }
  async getUserProfile(userId: number): Promise<UserProfileEntity | null> {
    return this.repository.findOne({
      where: {
        userId,
      },
      relations: ['user'],
    });
  }

  // async createUserProfile({
  //   userId,
  //   firstName,
  //   lastName,
  //   picture,
  // }: CreateUserProfileInput): Promise<UserProfileEntity> {
  //   const userProfile = this.repository.create({
  //     userId,
  //     firstName,
  //     lastName,
  //     picture,
  //   });
  //
  //   userProfile.user = await this.usersService.getUser({ id: userId });
  //
  //   return this.repository.save(userProfile);
  // }
  async createUserProfile(
    input: CreateUserProfileInput,
  ): Promise<UserProfileEntity> {
    const userProfile = this.repository.create(input);

    return this.repository.save(userProfile);
  }

  // async updateUserProfile(
  //   updateUserProfileInput: UpdateUserProfileInput,
  // ): Promise<UserProfileEntity> {
  //   const { userId, ...userData } = updateUserProfileInput;
  //   const {
  //     profile: { id },
  //   } = await this.usersService.getUser({ id: userId });
  //
  //   await this.repository.update(id, {
  //     ...(userData as QueryPartialEntity<UserProfileEntity>),
  //   });
  //
  //   return this.getUserProfile(userId);
  // }

  async updateUserProfile(
    input: UpdateUserProfileInput,
  ): Promise<UserProfileEntity> {
    const { userId, ...profileData } = input;

    const profile = await this.repository.findOne({
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundException(`User profile for user ${userId} not found`);
    }

    Object.assign(profile, profileData);

    return this.repository.save(profile);
  }

  async deleteUserProfile(userId: number): Promise<boolean> {
    try {
      const result = await this.repository.delete(userId);

      return (result.affected ?? 0) > 0;
    } catch {
      // TODO: Review error handling here.
      // Decide whether to preserve the original error or let repository errors propagate.
      throw new Error('Error deleting user profile');
    }
  }
}
