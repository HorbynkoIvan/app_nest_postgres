import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationEntity } from './entities/organization.entity';
import { OrganizationsService } from './organizations.service';
import { OrganizationsResolver } from './organizations.resolver';
import { UserEntity } from '../users/entities';
import { EntEntity } from '../ents/entities/ent.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrganizationEntity, UserEntity, EntEntity]),
  ],
  providers: [OrganizationsResolver, OrganizationsService],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}
