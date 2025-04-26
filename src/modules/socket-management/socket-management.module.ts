import { Module, Provider } from '@nestjs/common';
import { SocketManagementController } from './socket-management.controller';
import { SocketService } from './service/socket.service';
import { SocketManagementUseCases } from './application/use-cases/socket-management.use-cases';
import { AIGAEAStrategy } from './infrasturcutre/strategies/deepin-projects/aigaea/aigaea.strategy';
import { ProxyAbonentPrismaRepository } from '../proxies-abonent-orchestration/infrastructure/prisma/repositories/proxy-abonent-prisma.repository';
import { ProxyAbonentRepository } from '../proxies-abonent-orchestration/application/proxy-abonent.repository';

const application: Provider[] = [SocketManagementUseCases, SocketService];

const infrastructure: Provider[] = [
	AIGAEAStrategy,
	{
		useClass: ProxyAbonentPrismaRepository,
		provide: ProxyAbonentRepository,
	},
];
@Module({
	imports: [],
	providers: [...application, ...infrastructure],
	controllers: [SocketManagementController],
})
export class SocketManagementModule {}
