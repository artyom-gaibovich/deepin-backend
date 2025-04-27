import * as axios from 'axios';
import { PingInterface, PingResponse } from '../../../../../socket';
import { IProxyAbonentCreeds } from '../../../../../proxies-abonent-orchestration/domain/entities/proxy-abonent-link.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AbstractSocketContext {
	constructor() {}

	handleStart(isCancelled: boolean, config: IProxyAbonentCreeds) {
		const { project, proxy } = config;
		const { credentials } = project;
		const { uid, token, browser_id } = credentials;
		if (!token) {
			throw new Error('No Token provided');
		}
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
					const { msg, code, success } = data;
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
					return pingRequest();
				})
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
	}
}
