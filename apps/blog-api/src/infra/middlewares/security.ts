import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

export function applySecurity(app: NestExpressApplication) {
  // Enable security middlewares
  // Use helmet for HTTP header security
  app.use(
    helmet({
      hidePoweredBy: true,
    }),
  );
  app.useBodyParser('json', { limit: '5mb' });
  app.useBodyParser('urlencoded', { limit: '10mb' });
  app.use(cookieParser());
  // Rate-limit to prevent brute-force attacks
  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000, // 1 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
}
