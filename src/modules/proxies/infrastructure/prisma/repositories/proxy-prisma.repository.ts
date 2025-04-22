import {
	BadRequestException,
	Inject,
	Injectable,
	NotFoundException,
	UseFilters,
} from '@nestjs/common';
import { ProxyRepository } from '../../../application/repositories/proxy.repository';
import { ProxyEntity } from '../../../domain/entities/proxy.entity';
import { PrismaService } from '../../../../shared/persistence/prisma/prisma.service';
import { HttpExceptionFilter } from '../../../../../../libs/http-exception-filter';
import { PrismaClientExceptionFilter } from '../../../../../../libs/prisma-exceptio-filter';

@Injectable()
export class ProxyPrismaRepository extends ProxyRepository {
	constructor(@Inject() private prismaService: PrismaService) {
		super();
	}

	create = (data: Partial<ProxyEntity>): Promise<void> =>
		this.prismaService.proxy
			.create({
				data: {
					...data,
				},
			})
			.then((d) => d)
			.catch((e) => e);

	delete = (id: string): Promise<any> =>
		this.prismaService.proxy
			.delete({
				where: {
					id,
				},
			})
			.then((d) => d);

	findAll = (params: Record<string, unknown>): Promise<ProxyEntity[]> =>
		this.prismaService.proxy
			.findMany({
				where: {
					...params,
				},
			})
			.then((d) => d)
			.catch((err) => err);

	findById = (id: string): Promise<ProxyEntity | null> =>
		this.prismaService.proxy
			.findUnique({
				where: {
					id,
				},
			})
			.then((data) => data)
			.catch((err) => err);

	update = (id: string, data: Partial<ProxyEntity>): Promise<ProxyEntity> =>
		this.prismaService.proxy
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
