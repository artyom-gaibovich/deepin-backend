import { Inject, Injectable } from '@nestjs/common';
import { ProxyRepository } from '../../../application/repositories/proxy.repository';
import { ProxyEntity } from '../../../domain/entities/proxy.entity';
import { PrismaService } from '../../../../shared/persistence/prisma/prisma.service';

@Injectable()
export class ProxyPrismaRepository extends ProxyRepository {
	constructor(@Inject() private prismaService: PrismaService) {
		super();
	}

	create(data: Partial<ProxyEntity>): Promise<void> {
		return this.prismaService.proxy
			.create({
				data: {
					...data,
				},
			})
			.then((d) => d)
			.catch((e) => e);
	}

	delete(id: string): Promise<void> {
		return this.prismaService.proxy
			.delete({
				where: {
					id,
				},
			})
			.then((d) => d)
			.catch((err) => err);
	}

	findAll(params: Record<string, unknown>): Promise<ProxyEntity[]> {
		return this.prismaService.proxy
			.findMany({
				where: {
					...params,
				},
			})
			.then((d) => d)
			.catch((err) => err);
	}

	findById(id: string): Promise<ProxyEntity | null> {
		return this.prismaService.proxy
			.findUnique({
				where: {
					id,
				},
			})
			.then((data) => data)
			.catch((err) => err);
	}

	update(id: string, data: Partial<ProxyEntity>): Promise<ProxyEntity> {
		return this.prismaService.proxy
			.update({
				where: {
					id,
				},
				data: {
					...data,
				},
			})
			.then((d) => d)
			.catch((e) => e);
	}
}
