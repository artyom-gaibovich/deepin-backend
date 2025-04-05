import { AbonentRepository } from '../repositories/abonent.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteAbonentUseCase {
	constructor(private readonly repository: AbonentRepository) {}
	async execute(id: string): Promise<void> {
		return this.repository.delete(id);
	}
}
