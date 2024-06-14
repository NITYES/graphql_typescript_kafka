import dotenv from 'dotenv';
import { join } from 'path';
const path = join(__dirname, '..', '..', '.env');
console.log('path for environment', path);
dotenv.config({ path });

export default {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  KAFKA: {
    BROKERS: ['localhost:9092'],
    KAFKA_CLIENTID: 'sadhustay_services',
    EMAIL_TOPICS: 'email_topics',
    GROUPID:'email'
  },

};
