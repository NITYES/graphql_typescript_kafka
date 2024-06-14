import http from 'http';
import 'reflect-metadata';
import { BaseClass } from './base/baseclass';
import bootstrap from './Init/init';

class ServerInstance extends BaseClass {
  public server!: http.Server;

  constructor() {
    super()
    this.server = http.createServer(bootstrap.expressApplication.app);
    this.server.listen(this.env.PORT, () => {
      // console.log('Application listening on port::', this.PORT);
      this.logger.info('Application listening on port::', this.env.PORT);
    });
    bootstrap.expressApplication.initializeApolloServer(this.server);
  }
}

export default new ServerInstance();
