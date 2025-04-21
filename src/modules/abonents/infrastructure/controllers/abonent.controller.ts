import { Body, Controller, Delete, Get, Logger, Param, Patch, UseGuards } from '@nestjs/common';
import { CreateAbonentUseCase } from '../../application/use-cases/create-abonent.use-case';
import { UpdateAbonentUseCase } from '../../application/use-cases/update-abonent.use-case';
import { DeleteAbonentUseCase } from '../../application/use-cases/delete-abonent.use-case';
import { UpdateAbonentDto } from '../dto/update-abonent.dto';
import { FindAbonentUseCase } from '../../application/use-cases/find-abonent.use-case';
import { FindAbonentsUseCase } from '../../application/use-cases/find-abonents.use-case';
import { AccessTokenGuard } from '../../../auth/guards/accessToken.guard';
import { ColoredLogger } from '../../../../../libs/logging-interceptor';

@Controller('abonent')
export class AbonentController {
	constructor(
		private readonly createUseCase: CreateAbonentUseCase,
		private readonly findAbonentUseCase: FindAbonentUseCase,
		private readonly findAbonentsUseCase: FindAbonentsUseCase,
		private readonly updateUseCase: UpdateAbonentUseCase,
		private readonly deleteUseCase: DeleteAbonentUseCase,
	) {}

	private logger = new ColoredLogger(DeleteAbonentUseCase.name);

	/*	@UseFilters(new HttpExceptionFilter())
    @UsePipes(new ValidationPipe())
    @Post('/')
    async create(@Body() dto: CreateProxyDto) {
        return this.createUseCase.execute(dto.email, dto.password);
    }*/

	@Get('/')
	async findAll() {
		return this.findAbonentsUseCase.execute();
	}

	@Get(':id')
	async findById(@Param('id') id: string) {
		return this.findAbonentUseCase.execute(id);
	}

	@UseGuards(AccessTokenGuard)
	@Patch(':id')
	update(@Param('id') id: string, @Body() dto: UpdateAbonentDto) {
		return this.updateUseCase.execute(id, dto.email);
	}

	@UseGuards(AccessTokenGuard)
	@Delete(':id')
	delete(@Param('id') id: string) {
		return this.deleteUseCase.execute(id);
	}
}
