import { Injectable } from '@nestjs/common';
import * as axios from 'axios';

interface AIGAEARequests {
	'POST v1/network/ping': (...args) => [string, any?, any?];
	'GET v1/session/auth': (...args) => [string, any?, any?];
}

@Injectable()
export class AIGAEARequestFactory {
	private activeRequests: Map<keyof AIGAEARequests, any> = new Map([
		[
			'POST v1/network/ping',
			({
				authConfig,
				browser_id,
				token,
			}: {
				token: string;
				browser_id: string;
				authConfig: Record<string, unknown>;
			}) => [
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
			],
		],
		[
			'GET v1/session/auth',
			({ token }: { token: string }) => [
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
			],
		],
	]);

	find(url: keyof AIGAEARequests): (...args) => [string, any?, any?] {
		return this.activeRequests.get(url);
	}
}
