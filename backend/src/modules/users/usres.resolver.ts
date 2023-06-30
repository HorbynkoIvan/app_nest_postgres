import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import {
  CreateUserInput,
  GetUserInput,
  UsersFilterInput,
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
  async getUser(
    @Args('userInput')
    userInput: GetUserInput,
  ): Promise<UserEntity> {
    return this.usersService.getUser(userInput);
  }

  @Query(() => GetUsersOutput, {
    description: 'This graphql method for getting all users',
  })
  async getUsers(
    @Args('paginationInput', { nullable: true })
    paginationInput?: PaginationInput,
    @Args('filterInput', { nullable: true })
    filterInput?: UsersFilterInput,
  ): Promise<GetUsersOutput> {
    return this.usersService.getUsers(paginationInput, filterInput);
  }

  @Mutation(() => UserEntity, {
    description: 'This graphql method for registration new user',
  })
  async createUser(
    @Args('userInput')
    userInput: CreateUserInput,
  ): Promise<UserEntity> {
    return this.usersService.createUser(userInput);
  }

  @Mutation(() => UserEntity, {
    description: 'This graphql method for update user data',
  })
  async updateUser(
    @Args('userInput')
    userInput: UpdateUserInput,
  ): Promise<UserEntity> {
    return this.usersService.updateUser(userInput);
  }

  @Mutation(() => Int, {
    description: 'This graphql method for delete user',
  })
  async deleteUser(
    @Args('id')
    id: number,
  ) {
    return this.usersService.deleteUser(id);
  }
}
