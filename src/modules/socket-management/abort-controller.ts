import axios, { AxiosError } from 'axios';

const activeRequests = new Map<string, AbortController>();

// Запуск процесса
function startRequest(id: string) {
	const controller = new AbortController();
	activeRequests.set(id, controller);

	requestMy(true, controller.signal)
		.then((result) => console.log(`✅ Завершено (${id}):`, result))
		.catch((err) => {
			if (err.message === 'AbortError') {
				console.log(`🚫 Запрос ${id} отменён`);
			} else {
				console.error(`❌ Ошибка (${id}):`, err.message);
			}
		})
		.finally(() => activeRequests.delete(id));
}

// Остановка процесса
function stopRequest(id: string) {
	const controller = activeRequests.get(id);
	if (controller) {
		controller.abort();
	}
}

function requestMy(depth: boolean, signal?: AbortSignal): Promise<string> {
	if (signal?.aborted) {
		return Promise.reject(new Error('AbortError'));
	}
	console.log('Текущая глубина:', depth);
	if (depth === false) {
		return Promise.resolve('ALL');
	}

	const waitPromise = new Promise((resolve, reject) => {
		const timeout = setTimeout(resolve, 2000);
		signal?.addEventListener('abort', () => {
			clearTimeout(timeout);
			reject(new Error('AbortError'));
		});
	});

	return waitPromise
		.then(() => requestMy(true, signal))
		.catch((err) => {
			if (err.message === 'AbortError') {
				throw err;
			}
			return requestMy(false, signal);
		});
}

startRequest('req-1');

setTimeout(() => {
	stopRequest('req-1');
	startRequest('req-2');
}, 5000);
