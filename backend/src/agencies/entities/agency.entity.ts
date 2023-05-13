import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { AgencyType } from '../enums';

@ObjectType()
@Entity({ name: 'agencies' })
export class AgencyEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  // @Field(() => AgencyType)
  @Field({ nullable: true })
  @Column({ type: 'enum', enum: AgencyType, default: AgencyType.SYSTEM })
  type: string;

  @Field()
  @Column({ type: 'varchar' })
  title: string;

  @Field()
  @Column({ type: 'text', nullable: true })
  description: string;

  @Field(() => AgencyEntity, { nullable: true })
  @ManyToOne(() => AgencyEntity, { nullable: true })
  parentId: AgencyEntity;

  @Field(() => Date)
  @CreateDateColumn()
  createDate: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  editDate: Date;
}
