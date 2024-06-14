import { BaseClass } from './baseclass';
import { DataSource } from 'typeorm';
import database from '../Init/database';

export class Repository extends BaseClass {
  private db: DataSource;
  constructor() {
    super();
    this.db = database.AppDataSource;
  }

  async query(queryString: string) {
    return this.db.query(queryString);
  }

  async paramaterizedQuery(queryString: string, data: any[]) {
    return this.db.query(queryString, data);
  }
}
