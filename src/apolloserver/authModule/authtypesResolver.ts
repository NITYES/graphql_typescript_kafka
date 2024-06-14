import { gql } from 'graphql-modules';
import authSErvice from './authSErvice';
import userServices from './authSErvice';

const userTypeDefs = gql`
  type User {
    id: ID!
    email: String
  }

  input loginInput {
    email: String!
    password: String!
  }

  type loginOutput {
      token:String!
      user:User!
  }

  type Mutation {
    login(email:String!,password:String!): loginOutput!
  }
`;

const userResolver = {
  Query: {

  },
  Mutation: {
    login: async (_: any, {email,password}: any, context: any) => {
      
      if (email && !email.includes('@')) throw new Error('Invalid email');
     const loginResponse=await authSErvice.login(email,password)
      return loginResponse
    },
  },
};

export { userTypeDefs, userResolver };
