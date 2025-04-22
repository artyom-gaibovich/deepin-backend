import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { AbonentsModule } from './modules/abonents/abonents.module';
import { ProxiesModule } from './modules/proxies/proxies.module';
import { SharedModule } from './modules/shared/shared.module';
import { PrometheusModule } from './modules/prometheus/prometheus.module';
import { PrometheusService } from './modules/prometheus/prometheus.service';

@Module({
	imports: [
		AuthModule,
		AbonentsModule,
		ProxiesModule,
		SharedModule.register({
			type: 'prisma',
			global: true,
		}),
		PrometheusModule,
	],
	controllers: [AppController],
	providers: [AppService, PrometheusService],
})
export class AppModule {}
