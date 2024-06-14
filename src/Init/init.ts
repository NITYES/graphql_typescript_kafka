// import ExpressApplication from './express';
import { IApplication, IBootstrap, IDatabase } from '../types/app';
import { autoInjectable } from 'tsyringe';
import database from './database';
import express from './express';
import { adminsetup, consumer, producer } from '../kafka';
import { KafkaService } from '../kafka/kafkaservice';

class Bootstarp implements IBootstrap {
  public expressApplication: IApplication;
  public database: IDatabase;
  constructor() {
    this.expressApplication = express;
    this.database = database;
    this.initialize();
  }

  async initialize() {
    this.database.connect();

    const kafka = new KafkaService();

    await kafka.startConsumer(async ({ topic, message, partition }) => {
     try {
       let prefix = `${topic}-${partition}-${message.offset}-${message.timestamp}`;
       console.log('prefix', prefix);
       console.log('message', message.value?.toString());
       throw new Error('kafka consumer error')
     } catch (error) {
       console.log("error from kafka consumer",error)
     }
    });
  }
}

export default new Bootstarp();
