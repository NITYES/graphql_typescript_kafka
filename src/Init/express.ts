import { Application } from 'express';
import express from 'express';
import {Request,Response,NextFunction} from 'express';
import { IApplication } from '../types/app';
import { Server } from 'http';
import ApolloServers from '../apolloserver/apoloserver';
import { expressMiddleware } from '@apollo/server/express4';
import { verifyJwt } from '../utilities/jwt';
import { GraphQLError } from 'graphql';
import { BaseClass } from '../base/baseclass';

class ExpressApplication extends BaseClass implements IApplication {
  public app!: Application;
  public apoloServer!: ApolloServers;
  constructor() {
    super()
    this.app = express();
    this.addMiddleware();
  }

  async addMiddleware() {
    this.app.use(express.json({ limit: '10mb' }));
  }

  async initializeApolloServer(server: Server) {
    // configure appolo server for graphql
    this.apoloServer = new ApolloServers(server);
    await this.apoloServer.server.start();
    this.app.use(
      '/graphql',
      expressMiddleware(this.apoloServer.server, {
        context: async ({ req, res }) => {
          try {
            const token = req.headers.authorization;
            let user = null;
            if (token) {
              // verify token and load user
              const isTokenValid = await verifyJwt(token);
              if (!isTokenValid) throw new Error('Invalid token');
              // get user from db
              // req.user=isTokenValid
              user = isTokenValid;
            }
            // validate token
            return { user };
          } catch (error:any) {
            console.log('error from ',error.message)
             //throw new GraphQLError(error.message)
             this.logger.error(error.message)
             return {}
          }
        },
      })
    );
  }
}

export default new ExpressApplication();
