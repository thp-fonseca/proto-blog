import { INestApplication } from '@nestjs/common';
import { logger } from '../logger/winston';
import { NextFunction, Request, Response } from 'express';

export const applyLogger = (app: INestApplication) => {
  app.use((req: any, _res: any, next: NextFunction) => {
    logger.info(`${req.method} ${req.path} from ${req.ip}`);
    next();
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((_err: any, _req: Request, res: Response, _next: NextFunction) => {
    const error = _err as Error;
    logger.error(error.message);
    res.status(500).send('Internal server error');
  });
};
