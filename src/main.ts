import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { config as initDotenv } from 'dotenv';
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
  SwaggerModule.setup('/', app, swaggerDocument);

  // Enable Auto-validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Start server
  await app.listen(3000);
}
bootstrap();
