import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: NestExpressApplication) {
  const config = new DocumentBuilder()
    .setTitle('Blog Vult')
    .setDescription('API para o Blog dos Vulture')
    .setVersion('1.0')
    .addTag('Blog Vult')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document, {
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
    },
  });
}
