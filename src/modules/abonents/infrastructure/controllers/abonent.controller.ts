import { Controller, Get, Post, Param, Patch, Delete, Body } from '@nestjs/common';
import { CreateAbonentUseCase } from '../../application/use-cases/create-abonent.use-case';
import { UpdateAbonentUseCase } from '../../application/use-cases/update-abonent.use-case';
import { DeleteAbonentUseCase } from '../../application/use-cases/delete-abonent.use-case';
import { CreateAbonentDto } from '../dto/create-abonent.dto';
import { UpdateAbonentDto } from '../dto/update-abonent.dto';
import { FindAbonentUseCase } from '../../application/use-cases/find-abonent.use-case';
import { FindAbonentsUseCase } from '../../application/use-cases/find-abonents.use-case';

@Controller('abonent')
export class AbonentController {
	constructor(
		private readonly createUseCase: CreateAbonentUseCase,
		private readonly findAbonentUseCase: FindAbonentUseCase,
		private readonly findAbonentsUseCase: FindAbonentsUseCase,
		private readonly updateUseCase: UpdateAbonentUseCase,
		private readonly deleteUseCase: DeleteAbonentUseCase,
	) {}

	@Post()
	async create(@Body() dto: CreateAbonentDto) {
		return this.createUseCase.execute(dto.email);
	}

	@Get()
	async findAll() {
		return this.findAbonentsUseCase.execute();
	}

	@Get(':id')
	async findById(@Param('id') id: string) {
		return this.findAbonentUseCase.execute(id);
	}

	@Patch(':id')
	async update(@Param('id') id: string, @Body() dto: UpdateAbonentDto) {
		return this.updateUseCase.execute(id, dto.email);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.deleteUseCase.execute(id);
	}
}
