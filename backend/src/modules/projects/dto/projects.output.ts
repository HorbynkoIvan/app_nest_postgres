import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProjectEntity } from '../entities/project.entity';

@ObjectType()
export class ProjectsOutput {
  @Field(() => [ProjectEntity])
  projects: ProjectEntity[];

  @Field(() => Int)
  totalCount: number;
}
