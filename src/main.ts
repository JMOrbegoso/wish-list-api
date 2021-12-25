import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { config as initDotenv } from 'dotenv';
import {
  serve as serveSwagger,
  setup as setupSwagger,
} from 'swagger-ui-express';
import { AppModule } from './app.module';
import { swaggerDocument } from './swagger.document';

async function bootstrap(): Promise<void> {
  // Initialize environment variables
  initDotenv();

  // Create app
  const app = await NestFactory.create(AppModule);

  // Set API global prefix
  app.setGlobalPrefix('api');

  // Setup Swagger documentation
  app.use('', serveSwagger, setupSwagger(swaggerDocument));

  // Enable Auto-validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Start server
  await app.listen(3000);
}
bootstrap();
