import { AbstractSocketState } from './abstract-socket.state';

export class AuthSocketState extends AbstractSocketState {
	activate(): void {}

	send(): void {}

	toOffline(): void {}

	toOnline(): void {}
}
