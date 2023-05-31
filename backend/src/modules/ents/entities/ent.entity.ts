import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrgEntity } from 'src/modules/organizations/entities/org.entity';
import { UserEntity } from 'src/modules/users/entities';
import { EntType } from '../ent.enums';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserModel } from 'src/modules/users/models';

@ObjectType()
@Entity('ents')
export class EntEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => EntType)
  @Column({
    type: 'enum',
    enum: EntType,
  })
  type: EntType;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column({ type: 'text', default: '' })
  description: string;

  @Field({ nullable: true })
  @ManyToOne(() => EntEntity, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parent_id' })
  parent: EntEntity;

  @OneToMany(() => EntEntity, (ent) => ent.parent)
  dependents: EntEntity[];

  dependentCount: number;

  @Field()
  @CreateDateColumn({ name: 'create_date' })
  createDate: Date;

  @Field(() => UserModel)
  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: 'creator_id' })
  creator: UserEntity;

  @Field({ nullable: true })
  @Column({ name: 'edit_date', nullable: true })
  editDate: Date;

  @Field(() => UserModel, { nullable: true })
  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: 'editor_id',
  })
  editor: UserEntity;

  @Field(() => [OrgEntity], { nullable: true, defaultValue: [] })
  @ManyToMany(() => OrgEntity, (organization) => organization.ents)
  organizations: OrgEntity[];
}
