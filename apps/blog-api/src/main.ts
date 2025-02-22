const {env} = require('@workspace/env');

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(env.PORT ?? 3001, () => console.log(`listening on port ${env.PORT}`));
}
bootstrap();
