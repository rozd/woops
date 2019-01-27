import { NextFunction, Request, Response } from 'express';

export default function exceptionHandler(error: Error, req: Request, res: Response, next: NextFunction): void {
  if (res.woops) {
    res.woops.send(error);
  }
  next(error);
}
