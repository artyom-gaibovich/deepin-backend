import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateProxyDto {
	@IsOptional()
	@IsString()
	username: string;

	@IsString()
	@IsOptional()
	password: string;

	@IsString()
	@IsOptional()
	host: string;

	@IsString()
	@IsOptional()
	protocol: string;

	@IsString()
	@IsOptional()
	port: number;
}
