import { EachMessageHandler, Kafka } from 'kafkajs';
import { BaseClass } from '../base/baseclass';
import {TOPIC} from '../constant/enum';

export class KafkaService extends BaseClass {
  private kafka: Kafka;
  constructor() {
    super();
    this.kafka = new Kafka({
      brokers: this.env.KAFKA.BROKERS,
      clientId: this.env.KAFKA.KAFKA_CLIENTID,
    });
  }

  async produceMessage(topic:TOPIC,message:string){
        const producer = this.kafka.producer();
        await producer.connect();

        await producer.send({
          topic: topic,
          messages: [{ value: JSON.stringify(message) }],
        });
        await producer.disconnect();

        return producer;
  }

  async  startConsumer(callback:EachMessageHandler
    ) {
   try {
     const consumer = this.kafka.consumer({ groupId: this.env.KAFKA.GROUPID });
     await consumer.connect();
     await consumer.subscribe({
       topics: [TOPIC.EMIAL_TOPICS],
       fromBeginning: true,
     });

     await consumer.run({
       eachMessage: callback,
     });
   } catch (error) {
    // push the data to new error topic
   // console.log(error from )
    await this.produceMessage(TOPIC.ERROR_HANDLING_TOPIC,JSON.stringify({error}))
   }
  }
}
