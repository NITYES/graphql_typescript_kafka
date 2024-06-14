import { Kafka } from 'kafkajs';

const client = new Kafka({
  brokers: ['localhost:9092'],
  clientId: 'sadhu-stay',
});

export default client;
