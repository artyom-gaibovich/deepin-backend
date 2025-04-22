import { ProxyAbonentLinkEntity } from '../domain/entities/proxy-abonent-link.entity';

export abstract class ProxyAbonentRepository {
	abstract create(data: ProxyAbonentLinkEntity): Promise<void>;
	abstract delete(data: ProxyAbonentLinkEntity): Promise<void>;
	abstract update(data: ProxyAbonentLinkEntity): Promise<void>;
}
