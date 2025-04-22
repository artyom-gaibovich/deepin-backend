import { Inject, Injectable } from '@nestjs/common';
import { ProxyRepository } from '../../../application/repositories/proxy.repository';
import { ProxyEntity } from '../../../domain/entities/proxy.entity';
import { PrismaService } from '../../../../shared/persistence/prisma/prisma.service';

@Injectable()
export class ProxyPrismaRepository extends ProxyRepository {
	constructor(@Inject() private prismaService: PrismaService) {
		super();
	}

	create = (data: Partial<ProxyEntity>): Promise<ProxyEntity> =>
		this.prismaService.proxy.create({
			data: {
				...data,
			},
		});

	delete = (id: string): Promise<any> =>
		this.prismaService.proxy.delete({
			where: {
				id,
			},
		});

	findAll = (params: Record<string, unknown>): Promise<ProxyEntity[]> =>
		this.prismaService.proxy.findMany({
			where: {
				...params,
			},
		});

	findById = (id: string): Promise<ProxyEntity | null> =>
		this.prismaService.proxy.findUnique({
			where: {
				id,
			},
		});

	update = (id: string, data: Partial<ProxyEntity>): Promise<ProxyEntity> =>
		this.prismaService.proxy.update({
			where: {
				id,
			},
			data: {
				...data,
			},
		});
}
