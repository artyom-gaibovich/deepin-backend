import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProjectCreedsDto } from './dto/create-project-creeds.dto';
import { UpdateProjectCreedsDto } from './dto/update-project-creeds.dto';
import { ProjectCreedsUseCases } from '../application/project-creeds.use-cases';

@Controller('project-creeds')
export class ProjectCreedsController {
	constructor(private readonly projectCreedsUseCases: ProjectCreedsUseCases) {}

	@Get(':id')
	find(@Param('id') id: string): Promise<any> {
		return this.projectCreedsUseCases.findProxy(id);
	}

	@Get()
	findAll() {
		return this.projectCreedsUseCases.findAll();
	}

	@Post()
	create(@Body() dto: CreateProjectCreedsDto) {
		return this.projectCreedsUseCases.create(dto);
	}

	@Put(':id')
	update(@Param() id: string, @Body() dto: UpdateProjectCreedsDto) {
		return this.projectCreedsUseCases.update(id, dto);
	}

	@Delete(':id')
	delete(@Param() id: string) {
		return this.projectCreedsUseCases.delete(id);
	}
}
