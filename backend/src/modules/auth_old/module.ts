import { Module } from '@nestjs/common';
import { AuthService } from './service';
import { UsersModule } from '../users';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './resolver';
import { CryptoModule } from '../crypto';
import { JwtStrategy } from './strategies';
import { jwtConfig } from 'src/config/jwt.config';

@Module({
  imports: [
    UsersModule,
    CryptoModule,
    PassportModule,
    JwtModule.registerAsync(jwtConfig),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
