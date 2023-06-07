//import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
//import { GqlAuthGuard } from '../auth/guards';

import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import {
  CreateUserInput,
  GetUserInput,
  GetUsersFiltersInput,
  UpdateUserInput,
} from './dto';
import { PaginationInput } from '../commons/dto';
import { GetUsersOutput } from './dto/list-user.output';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserEntity, {
    description: 'This graphql method for getting user by email or id',
  })
  // @UseGuards(GqlAuthGuard)
  async getUser(
    @Args('userInput')
    userInput: GetUserInput,
  ): Promise<UserEntity> {
    return this.usersService.getUser(userInput);
  }

  @Query(() => GetUsersOutput, {
    description: 'This graphql method for getting all users',
  })
  // @UseGuards(GqlAuthGuard)
  async getUsers(
    @Args('paginationInput')
    paginationInput: PaginationInput,
    @Args('filtersInput', { nullable: true })
    filtersInput: GetUsersFiltersInput,
  ): Promise<GetUsersOutput> {
    return this.usersService.getUsers(paginationInput, filtersInput);
  }

  @Mutation(() => UserEntity, {
    description: 'This graphql method for registration new user',
  })
  // @UseGuards(GqlAuthGuard)
  async createUser(
    @Args('userInput')
    userInput: CreateUserInput,
  ): Promise<UserEntity> {
    return this.usersService.createUser(userInput);
  }

  @Mutation(() => UserEntity, {
    description: 'This graphql method for update user data',
  })
  // @UseGuards(GqlAuthGuard)
  async updateUser(
    @Args('userInput')
    userInput: UpdateUserInput,
  ): Promise<UserEntity> {
    return this.usersService.updateUser(userInput);
  }

  @Mutation(() => Int, {
    description: 'This graphql method for delete user',
  })
  // @UseGuards(GqlAuthGuard)
  async deleteUser(
    @Args('id')
    id: number,
  ) {
    return this.usersService.deleteUser(id);
  }
}
