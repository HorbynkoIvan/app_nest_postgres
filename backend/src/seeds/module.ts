import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeedsService } from './service';
import { EntEntity, EntService } from '../modules/ents';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([EntEntity])],
  providers: [SeedsService, EntService],
})
export class SeedsModule {}
