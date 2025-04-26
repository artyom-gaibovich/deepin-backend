import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { StartSocketDto } from '../../interfaces/dtos/start.dto';
import { StopSocketDto } from '../../interfaces/dtos/stop.dto';
import { AIGAEAStrategy } from '../../infrasturcutre/strategies/deepin-projects/aigaea/aigaea.strategy';
import { ProxyAbonentRepository } from '../../../proxies-abonent-orchestration/application/proxy-abonent.repository';
import { IProxyAbonentCreeds } from '../../../proxies-abonent-orchestration/domain/entities/proxy-abonent-link.entity';

@Injectable()
export class SocketManagementUseCases {
	constructor(
		@Inject() private readonly proxyAbonentRepository: ProxyAbonentRepository,
		@Inject() private readonly AIGAEAStrategy: AIGAEAStrategy,
	) {}

	logSocket(dto: any) {}

	authSocket(dto: any) {}

	/**
	 * Запуск неавторизованного сокета
	 * Должна быть логика, которая создает browser_id (aigaea для прокси), и потом этот браузер айди нам надо использовать
	 * @param dto
	 */
	startSocket(dto: StartSocketDto) {
		// извлекаем проект, и уже в зависимости от проекта (AIGAEA, GRASS, DAWN-VALIDATOR) запускаем стратегию, которая создает сокет
		const strategy = 'AIGAEA';
		return this.proxyAbonentRepository
			.findById(dto.proxyToAbonentProjectId)
			.then((data: IProxyAbonentCreeds) => {
				const { project, proxy } = data;
				const { ip, port, protocol, host, is_active, password, username, id } = proxy;
				const { title, credentials } = project;
				if (!is_active) {
					throw new BadRequestException(`Proxy ${id} is not active`);
				}

				/**
				 * В зависимости от тайтл делаем стратегию (AIGAEA, GRASS И ТП)
				 */

				if (title === 'AIGAEA') {
				}

				const parsedJson = JSON.parse(credentials);
				const axiosProxy = {
					ip,
					port,
					protocol,
					host,
				};
				return data;
			});
	}

	stopSocket(dto: StopSocketDto) {
		this.AIGAEAStrategy.handleStop(dto.proxyToAbonentProjectId);
	}
}
