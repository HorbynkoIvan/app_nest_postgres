import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CryptoService } from '../crypto/service';
import { UsersService } from '../users/users.service';
import { LoginInput } from './inputs';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private cryptoService: CryptoService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user = await this.usersService.getUser({ email });

    if (!user) throw new Error('User data is not valid');

    const isValid = await this.cryptoService.checkPassword(
      password,
      user.password,
    );

    if (!isValid) throw new Error('User data is not valid');

    return user;
  }

  async login({ email, password }: LoginInput) {
    const user = await this.validateUser(email, password);

    const payload = {
      username: user.username,
      role: user.loginType,
      email: user.email,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
