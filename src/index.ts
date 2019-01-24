import { Request, Response, NextFunction } from "express";
import { Woops } from './Woops';
import { WoopsOptions } from './WoopsOptions';


declare global {
  namespace Express {
    interface Response {
      woops?: Woops
    }
  }
}

export const woopsErrorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.woops) {
    res.woops.send(error);
  }
};

export default (options: WoopsOptions) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (res.woops) {
      throw new Error('Woops already exists on the response object.');
    }
    res.woops = new Woops(res, options);
    next();
  };
};
