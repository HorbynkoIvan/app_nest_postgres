import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { OrganizationStatus } from '../organizations.enums';
import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { ProjectEntity } from '../../projects/entities/project.entity';

@ObjectType()
@Entity('organizations')
export class OrganizationEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ unique: true })
  slug: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  description: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  logo: string;

  @Field(() => OrganizationStatus)
  @Column({
    type: 'enum',
    enum: OrganizationStatus,
    default: OrganizationStatus.DRAFT,
  })
  status: OrganizationStatus;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => [ProjectEntity])
  @OneToMany(() => ProjectEntity, (project) => project.organization)
  projects: ProjectEntity[];
}
