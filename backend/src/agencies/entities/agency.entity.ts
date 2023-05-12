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
  @Field()
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
  parent: AgencyEntity;

  @Field(() => Date)
  @CreateDateColumn()
  create_date: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  edit_date: Date;
}
