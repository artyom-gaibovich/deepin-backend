import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { AbonentsModule } from './modules/abonents/abonents.module';
import { ProxiesModule } from './modules/proxies/proxies.module';
import { SharedModule } from './modules/shared/shared.module';

@Module({
	imports: [
		AuthModule,
		AbonentsModule,
		ProxiesModule,
		SharedModule.register({
			type: 'prisma',
			global: true,
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
