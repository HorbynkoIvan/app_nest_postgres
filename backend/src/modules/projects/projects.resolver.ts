import { Args, Resolver, Query, Int } from '@nestjs/graphql';
import { ProjectsService } from './projects.service';
import { ProjectEntity } from './entities/project.entity';
import {ProjectsOutput} from './dto'

@Resolver()
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @Query(() => ProjectsOutput, {
    description: 'Returns all projects',
  })
  async getProjects(): Promise<ProjectsOutput> {
    return this.projectsService.getProjects();
  }

  @Query(() => ProjectEntity, {
    description: 'Returns one project by id',
  })
  async getProjectById(
    @Args('id', {
      type: () => Int,
    })
    id: number,
  ): Promise<ProjectEntity> {
    return this.projectsService.getProjectById(id);
  }
}
