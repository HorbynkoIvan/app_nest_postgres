import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HttpService } from '../../utils';
import { CryptoModule } from '../crypto';
import { OrganizationsService } from '../organizations';
import { OrganizationEntity } from '../organizations/entities/organization.entity';
import { UsersService } from '../users';
import { UserEntity } from '../users/entities/user.entity';
import { SeedsService } from './service';
import { EntService } from '../ents';
import { EntEntity } from '../ents/entities/ent.entity';

// TODO: Import feature modules instead of registering their services here.
// This keeps module boundaries and avoids duplicating providers.

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UserEntity, EntEntity, OrganizationEntity]),
    CryptoModule,
  ],
  providers: [
    SeedsService,
    UsersService,
    EntService,
    OrganizationsService,
    HttpService,
  ],
})
export class SeedsModule {}
