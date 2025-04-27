import { IProxyAbonentCreeds } from '../../../../../proxies-abonent-orchestration/domain/entities/proxy-abonent-link.entity';
import { FailsafeSocket } from './failsafe.socket';
import { OfflineSocketState } from './states/offline-socket.state';
import { Inject, Injectable } from '@nestjs/common';
import { ProjectCreedsRepository } from '../../../../../project-creeds/application/project-creeds.repository';
import { AIGAEARequestFactory } from '../factory/aigaea-request.factory';

@Injectable()
export class SocketManagerAbstract {
	public activeRequests: Map<string, { cancel: () => void }> = new Map();
	public sockets: Map<string, FailsafeSocket> = new Map();

	constructor(
		@Inject() public projectCreedsRepository: ProjectCreedsRepository,
		@Inject() private AIGAEARequestFactory: AIGAEARequestFactory,
	) {}

	public handleStart(id: string, config: IProxyAbonentCreeds) {
		const failsafeSocket = new FailsafeSocket(
			this.AIGAEARequestFactory,
			this.projectCreedsRepository,
			new OfflineSocketState(),
			this,
			id,
			config,
		);
		failsafeSocket.startSocket();
		this.sockets.set(id, failsafeSocket);
	}

	public handleStop(id: string) {
		const failsafeSocket = this.sockets.get(id);
		failsafeSocket.stopSocket();
	}
}
