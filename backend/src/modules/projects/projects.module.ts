import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrganizationEntity } from '../organizations/entities/organization.entity';
import { ProjectEntity } from './entities/project.entity';
import { ProjectsService } from './projects.service';
import { ProjectsResolver } from './projects.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity, OrganizationEntity])],
  providers: [ProjectsService, ProjectsResolver],
})
export class ProjectsModule {}
