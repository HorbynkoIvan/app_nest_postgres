import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '../../services/user/user.service';
import { UserEntity } from '../../entities/user.entity';
import { CreateUserInput } from '../../inputs/create-user.input';
import { UpdateUserInput } from '../../inputs/update-user.input';
import { GetUsersInput } from '../../inputs/get-users.input';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserEntity)
  async createUser(
    @Args('createUser') createUserInput: CreateUserInput,
  ): Promise<UserEntity> {
    return await this.userService.createUser(createUserInput);
    // Создаем транзакцию
    // const queryRunner = this.connection.createQueryRunner();
    // await queryRunner.connect();
    // await queryRunner.startTransaction();
    //
    // try {
    //   // Сохраняем профиль и пользователя в базе данных
    //   await queryRunner.manager.save(profile);
    //   await queryRunner.manager.save(user);
    //
    //   // Фиксируем транзакцию
    //   await queryRunner.commitTransaction();
    //
    //   return user;
    // } catch (error) {
    //   // Откатываем транзакцию в случае ошибки
    //   await queryRunner.rollbackTransaction();
    //   throw new InternalServerErrorException(error.message);
    // } finally {
    //   // Освобождаем ресурсы
    //   await queryRunner.release();
    // }
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
