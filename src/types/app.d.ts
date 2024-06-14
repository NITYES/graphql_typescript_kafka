import { ApolloServer } from '@apollo/server';
import { Application } from 'express';
import { Server } from 'http';
import ApolloServers from '../apolloserver/apoloserver';
import { DataSource } from 'typeorm';

export interface IApplication {
  app: Application;
  apoloServer: ApolloServers;
  addMiddleware: () => void;
  initializeApolloServer: (server: Server) => void;
}

export interface IDatabase {
  AppDataSource: DataSource;
  connect: () => void;
}

export interface IBootstrap {
   expressApplication: IApplication;
   database: IDatabase;
  initialize: () => void;
}


export interface Ilogger {
   error:(...message:any)=>void;
   info:(...message:any)=>void
}

export interface IRepository {
   
}

export interface payload {
  id:number,
  email:string
}

export interface IEmailOPtions{
  
}

