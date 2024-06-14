import { GraphQLError } from 'graphql';
import { gql } from 'graphql-modules';
import userServices from './userServices';
import { updateProfile } from './userResolver';
import { createUser } from './dto/createUser.dto';
import { RequestValidator } from '../../utilities/validateRequest';
import { User } from './userSchema';

const userTypeDefs = gql`
  type User {
    id: ID!
    email: String
    profile: Profile
    address: Address
  }

  input profileInput {
    user_id: Int!
    f_name: String!
    l_name: String!
    age: Int!
    description: String
    profile_pic: String
  }

  type Profile {
    f_name: String
    l_name: String
    age: Int
    description: String
    profile_pic: String
  }

  input addressInput {
    profile_id: Int!
    country: String!
    state: String!
    pincode: Int!
    city: String!
    landmark: String
  }

  type Address {
    country: String
    state: String
    pincode: Int
    city: String
    landmark: String
  }

  input userInput {
    email: String!
    password: String!
  }

  type Query {
    users: [User!]!
    user(id: Int): User
  }

  type Mutation {
    createUser(data: userInput): User!
    updateProfile(profileInput: profileInput): Profile!
    updateAddress(addressInput: addressInput): Address!
  }
`;

async function getUser(_: any, { id }: any, context: any) {
  if (!context.user) throw new GraphQLError('Unauthorized user');
  if (id != context.user.id) throw new Error('Bad request');
  const user = await userServices.getUser(id);
  return user;
}

const userResolver = {
  Query: {
    user: getUser,
    users: () => [
      { name: 'Ritesh', email: 'gkchaurasiya1@gmail.com', age: 32 },
    ],
  },
  Mutation: {

    createUser: async (_: any, data: { data: createUser }, context: any) => {
      const { errors, input } = await RequestValidator(createUser, data.data);
      console.log('errors',errors)
      if ( errors) throw new GraphQLError(errors.toString(),{
        extensions:{
          code:'BAD_REQUEST',
          argument:'email'
        }
      })
      await userServices.createUser(input);
      return data.data;
    },
    updateProfile,
  },
};

export { userTypeDefs, userResolver };
