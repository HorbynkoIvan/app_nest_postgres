import { Module } from '@nestjs/common';
import { UsersModule } from '../users';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [UsersModule],
  providers: [AuthService, AuthResolver],
  exports: [],
})
export class AuthModule {}
