import { DataSource } from 'typeorm';
import { IDatabase } from '../types/app';
import { BaseClass } from '../base/baseclass';
import {User} from '../apolloserver/userModule/userSchema'
import { Profile } from '../apolloserver/userModule/profile';
import { Address } from '../apolloserver/userModule/address';
class Database extends BaseClass implements IDatabase{

  public AppDataSource!: DataSource;
  constructor() {
    super()
    this.AppDataSource = new DataSource({
      type: 'mysql',
      host: 'localhost',
      port: 3309,
      username: 'iamsadhu',
      password: 'sadhustay123',
      database: 'sadhu_db',
      entities:[User,Profile,Address]
    });
    
  }

  async connect() {
    (await this.AppDataSource.initialize()).synchronize();
    this.emit('database_connection')
  }
  
}

export default new Database();
