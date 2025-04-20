import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'node:process';
import { Logger } from '@nestjs/common';
import cors from 'cors';

function bootstrap() {
	const logger = new Logger('Main');
	NestFactory.create(AppModule, {}).then((app) => {
		app.enableCors({
			origin: ['http://localhost:3000'],
			methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
			allowedHeaders: 'Content-Type, Accept, Authorization',
			credentials: true,
		});
		app
			.listen(process.env.PORT ?? 3000, () => {
				logger.log('App is running port: ' + (process.env.PORT ?? 3000));
			})
			.then((data) => data)
			.catch((err) => console.error(err));
	});
}

bootstrap();
