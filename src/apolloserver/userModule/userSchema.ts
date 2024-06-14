import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  'id': number;
  @Column('varchar',{unique:true})
  'email': string;
  @Column('varchar', { select: false })
  'password': string;
  @Column('bool', { default: false })
  'isEmailVerified': boolean;
}
