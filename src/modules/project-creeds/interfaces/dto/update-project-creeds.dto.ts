import { IsEmail, IsJSON, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateProjectCreedsDto {
	@IsUUID()
	id: string;

	@IsString()
	title: string;

	@IsOptional()
	@IsJSON()
	credentials: Record<string, any>;
}
