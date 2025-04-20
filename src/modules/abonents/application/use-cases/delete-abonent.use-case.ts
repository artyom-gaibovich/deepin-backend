import { AbonentRepository } from '../repositories/abonent.repository';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';

@Injectable()
export class DeleteAbonentUseCase {
	private logger = new Logger(DeleteAbonentUseCase.name);
	constructor(private readonly repository: AbonentRepository) {}
	async execute(id: string): Promise<any> {
		return this.repository
			.delete(id)
			.then((data) => data)
			.catch((err) => {
				this.logger.error(`Error deleting abonent with id ${id}`, {
					code: err.code,
					message: err.message,
					stack: err.stack,
					meta: err.meta,
				});
				if (err.code === 'P2025') {
					throw new NotFoundException(`Abonent with id ${id} not found`);
				}
				throw err;
			});
	}
}
