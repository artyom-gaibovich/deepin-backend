import { IsEmail } from 'class-validator';

export class CreateAbonentDto {
	@IsEmail()
	email: string;
}
