import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: NestExpressApplication) {
  const config = new DocumentBuilder()
    .setTitle('Buscador API')
    .setDescription('API para o Buscador Suzano')
    .setVersion('1.0')
    .addTag('Buscador API')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('v2/backend/docs', app, document, {
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
    },
  });
}
