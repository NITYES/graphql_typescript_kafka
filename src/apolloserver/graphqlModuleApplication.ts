import { createApplication } from 'graphql-modules';
import { myModule } from './userModule/userModule';
import {authModule} from './authModule/authModule'
// This is your application, it contains your GraphQL schema and the implementation of it.
const application = createApplication({
  modules: [myModule,authModule],
});

const mySchema = application.schema;

export default application
