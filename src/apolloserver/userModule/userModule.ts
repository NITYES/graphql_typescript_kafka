import {userResolver,userTypeDefs} from './usertypedefs'

import { createModule } from 'graphql-modules';

export const myModule = createModule({
  id: 'user-module',
  dirname: __dirname,
  typeDefs: [
   userTypeDefs
  ],
  resolvers: userResolver,
});