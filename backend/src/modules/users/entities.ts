import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { OrgEntity } from '../organizations/entities/org.entity';
import { UserRole, UserStatus } from './enums';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: string;

  @Column({ unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STAFF,
  })
  role: string;

  @Column()
  password: string;

  @Column({
    type: 'timestamptz',
    default: () => 'NOW()',
  })
  dateCreate: Date;

  @ManyToMany(() => OrgEntity, (organization) => organization.users)
  organizations: OrgEntity[];
}
