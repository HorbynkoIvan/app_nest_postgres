import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProjectEntity } from './entities/project.entity';
import { CreateProjectInput, ProjectsOutput } from './dto';
import { OrganizationEntity } from '../organizations/entities/organization.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,

    @InjectRepository(OrganizationEntity)
    private readonly organizationRepository: Repository<OrganizationEntity>,
  ) {}

  async createProject(input: CreateProjectInput): Promise<ProjectEntity> {
    const { organizationId, ...projectData } = input;

    const organization = await this.organizationRepository.findOne({
      where: { id: organizationId },
    });

    if (!organization) {
      throw new NotFoundException(
        `Organization with id ${organizationId} not found`,
      );
    }
    const project = this.projectRepository.create({
      ...projectData,
      organization
    });

    return this.projectRepository.save(project);
  }

  async getProjects(): Promise<ProjectsOutput> {
    const [projects, totalCount] = await this.projectRepository.findAndCount({
      relations: ['organization'],
    });

    return { projects, totalCount };
  }

  async getProjectById(id: number): Promise<ProjectEntity> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['organization'],
    });

    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }

    return project;
  }
}
