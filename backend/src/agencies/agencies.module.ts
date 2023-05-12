import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgencyEntity } from './entities/agency.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AgencyEntity])],
})
export class AgenciesModule {}
