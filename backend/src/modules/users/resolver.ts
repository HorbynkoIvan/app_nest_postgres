//import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
//import { GqlAuthGuard } from '../auth/guards';
import {
  CreateUserInput,
  DeleteUserInput,
  UpdateUserInput,
  GetUserInput,
  GetUsersInput,
} from './inputs';
import { UserDeleteModel, UserModel, UserUpdateModel } from './models';
import { UsersService } from './service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserModel, {
    description: 'This graphql method for getting user by email or id',
  })
  // @UseGuards(GqlAuthGuard)
  async getUser(
    @Args('userInput')
    userInput: GetUserInput,
  ) {
    return this.usersService.getUser(userInput);
  }

  @Query(() => [UserModel], {
    description: 'This graphql method for getting all users',
  })
  // @UseGuards(GqlAuthGuard)
  async getUsers(
    @Args('usersInput')
    userInput: GetUsersInput,
  ) {
    return this.usersService.getUsers(userInput);
  }

  @Mutation(() => UserModel, {
    description: 'This graphql method for registration new user',
  })
  // @UseGuards(GqlAuthGuard)
  async createUser(
    @Args('userInput')
    userInput: CreateUserInput,
  ) {
    return this.usersService.createUser(userInput);
  }

  @Mutation(() => UserUpdateModel, {
    description: 'This graphql method for update user data',
  })
  // @UseGuards(GqlAuthGuard)
  async updateUser(
    @Args('userInput')
    userInput: UpdateUserInput,
  ) {
    return this.usersService.updateUser(userInput);
  }

  @Mutation(() => UserDeleteModel, {
    description: 'This graphql method for delete user',
  })
  // @UseGuards(GqlAuthGuard)
  async deleteUser(
    @Args('userInput')
    userInput: DeleteUserInput,
  ) {
    return this.usersService.deleteUser(userInput);
  }
}
