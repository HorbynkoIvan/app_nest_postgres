import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserService } from './services/user/user.service';
import { UserResolver } from './resolvers/user/user.resolver';
import { ProfileEntity } from './entities/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ProfileEntity])],
  providers: [UserService, UserResolver],
})
export class UsersModule {}
