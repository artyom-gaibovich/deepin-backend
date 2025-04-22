import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProxyDto {
	@IsOptional()
	@IsString()
	ip: string;

	@IsOptional()
	@IsString()
	username: string;

	@IsString()
	@IsOptional()
	password: string;

	@IsOptional()
	host: string;

	@IsString()
	@IsOptional()
	protocol: string;

	@IsNumber()
	@IsOptional()
	port: number;
}
