import { Injectable } from '@nestjs/common';
import { AbonentRepository } from '../../../application/repositories/abonent.repository';
import { Abonent } from '../../../domain/entities/abonent';
import { PrismaService } from '../../../../shared/persistence/prisma/prisma.service';

@Injectable()
export class PrismaAbonentRepository extends AbonentRepository {
	constructor(private readonly prisma: PrismaService) {
		super();
	}

	async findAll(): Promise<Abonent[]> {
		const records = await this.prisma.abonent.findMany();
		return records.map(this.toEntity);
	}

	async findById(id: string): Promise<Abonent | null> {
		const record = await this.prisma.abonent.findUnique({ where: { id } });
		return record ? this.toEntity(record) : null;
	}

	async create(data: { email: string }): Promise<Abonent> {
		const record = await this.prisma.abonent.create({ data });
		return this.toEntity(record);
	}

	async update(id: string, data: { email?: string }): Promise<Abonent> {
		const record = await this.prisma.abonent.update({ where: { id }, data });
		return this.toEntity(record);
	}

	async delete(id: string): Promise<void> {
		await this.prisma.abonent.delete({ where: { id } });
	}

	private toEntity(record: any): Abonent {
		return new Abonent(record.id, record.email, record.createdAt, record.updatedAt);
	}
}
