import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfileService } from './user-profile.service';
import { UserProfileResolver } from './user-profile.resolver';
import { UserProfileEntity } from './entities/user-profile.entity';
import { UsersModule } from './users.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfileEntity]), UsersModule],
  providers: [UserProfileResolver, UserProfileService],
  exports: [UserProfileService],
})
export class UserProfileModule {}
