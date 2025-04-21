import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'node:process';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggingInterceptor } from '../libs/logging-interceptor';
import { HttpExceptionFilter } from '../libs/http-exception-filter';

function setupSwagger(app: INestApplication): void {
	const documentBuilder = new DocumentBuilder()
		.setTitle('Nest.js example')
		.setDescription('This is example for nest.js')
		.setVersion('1.0')
		.addBasicAuth()
		.build();

	const document = SwaggerModule.createDocument(app, documentBuilder);
	SwaggerModule.setup('api', app, document, {
		swaggerOptions: { defaultModelsExpandDepth: -1 },
	});
}

function bootstrap() {
	const logger = new Logger('Main');
	NestFactory.create(AppModule, {}).then((app) => {
		app.enableCors({
			origin: ['http://localhost:3000'],
			methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
			allowedHeaders: 'Content-Type, Accept, Authorization',
			credentials: true,
		});
		app.useGlobalPipes(new ValidationPipe());
		app.useGlobalInterceptors(new LoggingInterceptor());
		app.useGlobalFilters(new HttpExceptionFilter());
		setupSwagger(app);
		app
			.listen(process.env.PORT ?? 3000, () => {
				logger.log('App is running port: ' + (process.env.PORT ?? 3000));
			})
			.then((data) => data)
			.catch((err) => console.error(err));
	});
}

bootstrap();
