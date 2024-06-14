
declare global {
  namespace Express {
    interface Request {
      user: JWTPAYLOAD | null;
      token: string;
    }
    interface Response {
      success: (data: any, message?: string, statuscode?: number) => Response;
    }
  }
}


export * from './resolver';
export * from './app'
