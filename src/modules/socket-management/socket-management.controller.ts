import { BadRequestException, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { SocketService } from './service/socket.service';

@Controller('socket-management')
export class SocketManagementController {
	private users: any;

	constructor(@Inject() private readonly socketService: SocketService) {
		this.users = {};
	}

	@Get(':id')
	getData(@Param('id') id: string): any {
		let NumId = Number(id);
		const statesServer = {
			ERROR: () => {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						reject(new BadRequestException());
					}, 2000);
				});
			},
			SUCCESS: () => {
				return new Promise((resolve) => {
					resolve('SUCCESS');
				});
			},
		};
		if (!this.users[NumId]) {
			this.users[NumId] = 0;
		}

		if (this.users[NumId] % 10 === 0) {
			this.users[NumId] += 1;
			return statesServer['ERROR']();
		} else {
			this.users[NumId] += 1;
			return statesServer['SUCCESS']();
		}
	}

	@Get('/start/:id')
	start(@Param('id') id: string): any {
		return this.socketService.start(Number(id));
	}

	@Get('/stop/:id')
	stop(@Param('id') id: string): any {
		return this.socketService.stop(Number(id));
	}

	@Post('/start')
	startWork() {}
}
