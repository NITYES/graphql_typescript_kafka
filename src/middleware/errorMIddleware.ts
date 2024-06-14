import { NextFunction, Request, Response } from 'express';
import { BaseClass } from '../base/baseclass';

class ErrorHandler extends BaseClass {
  errorMiddleware(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    
  }
}
