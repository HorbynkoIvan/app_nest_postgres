import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadGatewayException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CryptoService } from '../crypto/service';
import { UsersService } from '../users/users.service';
import { LoginInput } from './inputs';
import { UserEntity } from '../users/entities/user.entity';
import { EMAIL_OR_USERNAME_NOT_FOUND, PROVIDE_EMAIL_OR_USERNAME, WRONG_PASSWORD } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private cryptoService: CryptoService,
  ) {}

  async validateUser(
    username: string,
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user = await this.usersService.getUser({ email, username });

    if (!user) throw new NotFoundException(EMAIL_OR_USERNAME_NOT_FOUND);

    const isValid = await this.cryptoService.checkPassword(
      password,
      user.password,
    );

    if (!isValid) throw new BadGatewayException(WRONG_PASSWORD);

    return user;
  }

  async login({ username, email, password }: LoginInput) {
    if (!username && !email) {
      throw new BadRequestException(PROVIDE_EMAIL_OR_USERNAME);
    }

    const user = await this.validateUser(username, email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = {
      username: user.username,
      role: user.loginType,
      email: user.email,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
      ...payload,
    };
  }
}
