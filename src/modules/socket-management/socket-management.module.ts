import { Module, Provider } from '@nestjs/common';
import { SocketManagementController } from './socket-management.controller';
import { SocketService } from './service/socket.service';
import { SocketManagementUseCases } from './application/use-cases/socket-management.use-cases';
import { AIGAEAStrategy } from './infrasturcutre/strategies/deepin-projects/aigaea/aigaea.strategy';
import { ProxyAbonentPrismaRepository } from '../proxies-abonent-orchestration/infrastructure/prisma/repositories/proxy-abonent-prisma.repository';
import { ProxyAbonentRepository } from '../proxies-abonent-orchestration/application/proxy-abonent.repository';
import { SocketManager } from './infrasturcutre/socket-manager/socket-manager';
import { AbstractSocketContext } from './infrasturcutre/context/socket/socket.context';
import { PrismaProjectCreedsRepository } from '../project-creeds/infrastructure/project-creeds/prisma-project-creeds.repository';
import { ProjectCreedsRepository } from '../project-creeds/application/project-creeds.repository';

const application: Provider[] = [SocketManagementUseCases, SocketService];

const infrastructure: Provider[] = [
	SocketManager,
	AbstractSocketContext,
	AIGAEAStrategy,
	{
		useClass: ProxyAbonentPrismaRepository,
		provide: ProxyAbonentRepository,
	},
	{
		useClass: PrismaProjectCreedsRepository,
		provide: ProjectCreedsRepository,
	},
];
@Module({
	imports: [],
	providers: [...application, ...infrastructure],
	controllers: [SocketManagementController],
})
export class SocketManagementModule {}
