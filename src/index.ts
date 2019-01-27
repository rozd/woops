import { Request, Response, NextFunction, RequestHandler } from 'express';
import { Woops } from './Woops';
export { default as woopsExceptionHandler } from './handler/exceptionHandler';

declare global {
  namespace Express {
    interface Response {
      woops?: Woops;
    }
  }
  namespace Woops {
    interface WoopsOptions {
      shouldIncludeErrorStack?: boolean;
    }
  }
}

export default function woops(options?: Woops.WoopsOptions): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    if (res.woops) {
      throw new Error('Woops already exists on the response object.');
    }
    res.woops = new Woops(res, options);
    next();
  };
}
