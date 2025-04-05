import { AbonentRepository } from '../repositories/abonent.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateAbonentUseCase {
	constructor(private readonly repository: AbonentRepository) {}
	async execute(id: string, email: string) {
		return this.repository.update(id, { email });
	}
}
