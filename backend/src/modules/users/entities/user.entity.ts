import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  CreateDateColumn,
} from 'typeorm';
import {
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { UserStatus, LoginType } from '../users.enums';
import { OrganizationEntity } from 'src/modules/organizations/entities/organization.entity';

@ObjectType()
@Entity('users')
export class UserEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
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

  @Field(() => LoginType)
  @Column({
    type: 'enum',
    enum: LoginType,
    default: LoginType.STAFF,
    name: 'login_type',
  })
  loginType: LoginType;

  @Field(() => String)
  @Column()
  password: string;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn({ name: 'create_date' })
  createDate: Date;

  @Field(() => [OrganizationEntity], { nullable: true })
  @ManyToMany(() => OrganizationEntity, (organization) => organization.users, {
    onDelete: 'CASCADE',
  })
  organizations: OrganizationEntity[];
}

registerEnumType(LoginType, {
  name: 'LoginType',
});

registerEnumType(UserStatus, {
  name: 'UserStatus',
});
