import { Module } from '@nestjs/common';
import { SocketManagementController } from './socket-management.controller';
import { SocketService } from './service/socket.service';

@Module({
	providers: [SocketService],
	controllers: [SocketManagementController],
})
export class SocketManagementModule {}
