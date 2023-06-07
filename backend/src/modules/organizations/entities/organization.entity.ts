import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { OrganizationStatus } from '../organizations.enums';
import { EntEntity } from '../../ents/entities/ent.entity';
import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('organizations')
export class OrganizationEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String, { nullable: true })
  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Field(() => OrganizationStatus)
  @Column({
    type: 'enum',
    enum: OrganizationStatus,
    default: OrganizationStatus.ACTIVE,
  })
  status: OrganizationStatus;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  image: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  url: string;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn({ name: 'create_date' })
  createDate: Date;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn({ name: 'edit_date' })
  editDate: Date;

  @Field(() => ID)
  @Column({ name: 'creator_id' })
  creatorId: number;

  @Field(() => ID, { nullable: true })
  @Column({
    nullable: true,
    name: 'editor_id',
  })
  editorId: number;

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true, name: 'parent_id' })
  parentId: number;

  @Field(() => OrganizationEntity, { nullable: true })
  @ManyToOne(() => OrganizationEntity)
  @JoinColumn({ name: 'parent_id' })
  parent: OrganizationEntity;

  @Field(() => [OrganizationEntity], { nullable: true })
  @OneToMany(() => OrganizationEntity, (organization) => organization.parent, {
    cascade: true,
  })
  subOrganizations: OrganizationEntity[];

  @Field(() => [UserEntity], { nullable: true })
  @ManyToMany(() => UserEntity, (user) => user.organizations, { cascade: true })
  @JoinTable({
    name: 'users_organizations',
    joinColumn: {
      name: 'organization_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users: UserEntity[];

  @Field(() => [EntEntity], { nullable: true })
  @ManyToMany(() => EntEntity, (ent) => ent.organizations, {
    cascade: true,
  })
  @JoinTable({
    name: 'ents_organizations',
    joinColumn: {
      name: 'organization_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'ent_id',
      referencedColumnName: 'id',
    },
  })
  ents: EntEntity[];
}
