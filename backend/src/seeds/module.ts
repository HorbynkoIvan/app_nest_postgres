import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeedsService } from './service';
import { AgencyEntity, AgencyService } from '../modules/agencies';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([AgencyEntity])],
  providers: [SeedsService, AgencyService],
})
export class SeedsModule {}
