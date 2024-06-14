import { payload } from '../types/app';
import jwt from 'jsonwebtoken';
import config from '../config/env';

export const verifyJwt = async (token: string): Promise<payload | string> => {
 try {
   const payload = jwt.verify(token, config.JWT_SECRET as string) as payload;
   return payload;
 } catch (error) {
   throw error
 }
};

export const createJwtToken = async (data: payload): Promise<string> => {
  const token = jwt.sign(data, config.JWT_SECRET as string, {
    expiresIn: '1d',
  });
  return token;
};
