import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';

import { ProjectStatus } from '../enums/project-status.enum';

@InputType()
export class CreateProjectInput {
  @Field(() => String)
  @IsNotEmpty()
  title: string;

  @Field(() => String)
  @IsNotEmpty()
  slug: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  description?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  image?: string;

  @Field(() => ProjectStatus, {
    defaultValue: ProjectStatus.DRAFT,
  })
  @IsOptional()
  @IsEnum(ProjectStatus, {
    message: `Status must be one of: ${Object.values(ProjectStatus).join(', ')}`,
  })
  status?: ProjectStatus;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  organizationId: number;
}
