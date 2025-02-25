import { environment } from './infra/env/env'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ZodFilter } from './infra/filters/zod-filter'
import { logger } from './infra/logger/winston'
import { NestExpressApplication } from '@nestjs/platform-express'
import { applyCors } from './infra/middlewares/cors'
import { applyLogger } from './infra/middlewares/log'
import { applySecurity } from './infra/middlewares/security'
import { setupSwagger } from './infra/middlewares/swagger'

async function bootstrap() {
  const nodeEnv = environment.NODE_ENV ?? 'development'
  const port = environment.PORT ?? 3001
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger:
      nodeEnv === 'production'
        ? ['error', 'log', 'fatal', 'warn']
        : ['log', 'error', 'warn', 'debug', 'verbose'],
  })
  app.useGlobalFilters(new ZodFilter())
  app.set('trust proxy', 1)
  // Set global prefix for all routes
  app.setGlobalPrefix('api')
  // Enable CORS only for trusted origins
  applyCors(app, nodeEnv)
  // Apply security configurations
  applySecurity(app)
  // Add logging and error handling middleware
  applyLogger(app)
  // Add Swagger documentation
  setupSwagger(app)
  await app.listen(port, () => logger.info(`Server running on port ${port}`))
}
bootstrap().catch((err) => logger.error('Error starting server', err))
