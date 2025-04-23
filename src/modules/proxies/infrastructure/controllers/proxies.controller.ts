import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Inject,
	Param,
	Patch,
	Post,
	Put,
} from '@nestjs/common';
import { ProxyUseCases } from '../../application/use-cases/proxy.use-cases';
import { UpdateProxyDto } from '../dto/update-proxy.dto';
import {
	ApiBadRequestResponse,
	ApiInternalServerErrorResponse,
	ApiNotFoundResponse,
	ApiResponse,
} from '@nestjs/swagger';
import { ResponseDescription } from './response-description';
import { CreateProxyDto } from '../dto/create-proxy.dto';

@Controller('proxies')
export class ProxiesController {
	constructor(@Inject() private proxyUseCases: ProxyUseCases) {}

	@ApiResponse({
		status: HttpStatus.OK,
		description: ResponseDescription.OK,
	})
	@ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
	@ApiNotFoundResponse({ description: ResponseDescription.NOT_FOUND })
	@ApiInternalServerErrorResponse({
		description: ResponseDescription.INTERNAL_SERVER_ERROR,
	})
	/*
	@UseGuards(AccessTokenGuard)
*/
	@Put(':id')
	update(@Param('id') id: string, @Body() updatedDTO: UpdateProxyDto) {
		return this.proxyUseCases.updateProxy(id, updatedDTO);
	}

	/*@UseGuards(AccessTokenGuard)*/
	@Get(':id')
	find(@Param('id') id: string) {
		return this.proxyUseCases.findProxy(id);
	}

	/*@UseGuards(AccessTokenGuard)*/

	//TODO Добавить filter=?(чтобы была поисковая выдача по определенным критериям)
	@Get()
	findAll() {
		return this.proxyUseCases.findProxies();
	}

	/*
	@UseGuards(AccessTokenGuard)
*/

	@Post('/')
	create(@Body() createProxyDto: CreateProxyDto) {
		return this.proxyUseCases.createProxy(createProxyDto);
	}

	@Delete(':id')
	delete(@Param('id') id: string) {
		return this.proxyUseCases.deleteProxy(id);
	}
}
