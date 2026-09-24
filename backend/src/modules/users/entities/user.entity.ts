import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
} from 'typeorm';
import {
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
} from '@nestjs/graphql';
import { UserStatus } from '../enums/user-status.enum';
import { UserRole } from '../enums/user-role.enum';
import { UserProfileEntity } from './user-profile.entity';

@ObjectType()
@Entity('users')
export class UserEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ unique: true })
  username: string;

  @Field(() => UserStatus)
  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

  @Field(() => String)
  @Column({ unique: true })
  email: string;

  @Field(() => UserRole)
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STAFF,
    name: 'login_type',
  })
  userRole: UserRole;

  @Column()
  password: string;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn({ name: 'create_date' })
  createDate: Date;

  @Field(() => UserProfileEntity, { nullable: true })
  @OneToOne(() => UserProfileEntity, (profile) => profile.user, {
    nullable: true,
  })
  profile: UserProfileEntity;
}
