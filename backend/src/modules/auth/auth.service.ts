import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { LoginType, UsersService } from '../users';
import { RegisterInput } from './dto/register.input';
import { UserEntity } from '../users/entities/user.entity';
import { CryptoService } from "../crypto/service";
import { LoginInput } from "./dto/login.input";
import { AuthPayload } from './dto/auth.payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly cryptoService: CryptoService,
    private readonly jwtService: JwtService,
  ) {}
  // TODO: Review whether Auth mutations should return UserEntity directly or a dedicated GraphQL output type.
  async register(input: RegisterInput): Promise<UserEntity> {
    return this.usersService.createUser({
      ...input,
      loginType: LoginType.STAFF,
    });
  }

  async login(input: LoginInput): Promise<AuthPayload> {
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

    const payload = {
      sub: user.id,
      role: user.loginType,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      user
    };
  }
}
