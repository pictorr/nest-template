import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NODE_ENV, PORT } from './utils/env';
import { AppModule } from './api/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { logger } from './utils/logger';
import helmet from 'helmet';
import { HttpExceptionFilter } from './utils/filters/http-exception.filter';
import { AllExceptionsFilter } from './utils/filters/unknown-exception.filter';
import metadata from './metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger });
  const adapterHost = app.get(HttpAdapterHost);
  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);
  app.useGlobalFilters(new AllExceptionsFilter(adapterHost));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  NODE_ENV === 'production' && app.use(helmet()); // helmet breaks my swagger locally on safari

  await setupOpenApi(app);

  await app.listen(PORT, () => {
    logger.log(`Listening on port ${PORT}`);
  });
}

async function setupOpenApi(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setVersion('1.0')
    .build();

  await SwaggerModule.loadPluginMetadata(() => Promise.resolve(metadata));

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);
}

bootstrap();
