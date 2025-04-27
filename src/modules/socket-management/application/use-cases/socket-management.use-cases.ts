import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { StartSocketDto } from '../../interfaces/dtos/start.dto';
import { StopSocketDto } from '../../interfaces/dtos/stop.dto';
import { AIGAEAStrategy } from '../../infrasturcutre/strategies/deepin-projects/aigaea/aigaea.strategy';
import { ProxyAbonentRepository } from '../../../proxies-abonent-orchestration/application/proxy-abonent.repository';
import { IProxyAbonentCreeds } from '../../../proxies-abonent-orchestration/domain/entities/proxy-abonent-link.entity';
import { SocketManager } from '../../infrasturcutre/socket-manager/socket-manager';
import { SocketManagerAbstract } from '../../infrasturcutre/context/aigaea/socket/socket-manager-abstract';

@Injectable()
export class SocketManagementUseCases {
	constructor(
		@Inject() private readonly proxyAbonentRepository: ProxyAbonentRepository,
		@Inject() private readonly socketManagerAbstract: SocketManagerAbstract,
		@Inject() private readonly AIGAEAStrategy: AIGAEAStrategy,
		@Inject() private readonly socketManager: SocketManager,
	) {}

	logSocket(dto: any) {}

	authSocket(dto: any) {}

	/**
	 * Запуск неавторизованного сокета
	 * Должна быть логика, которая создает browser_id (aigaea для прокси), и потом этот браузер айди нам надо использовать
	 * @param dto
	 */
	startSocketOld(dto: StartSocketDto) {
		return this.proxyAbonentRepository
			.findById(dto.proxyToAbonentProjectId)
			.then((data: IProxyAbonentCreeds) => {
				const { project, proxy } = data;
				const { is_active, id } = proxy;
				const { title } = project;
				if (!is_active) {
					throw new BadRequestException(`Proxy ${id} is not active`);
				}
				/**
				 * В зависимости от тайтл делаем стратегию (AIGAEA, GRASS И ТП)
				 */
				if (title === 'AIGAEA') {
				}
				return this.socketManager.handleStart(dto.proxyToAbonentProjectId, data);
			});
	}

	startSocket(dto: StartSocketDto) {
		return this.proxyAbonentRepository
			.findById(dto.proxyToAbonentProjectId)
			.then((data: IProxyAbonentCreeds) => {
				const { project, proxy } = data;
				const { is_active, id } = proxy;
				const { title } = project;
				if (!is_active) {
					throw new BadRequestException(`Proxy ${id} is not active`);
				}
				/**
				 * В зависимости от тайтл делаем стратегию (AIGAEA, GRASS И ТП)
				 */
				if (title === 'AIGAEA') {
				}
				return this.socketManagerAbstract.handleStart(dto.proxyToAbonentProjectId, data);
			});
	}

	stopSocket(dto: StopSocketDto) {
		this.socketManagerAbstract.handleStop(dto.proxyToAbonentProjectId);
	}

	stopSocketOld(dto: StopSocketDto) {
		this.socketManager.handleStop(dto.proxyToAbonentProjectId);
	}
}
