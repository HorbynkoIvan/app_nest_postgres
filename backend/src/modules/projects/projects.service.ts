import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProjectEntity } from './entities/project.entity';
import { ProjectsOutput } from './dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly repository: Repository<ProjectEntity>,
  ) {}

  async getProjects(): Promise<ProjectsOutput> {
    const [projects, totalCount] = await this.repository.findAndCount({
      relations: ['organization'],
    });

    return { projects, totalCount };
  }

  async getProjectById(id: number): Promise<ProjectEntity> {
    const project = await this.repository.findOne({
      where: { id },
      relations: ['organization'],
    });

    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }

    return project;
  }
}
