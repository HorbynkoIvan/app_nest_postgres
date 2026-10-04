import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserProfileEntity } from './entities/user-profile.entity';
import { UserProfileResolver } from './user-profile.resolver';
import { UserProfileService } from './user-profile.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfileEntity])],
  providers: [UserProfileService, UserProfileResolver],
})
export class UserProfileModule {}
