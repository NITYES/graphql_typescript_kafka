import {Entity,BaseEntity,PrimaryGeneratedColumn,Column, OneToOne, JoinColumn, OneToMany} from 'typeorm';
import { Address } from './address';
import {User} from './userSchema'

@Entity()
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  'id': number;
  @OneToOne(()=>User)
  @JoinColumn({name:'user_id'})
  'user':User
  @Column('varchar')
  'f_name':string; // first name of user
  @Column('varchar')
  'l_name':string
  @Column('int',{default:null})
  'age':number
  @Column('text',{default:null})
  'description':string
  @OneToMany(()=>Address,(address)=>address.profile)
  'address':Address[]
}
