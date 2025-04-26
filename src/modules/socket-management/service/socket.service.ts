import { Injectable } from '@nestjs/common';
import * as axios from 'axios';
import { Cancelable } from '../abort.new';

const asyncCallbacks = [
	() => axios.get(`https://jsonplaceholder.typicode.com/posts/1`),
	() => axios.get(`https://jsonplaceholder.typicode.com/posts/2`),
	() => axios.get(`https://jsonplaceholder.typicode.com/posts/3`),
	() => axios.get(`https://jsonplaceholder.typicode.com/posts/4`),
	() => axios.get(`https://jsonplaceholder.typicode.com/posts/6`),
	() => axios.get(`https://jsonplaceholder.typicode.com/posts/7`),
	() => axios.get(`https://jsonplaceholder.typicode.com/posts/8`),
	() => axios.get(`https://jsonplaceholder.typicode.com/posts/9`),
	() => axios.get(`https://jsonplaceholder.typicode.com/posts/9`),
	() => axios.get(`https://jsonplaceholder.typicode.com/posts/9`),
	() => axios.get(`https://jsonplaceholder.typicode.com/posts/9`),
	() => axios.get(`https://jsonplaceholder.typicode.com/posts/9`),
	() => axios.get(`https://jsonplaceholder.typicode.com/posts/9`),
	() => axios.get(`https://jsonplaceholder.typicode.com/posts/9`),
	() => axios.get(`https://jsonplaceholder.typicode.com/posts/9`),
	() => axios.get(`https://jsonplaceholder.typicode.com/posts/9`),
	() => axios.get(`https://jsonplaceholder.typicode.com/posts/9`),
	() => axios.get(`https://jsonplaceholder.typicode.com/posts/9`),
	() => axios.get(`https://jsonplaceholder.typicode.com/posts/9`),
	() => axios.get(`https://jsonplaceholder.typicode.com/posts/9`),
	() => axios.get(`https://jsonplaceholder.typicode.com/posts/9`),
	() => axios.get(`https://jsonplaceholder.typicode.com/posts/9`),
	() => axios.get(`https://jsonplaceholder.typicode.com/posts/9`),
	() => axios.get(`https://jsonplaceholder.typicode.com/posts/9`),
	() => axios.get(`https://jsonplaceholder.typicode.com/posts/9`),
	() => axios.get(`https://jsonplaceholder.typicode.com/posts/9`),
	() => axios.get(`https://jsonplaceholder.typicode.com/posts/9`),
	() => axios.get(`https://jsonplaceholder.typicode.com/posts/9`),
];

function execute(depth, cancel) {
	console.log(depth);
	if (cancel) {
		return Promise.resolve('ALL');
	}

	if (depth === -1) {
		return Promise.resolve('ALL');
	} else {
		return (
			new Cancelable((resolve, reject) => {
				setTimeout(() => {
					resolve('OK');
				}, 1000);
			})
				//@ts-ignore
				.then(() => {
					return axios.get(`https://jsonplaceholder.typicode.com/posts/9`);
				})
				.then(({ data }) => {
					console.log(data);
					execute(asyncCallbacks.length - 1, cancel);
				})
				.catch((err) => console.error(err))
		);
	}
}

@Injectable()
export class SocketService {
	private activeRequests: Map<number, { cancel: () => void }> = new Map();

	public start(id: number) {
		if (this.activeRequests.has(id)) return;

		let isCancelled = false;
		const controller = {
			cancel: () => {
				isCancelled = true;
				this.activeRequests.delete(id);
			},
		};

		this.activeRequests.set(id, controller);

		const makeRequest = () => {
			if (isCancelled) return;

			axios
				.get(`https://jsonplaceholder.typicode.com/posts/${Math.floor(Math.random() * 10) + 1}`)
				.then(({ data }) => {
					console.log(`Request ${id} success:`, data);
					return new Promise((resolve) => setTimeout(resolve, 4000));
				})
				.then(makeRequest)
				.catch((error) => {
					console.error(`Request ${id} failed:`, error.message);
					return new Promise((resolve) => setTimeout(resolve, 1000));
				})
				.then(makeRequest);
		};

		makeRequest();
	}

	public stop(id: number) {
		const controller = this.activeRequests.get(id);
		if (controller) {
			controller.cancel();
			console.log(`Stopped requests for id ${id}`);
		}
	}
}
