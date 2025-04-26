import * as axios from 'axios';

const config = {
	browser_id: `6be163cf-9d71-5187-abd5-06c4137153d0`,
	proxy: {
		port: 443,
	},
};

export interface PingInterface {
	data: {
		uid: string;
		name: string;
		email: string;
	};
}

export interface PingResponse {
	code: number;
	success: boolean;
	msg: string;
	data: {
		score: number;
		interval: number;
	};
}

const uid = `10720640016070`;
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiIxMDcyMDY0MDAxNjA3MCIsInVzZXJuYW1lIjoiQXJ0eW9tR3V5Ym92Iiwic2VjcmV0IjoiNTg0MzA4NTgiLCJleHBpcmUiOjE3NDYyMjExNTZ9.JgKZSusRpyhXXPH09-i_rXmKg75xGrUmhqhGGru7t2c`;

function my() {
	axios
		.post<PingInterface>(
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
				/*proxy: {
                    host: '149.78.186.176',
                    port: 32566,
                },*/
			},
		)
		.then(({ data }) => {
			const { uid } = data.data;
			return axios.post<PingResponse>(
				`https://api.aigaea.net/api/network/ping`,
				{
					timestamp: Math.floor(Date.now() / 1000),
					version: '1.0.1',
					uid: uid,
					browser_id: config.browser_id,
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
			);
		})
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
		.catch((err) => {
			console.log(err.response.data);
		});
}

function cr() {
	return axios
		.post<PingResponse>(
			`https://api.aigaea.net/api/network/ping`,
			{
				timestamp: Math.floor(Date.now() / 1000),
				version: '1.0.1',
				uid: uid,
				browser_id: config.browser_id,
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
		});
}

function requestMy(depth: boolean) {
	console.log(depth);
	if (depth === false) {
		return Promise.resolve('ALL');
	} else {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve('OK');
			}, 2000);
		})
			.then(() => {
				return cr();
			})
			.then(() => requestMy(true))
			.catch((err) => requestMy(false));
	}
}

// requestMy (sync) -> Promise (async) - cn(async) -> requestMy() -> requestMy (sync) -> Promise (async) - cn(async) -> requestMy (sync) -> Promise (async) - cn(async)  -> requestMy (sync) -> Promise (async) - cn(async)
/*
execute();
*/
