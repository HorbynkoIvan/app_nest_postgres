import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities';
import { UsersService } from './service';
import { UsersResolver } from './resolver';
import { CryptoModule } from '../crypto';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CryptoModule],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
