import {
	Body,
	Controller,
	Get,
	HttpStatus,
	Inject,
	Param,
	Patch,
	Post,
	UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from '../../../auth/guards/accessToken.guard';
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
	@Patch(':id')
	update(@Param('id') id: string, @Body() updatedDTO: UpdateProxyDto) {
		return this.proxyUseCases.updateProxy(id, updatedDTO);
	}

	@UseGuards(AccessTokenGuard)
	@Get(':id')
	find(@Param('id') id: string) {
		return this.proxyUseCases.findProxy(id);
	}

	@UseGuards(AccessTokenGuard)
	@Get(':id')
	findAll(@Param('id') id: string) {
		return this.proxyUseCases.findProxies(id);
	}

	/*
	@UseGuards(AccessTokenGuard)
*/

	@Post('/')
	create(@Body() createProxyDto: CreateProxyDto) {
		return this.proxyUseCases.createProxy(createProxyDto);
	}
}
