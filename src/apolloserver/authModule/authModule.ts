import { userResolver, userTypeDefs } from './authtypesResolver';

import { createModule } from 'graphql-modules';

export const authModule = createModule({
  id: 'auth-module',
  dirname: __dirname,
  typeDefs: [userTypeDefs],
  resolvers: userResolver,
});
