import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '../../services/user/user.service';
import { UserEntity } from '../../entities/user.entity';
import { CreateUserInput } from '../../inputs/create-user.input';
import { UpdateUserInput } from '../../inputs/update-user.input';
import { ProfileEntity } from '../../entities/profile.entity';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserEntity)
  async createUser(
    @Args('createUser') createUserInput: CreateUserInput,
  ): Promise<UserEntity> {
    const { email, name, firstName, lastName, age, city } = createUserInput;

    // создаем профиль и связываем его с пользователем
    const profile = new ProfileEntity();
    profile.firstName = firstName;
    profile.lastName = lastName;
    profile.age = age;
    profile.city = city;

    // создаем пользователя и связываем его с профилем
    const user = new UserEntity();
    user.email = email;
    user.name = name;
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

  @Query(() => [UserEntity])
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userService.getAllUsers();
  }

  @Query(() => UserEntity)
  async getOneUser(@Args('id') id: number): Promise<UserEntity> {
    return await this.userService.getOneUser(id);
  }
}
