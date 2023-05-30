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

@Entity('organizations')
export class OrganizationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'enum',
    enum: OrganizationStatus,
    default: OrganizationStatus.ACTIVE,
  })
  status: OrganizationStatus;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true, name: 'parent_id' })
  parentId: number;

  @ManyToOne(() => OrganizationEntity)
  @JoinColumn({ name: 'parent_id' })
  parent: OrganizationEntity;

  @Column({
    type: 'timestamptz',
    default: () => 'NOW()',
    name: 'create_date',
  })
  createDate: Date;

  @Column({ name: 'creator_id' })
  creatorId: number;

  @Column({
    type: 'timestamptz',
    nullable: true,
    name: 'edit_date',
  })
  editDate: Date;

  @Column({
    nullable: true,
    name: 'editor_id',
  })
  editorId: number;

  @OneToMany(() => OrganizationEntity, (organization) => organization.parent, {
    cascade: true,
  })
  subOrganizations: OrganizationEntity[];

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
