import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/persistence/prisma/prisma.service';
import { ProxyAbonentRepository } from '../../../application/proxy-abonent.repository';
import { ProxyAbonentLinkEntity } from '../../../domain/entities/proxy-abonent-link.entity';

@Injectable()
export class ProxyAbonentPrismaRepository extends ProxyAbonentRepository {
	constructor(@Inject() private prismaService: PrismaService) {
		super();
	}

	public create = (data: ProxyAbonentLinkEntity): Promise<void> =>
		this.prismaService.proxyToAbonent
			.create({
				data: {
					...data,
				},
			})
			.then((d) => d)
			.catch((e) => e);

	public delete = (data: ProxyAbonentLinkEntity): Promise<void> =>
		this.prismaService.proxyToAbonent
			.delete({
				where: {
					proxyId_abonentId: data,
				},
			})
			.then((d) => d)
			.catch((e) => e);

	public update = (data: ProxyAbonentLinkEntity): Promise<void> =>
		this.prismaService.proxyToAbonent
			.update({
				data: {
					...data,
				},
				where: {
					proxyId_abonentId: data,
				},
			})
			.then((d) => d)
			.catch((e) => e);
}
