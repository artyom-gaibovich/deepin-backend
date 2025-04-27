import { Inject, Injectable } from '@nestjs/common';
import { AbstractSocketContext } from '../context/aigaea/socket/socket.context';
import { IProxyAbonentCreeds } from '../../../proxies-abonent-orchestration/domain/entities/proxy-abonent-link.entity';
import * as axios from 'axios';
import { PingInterface, PingResponse } from '../../../socket';
import { ProjectCreedsRepository } from '../../../project-creeds/application/project-creeds.repository';
import { ProjectCreedsEntity } from '../../../project-creeds/domain/entities/project-creeds.entity';

/**
 * В него мы и прокидываем конкретный сокет контекст
 *
 */

@Injectable()
export class SocketManager {
	private activeRequests: Map<string, { cancel: () => void }> = new Map();

	constructor(
		@Inject() private readonly socketContext: AbstractSocketContext,
		@Inject() private readonly projectCreedsRepository: ProjectCreedsRepository,
	) {}

	public handleStart(id: string, config: IProxyAbonentCreeds) {
		const { project } = config;
		const { credentials } = project;
		const { uid, token, browser_id } = credentials;
		if (!token) {
			throw new Error('No Token provided');
		}
		if (this.activeRequests.has(id)) return;
		let isCancelled = false;
		const controller = {
			cancel: () => {
				isCancelled = true;
				this.activeRequests.delete(id);
			},
		};
		this.activeRequests.set(id, controller);

		const authConfig = {
			uid: uid ?? '',
		};
		const pingRequest = () =>
			axios
				.post<PingResponse>(
					`https://api.aigaea.net/api/network/ping`,
					{
						timestamp: Math.floor(Date.now() / 1000),
						version: '1.0.1',
						uid: authConfig.uid,
						browser_id,
					},
					{
						headers: {
							Accept: 'application/json, text/plain, *!/!*',
							origin: 'chrome-extension://cpjicfogbgognnifjgmenmaldnmeeeib',
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
							'User-Agent':
								'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
						},
					},
				)
				.then(({ data }) => {
					/**
					 * Логика по обработке ошибок
					 */
					const { msg, code, success } = data;
					if (code === 410) {
						console.error(data);
						//this.handleStop(id);
					}
					const { score, interval } = data.data;
					console.log(
						`Контекст: [${config.proxy.port}]: Сообщение: ${msg ?? ''}`,
						`Успех: [${success}] : Код : ${code}`,
					);
					console.log(`Рейтинг: [${score}]`);
					console.log(`Интервал: [${interval}]`);
				})
				.catch((error) => {
					console.error(`Request ${'x'} failed:`, error.message);
					return new Promise((resolve) => setTimeout(resolve, 1000));
				});

		const makePingRequestChain = () => {
			if (isCancelled) return;
			pingRequest().then(makePingRequestChain);
		};
		const makeAuthRequest = () =>
			axios.post<PingInterface>(
				'http://api.aigaea.net/api/auth/session',
				{},
				{
					headers: {
						Accept: 'application/json, text/plain, *!/!*',
						origin: 'chrome-extension://cpjicfogbgognnifjgmenmaldnmeeeib',
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
						'User-Agent':
							'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
					},
				},
			);

		const authRequestChain = () => {
			if (isCancelled) return;
			makeAuthRequest()
				.then(({ data }) => {
					const { uid } = data.data;
					authConfig.uid = uid;
					return this.projectCreedsRepository.update(
						project.id,
						new ProjectCreedsEntity({
							id: project.id,
							title: project.title,
							credentials: {
								...credentials,
								...authConfig,
							} as any,
						}),
					);
				})
				.then(pingRequest)
				.then(makePingRequestChain);
		};

		/**
		 * Вот здесь в зависимости от того, что передано, так здесь мы и обрабатываем
		 */

		/**
		 * Стратегия
		 */
		if (!uid) {
			authRequestChain();
		}
		if (uid) {
			makePingRequestChain();
		}
		return 'START';
	}

	public handleStop(id: string) {
		const controller = this.activeRequests.get(id);
		if (controller) {
			controller.cancel();
			console.log(`Stopped requests for id ${id}`);
		}
	}
}
