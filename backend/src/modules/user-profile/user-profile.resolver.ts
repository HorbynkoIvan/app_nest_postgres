import { Args, Int, Query, Resolver, Mutation } from '@nestjs/graphql';

import { CreateUserProfileInput, UpdateUserProfileInput } from './dto';
import { UserProfileService } from './user-profile.service';
import { UserProfileEntity } from './entities/user-profile.entity';

@Resolver()
export class UserProfileResolver {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Query(() => UserProfileEntity, {
    description: 'This graphql method for getting user profile by id',
  })
  async getUserProfile(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<UserProfileEntity> {
    return this.userProfileService.getUserProfile(id);
  }

  @Mutation(() => UserProfileEntity, {
    description: 'This graphql method for creating user profile',
  })
  async createUserProfile(
    @Args('userProfileInput')
    userProfileInput: CreateUserProfileInput,
  ): Promise<UserProfileEntity> {
    return this.userProfileService.createUserProfile(userProfileInput);
  }

  @Mutation(() => UserProfileEntity, {
    description: 'This graphql method for update user profile',
  })
  async updateUserProfile(
    @Args('userProfileInput')
    userProfileInput: UpdateUserProfileInput,
  ): Promise<UserProfileEntity> {
    return this.userProfileService.updateUserProfile(userProfileInput);
  }

  @Mutation(() => Boolean, {
    description: 'This graphql method for delete user profile',
  })
  async deleteUserProfile(
    @Args('userId')
    userId: number,
  ) {
    return this.userProfileService.deleteUserProfile(userId);
  }
}
