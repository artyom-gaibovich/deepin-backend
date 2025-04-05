import { AbonentRepository } from '../repositories/abonent.repository';
import { Abonent } from '../../domain/entities/abonent';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateAbonentUseCase {
	constructor(@Inject() private readonly repository: AbonentRepository) {}
	async execute(email: string): Promise<Abonent> {
		return this.repository.create({ email });
	}
}
