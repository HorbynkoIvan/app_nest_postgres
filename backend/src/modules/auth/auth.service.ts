import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginType, UsersService } from '../users';
import { RegisterInput } from './dto/register.input';
import { UserEntity } from '../users/entities/user.entity';
import { CryptoService } from "../crypto/service";
import { LoginInput } from "./dto/login.input";

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly cryptoService: CryptoService) {}
  // TODO: Review whether Auth mutations should return UserEntity directly or a dedicated GraphQL output type.
  async register(input: RegisterInput): Promise<UserEntity> {
    return this.usersService.createUser({
      ...input,
      loginType: LoginType.STAFF,
    });
  }

  async login(input: LoginInput): Promise<UserEntity> {
    const user = await this.usersService.getUser({
      email: input.email,
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await this.cryptoService.comparePassword(
      input.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return user;
  }
}
