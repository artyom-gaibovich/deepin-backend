import { Body, Controller, Delete, Get, Inject, Patch, Post } from '@nestjs/common';
import { ProxiesAbonentOrchestrationUseCases } from '../application/proxies-abonent-orchestration.use-cases';
import { AssignProxyToAbonentDto } from './dto/assign-proxy-to-abonent.dto';
import { ReassignProxyToAbonentDto } from './dto/reassign-proxy-to-abonent.dto';
import { RemoveAssigmentProxyToAbonentDto } from './dto/remove-assigment-proxy-to-abonent.dto';

@Controller('proxy-abonent-orchestration')
export class ProxyAbonentOrchestrationController {
	constructor(
		@Inject() private proxiesAbonentOrchestrationUseCases: ProxiesAbonentOrchestrationUseCases,
	) {}

	@Get('/')
	getAssignedProxiesToAbonent() {}

	@Post('/')
	assignProxyToAbonentDto(@Body() dto: AssignProxyToAbonentDto) {
		return this.proxiesAbonentOrchestrationUseCases.assignProxyToAbonent(dto);
	}

	@Patch('/')
	reassignProxyToAbonentDto(@Body() dto: ReassignProxyToAbonentDto) {
		return this.proxiesAbonentOrchestrationUseCases.reassignProxyToAbonent(dto);
	}

	@Delete('/')
	removeAssigmentProxyToAbonentDto(@Body() dto: RemoveAssigmentProxyToAbonentDto) {
		return this.proxiesAbonentOrchestrationUseCases.removeAssigmentProxyToAbonent(dto);
	}
}
