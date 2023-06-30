import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationEntity } from './entities/organization.entity';
import { OrganizationsService } from './organizations.service';
import { OrganizationsResolver } from './organizations.resolver';
import { UserEntity } from '../users/entities/user.entity';
import { EntEntity } from '../ents/entities/ent.entity';
import { UsersModule } from '../users';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrganizationEntity, UserEntity, EntEntity]),
    UsersModule,
  ],
  providers: [OrganizationsResolver, OrganizationsService],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}
