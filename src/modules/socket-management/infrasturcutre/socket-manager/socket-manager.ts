import { Inject } from '@nestjs/common';
import { AbstractSocketContext } from '../context/socket/socket.context';

/**
 * В него мы и прокидываем конкретный сокет контекст
 *
 */
export class SocketManager {
	private activeRequests: Map<string, { cancel: () => void }> = new Map();

	constructor(@Inject() private readonly socketContext: AbstractSocketContext) {}

	public handleStart(id: string) {
		if (this.activeRequests.has(id)) return;
		let isCancelled = false;
		const controller = {
			cancel: () => {
				isCancelled = true;
				this.activeRequests.delete(id);
			},
		};
		this.activeRequests.set(id, controller);
		this.socketContext.handle(isCancelled);
	}

	public handleStop(id: string) {
		const controller = this.activeRequests.get(id);
		if (controller) {
			controller.cancel();
			console.log(`Stopped requests for id ${id}`);
		}
	}
}
