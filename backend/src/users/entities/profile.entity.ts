import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserEntity } from './user.entity';

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

  @Field()
  @Column()
  age: number;

  @Field()
  @Column()
  city: string;

  @OneToOne(() => UserEntity, (user) => user.profile)
  user: UserEntity;
}
