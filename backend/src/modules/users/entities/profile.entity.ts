import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserEntity } from './user.entity';
import { UserRole } from '../enums';

@ObjectType()
@Entity('profiles')
export class ProfileEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  age: number;

  @Field()
  @Column()
  city: string;

  @Field({ nullable: true })
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STAFF,
  })
  role: string;

  @OneToOne(() => UserEntity, (user) => user.profile)
  user: UserEntity;
}
