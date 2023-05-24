import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { EntType } from '../enums';

@ObjectType()
@Entity({ name: 'agencies' })
export class EntEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ type: 'enum', enum: EntType, default: EntType.SYSTEM })
  type: string;

  @Field()
  @Column({ type: 'varchar' })
  title: string;

  @Field()
  @Column({ type: 'text', nullable: true })
  description: string;

  @Field(() => EntEntity, { nullable: true })
  @ManyToOne(() => EntEntity, { nullable: true })
  parentId: EntEntity;

  @Field(() => Date)
  @CreateDateColumn()
  createDate: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  editDate: Date;
}
