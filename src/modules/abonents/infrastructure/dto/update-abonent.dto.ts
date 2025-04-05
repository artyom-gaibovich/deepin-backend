import { IsEmail, IsOptional } from 'class-validator';

export class UpdateAbonentDto {
	@IsEmail()
	@IsOptional()
	email?: string;
}
