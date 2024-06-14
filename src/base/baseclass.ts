import env from '../config/env';
import { Ilogger } from '../types/app';
import logger from '../utilities/logger';
import {EventEmitter} from 'events'

export class BaseClass extends EventEmitter {
  public env;
  public logger: Ilogger;
  constructor() {
    super()
    this.env = env;
    this.logger = logger;
  }
}
