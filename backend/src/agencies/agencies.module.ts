import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgencyEntity } from './entities/agency.entity';
import { AgencyService } from './services/agency/agency.service';
import { AgencyResolver } from './resolvers/agency/agency.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([AgencyEntity])],
  providers: [AgencyService, AgencyResolver],
})
export class AgenciesModule {}
