import { BaseClass } from '../base/baseclass';
import { TOPIC } from '../constant/enum';
import { KafkaService } from '../kafka/kafkaservice';

class EmailHelper extends BaseClass {
  addEmailToQueqe(data: any) {
    const kafkaservice=new KafkaService();
    this.logger.info('Adding new message to email topic')
    kafkaservice.produceMessage(TOPIC.EMIAL_TOPICS,JSON.stringify(data))
    console.log('cgfhh', data);
  }
}

export default new EmailHelper();
