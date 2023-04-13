import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '../../services/user/user.service';
import { UserEntity } from '../../entities/user.entity';
import { CreateUserInput } from '../../inputs/create-user.input';
import { UpdateUserInput } from '../../inputs/update-user.input';
import { ProfileEntity } from '../../entities/profile.entity';
import { GetUsersInput } from '../../inputs/get-users.input';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserEntity)
  async createUser(
    @Args('createUser') createUserInput: CreateUserInput,
  ): Promise<UserEntity> {
    const { email, userName, firstName, lastName, age, city, role } =
      createUserInput;

    // создаем профиль и связываем его с пользователем
    const profile = new ProfileEntity();
    profile.firstName = firstName;
    profile.lastName = lastName;
    profile.age = age;
    profile.city = city;
    profile.role = role;

    // создаем пользователя и связываем его с профилем
    const user = new UserEntity();
    user.email = email;
    user.userName = userName;
    user.profile = profile;

    // сохраняем профиль и пользователя в базе данных
    return await this.userService.createUser(user);
  }

  @Mutation(() => UserEntity)
  async updateUser(
    @Args('updateUser') updateUserInput: UpdateUserInput,
  ): Promise<UserEntity> {
    return await this.userService.updateUser(updateUserInput);
  }

  @Mutation(() => Number)
  async removeUser(@Args('id') id: number): Promise<number> {
    return await this.userService.removeUser(id);
  }

  @Query(() => [UserEntity], {
    description: 'This graphql method for getting all users',
  })
  async getUsers(
    @Args('usersInput')
    userInput: GetUsersInput,
  ): Promise<UserEntity[]> {
    return await this.userService.getUsers(userInput);
  }

  @Query(() => UserEntity)
  async getUser(@Args('id') id: number): Promise<UserEntity> {
    return await this.userService.getUser(id);
  }
}
