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
import { OrganizationEntity } from 'src/modules/organizations/entities/organization.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { EntType } from '../ent.enums';
import { Field, Int, ObjectType } from '@nestjs/graphql';

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

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: 'creator_id' })
  creator: UserEntity;

  @Field({ nullable: true })
  @Column({ name: 'edit_date', nullable: true })
  editDate: Date;

  @Field(() => UserEntity, { nullable: true })
  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: 'editor_id',
  })
  editor: UserEntity;

  @Field(() => [OrganizationEntity], { nullable: true, defaultValue: [] })
  @ManyToMany(() => OrganizationEntity, (organization) => organization.ents)
  organizations: OrganizationEntity[];
}
