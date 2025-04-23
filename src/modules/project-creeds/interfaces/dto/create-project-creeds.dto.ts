import { IsEmail, IsJSON, IsOptional, IsString } from 'class-validator';

export class CreateProjectCreedsDto {
	@IsString()
	title: string;

	@IsOptional()
	@IsJSON()
	credentials: Record<string, any>;
}
