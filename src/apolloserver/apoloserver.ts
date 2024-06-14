import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { BaseClass } from '../base/baseclass';
import application from './graphqlModuleApplication';
import {formatError} from '../utilities/errorHandlerForGraphQL'

class ApolloServers extends BaseClass {
  public server!: ApolloServer;
  public httpserver!: any;
  constructor(httpserver: any) {
    super()
    this.server = new ApolloServer({
      gateway: {
        async load() {
          return { executor: application.createApolloExecutor() };
        },
        onSchemaLoadOrUpdate(callback) {
          const apischema = { apiSchema: application.schema } as any;
          callback(apischema);
          return () => {};
        },
        async stop() {},
      },
      formatError,
      status400ForVariableCoercionErrors:true,
      csrfPrevention: true,
      cache: 'bounded',
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer: httpserver })],
    });
  }
}

export default ApolloServers;
