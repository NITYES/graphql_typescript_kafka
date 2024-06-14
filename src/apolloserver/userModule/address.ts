import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { Profile } from './profile';

@Entity()
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn()
  'id': number;
  @Column('varchar')
  'country': string;
  @Column('varchar')
  'state': string;
  @Column('mediumint')
  'pincode': number;
  @Column('varchar')
  'city': string;
  @Column('varchar')
  'landmark': string;
  @ManyToOne(()=>Profile,(profile)=>profile.address)
  @JoinColumn({name:'profile_id'})
  'profile':Profile
}
