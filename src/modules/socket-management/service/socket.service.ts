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
	private promises: ({ promise: Cancelable; id: number } | { promise: Cancelable; id: number })[];
	constructor() {
		this.promises = [];
	}

	public start(id: number) {
		this.promises.push({
			id: id,
			promise: new Cancelable((resolve) => {
				return execute(asyncCallbacks.length, this.cancel);
			}),
		});
	}

	public stop(promiseId: number) {
		const { id, promise } = this.promises.find((el, id) => el.id === promiseId);
		this.promises = this.promises.filter((el) => el.id === promiseId);
		promise.cancel();
		//@ts-ignore
		promise.then(console.log).catch(console.log);
		console.dir({ promise });
	}
}
