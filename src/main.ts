import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { config as initDotenv } from 'dotenv';
import { swaggerConfig } from './swagger.config';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  // Initialize environment variables
  initDotenv();

  // Create app
  const app = await NestFactory.create(AppModule);

  // Setup Swagger
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // Enable Auto-validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Start server
  await app.listen(3000);
}
bootstrap();
