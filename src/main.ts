import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './swagger.config';
import { config as initDotenv } from 'dotenv';

async function bootstrap(): Promise<void> {
	// Initialize environment variables
	initDotenv();

	// Create app
	const app = await NestFactory.create(AppModule);

	// Setup Swagger
	const document = SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup('api', app, document);

	// Start server
	await app.listen(3000);
}
bootstrap();
