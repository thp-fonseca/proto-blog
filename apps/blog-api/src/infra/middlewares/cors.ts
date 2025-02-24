import { NestExpressApplication } from '@nestjs/platform-express';
import { NextFunction, Request, Response } from 'express';

export const applyCors = (app: NestExpressApplication, nodeEnv: string) => {
  // Enable CORS only for trusted origins
  const origins =
    nodeEnv === 'production'
      ? [/0.0.0.0:\d+/]
      : [/http:\/\/localhost:\d+/, /127.0.0.1:\d+/];
  app.enableCors({
    origin: origins,
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
  });
  if (nodeEnv === 'production') {
    app.use(function (req: Request, res: Response, next: NextFunction) {
      if (req.secure) {
        next();
      } else {
        res.redirect('https://' + req.headers.host + req.url);
      }
    });
  }
};
