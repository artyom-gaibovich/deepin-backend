'use strict';
import * as axios from 'axios';

const cancelable = (fn: any) => {
	const wrapper = (...args: any[]) => (fn ? fn(...args) : null);
	wrapper.cancel = () => (fn = null);
	return wrapper;
};

const fn = (par) => {
	console.log(`Функция вызвана, par: `, par);
};

const asyncCallbacks = [
	() => axios.get(`https://jsonplaceholder.typicode.com/posts/1`),
	() => axios.get(`https://jsonplaceholder.typicode.com/posts/2`),
	() => axios.get(`https://jsonplaceholder.typicode.com/posts/3`),
	() => axios.get(`https://jsonplaceholder.typicode.com/posts/4`),
];

// @ts-ignore
export class Cancelable extends Promise {
	private canceled: boolean;
	constructor(executor) {
		super((resolve, reject) => {
			executor((val) => {
				if (this.canceled) {
					reject(new Error('Cancelled'));
					return;
				}
				resolve(val);
			}, reject);
		});
		this.canceled = false;
	}

	cancel() {
		this.canceled = true;
	}
}
/*

const promises = [
	{
		id: 1,
		promise: new Cancelable((resolve) => {
			setTimeout(() => {
				resolve('first');
			}, 10 * 1000);
		}),
	},
	{
		id: 2,
		promise: new Cancelable((resolve) => {
			setTimeout(() => {
				resolve('first');
			}, 2 * 1000);
		}),
	},
];

setTimeout(() => {
	const { id, promise } = promises.find((el, id) => el.id === 1);
	promise.cancel();
	// @ts-ignore
	promise.then(console.log).catch(console.log);
	console.dir({ promise });
}, 4 * 1000);
*/

/*
{
	const promise = new Cancelable((resolve) => {
		setTimeout(() => {
			resolve('first');
		}, 10);
	});

	promise.then(console.log).catch(console.log);
	console.dir({ promise });
}

{
	const promise = new Cancelable((resolve) => {
		setTimeout(() => {
			resolve('second');
		}, 30);
	});

	promise.cancel();
	promise.then(console.log).catch(console.log);
	console.dir({ promise });
}
*/
