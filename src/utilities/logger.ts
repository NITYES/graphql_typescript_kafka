import winston, { transport, Logger } from 'winston';
import 'winston-daily-rotate-file';
import {join} from 'path'
import { Ilogger } from '../types/app';

class Loggers  implements Ilogger{
  private transporter: transport;
  public logger: Logger;
  constructor(filepath: string) {
    this.transporter = new winston.transports.DailyRotateFile({
      level: 'error',
      filename: filepath+'application-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '1d',
    });

    this.logger = winston.createLogger({
      level: 'error',
      transports: [this.transporter],
    });
  }

  async error(...message: any) {
    this.logger.error(message);
  }
  async info(...message: any) {
    this.logger.info(message);
  }
}

export default new Loggers(join(__dirname,'..','..','logs/'))
