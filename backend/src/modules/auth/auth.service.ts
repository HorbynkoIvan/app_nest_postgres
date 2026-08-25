import { Injectable } from '@nestjs/common';
import { LoginType, UsersService } from '../users';
import { RegisterInput } from './dto/register.input';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  // TODO: Review whether Auth mutations should return UserEntity directly or a dedicated GraphQL output type.
  async register(input: RegisterInput): Promise<UserEntity> {
    return this.usersService.createUser({
      ...input,
      loginType: LoginType.STAFF,
    });
  }
}
