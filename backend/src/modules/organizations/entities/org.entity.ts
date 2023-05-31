import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '../../users/entities';
import { OrganizationStatus } from '../org.enums';
import { EntEntity } from '../../ents/entities/ent.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('organizations')
export class OrgEntity {
  @Field(() => Int)
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

  @Field(() => Int)
  @Column({ nullable: true, name: 'parent_id' })
  parentId: number;

  @ManyToOne(() => OrgEntity)
  @JoinColumn({ name: 'parent_id' })
  parent: OrgEntity;

  @Field()
  @Column({
    type: 'timestamptz',
    default: () => 'NOW()',
    name: 'create_date',
  })
  createDate: Date;

  @Field(() => Int)
  @Column({ name: 'creator_id' })
  creatorId: number;

  @Field()
  @Column({
    type: 'timestamptz',
    nullable: true,
    name: 'edit_date',
  })
  editDate: Date;

  @Field(() => Int)
  @Column({
    nullable: true,
    name: 'editor_id',
  })
  editorId: number;

  @OneToMany(() => OrgEntity, (organization) => organization.parent, {
    cascade: true,
  })
  subOrganizations: OrgEntity[];

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
