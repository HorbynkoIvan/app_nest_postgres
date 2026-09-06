import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { CryptoModule } from "../crypto";

@Module({
  imports: [
    UsersModule,
    CryptoModule,
    ConfigModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
      }),
    }),
  ],
  providers: [AuthService, AuthResolver],
  exports: [],
})
export class AuthModule {}
