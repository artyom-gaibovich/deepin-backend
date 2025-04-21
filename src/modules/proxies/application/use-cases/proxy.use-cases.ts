import { Inject, Injectable } from '@nestjs/common';
import { ProxyEntity } from '../../domain/entities/proxy.entity';
import { ProxyRepository } from '../repositories/proxy.repository';
import { CreateProxyDto } from '../../infrastructure/dto/create-proxy.dto';
import { UpdateProxyDto } from '../../infrastructure/dto/update-proxy.dto';

@Injectable()
export class ProxyUseCases {
	constructor(@Inject() private repository: ProxyRepository) {}

	findProxy(id: string): Promise<ProxyEntity> {
		return this.repository.findById(id);
	}

	findProxies(id: string): Promise<ProxyEntity[]> {
		return this.repository.findAll({ id });
	}

	createProxy(ProxyDTO: CreateProxyDto) {
		return this.repository.create(
			new ProxyEntity({
				...ProxyDTO,
			}),
		);
	}

	updateProxy(id: string, ProxyDTO: UpdateProxyDto) {
		return this.repository.update(
			id,
			new ProxyEntity({
				...ProxyDTO,
			}),
		);
	}

	deleteProxy(id: string): Promise<void> {
		return this.repository.delete(id);
	}
}
