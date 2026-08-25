import { Module } from '@nestjs/common';
import { UsersModule } from '../users';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { CryptoModule } from "../crypto";

@Module({
  imports: [UsersModule, CryptoModule],
  providers: [AuthService, AuthResolver],
  exports: [],
})
export class AuthModule {}
