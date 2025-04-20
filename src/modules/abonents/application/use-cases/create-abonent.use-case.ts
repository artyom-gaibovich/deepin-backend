import { AbonentRepository } from '../repositories/abonent.repository';
import { Abonent } from '../../domain/entities/abonent';
import { BadRequestException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';

@Injectable()
export class CreateAbonentUseCase {
	constructor(@Inject() private readonly repository: AbonentRepository) {}

	private logger = new Logger(CreateAbonentUseCase.name);

	async execute({ email, passwordHash }): Promise<Abonent> {
		return this.repository
			.create({ email, passwordHash })
			.then((data) => data)
			.catch((err) => {
				if (err.code === 'P2002') {
					throw new BadRequestException(`Abonent with email ${email} already exists`);
				}
				throw err;
			});
	}
}
