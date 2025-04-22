export class ProxyAbonentLinkEntity {
	public readonly abonentId: string;
	public readonly proxyId: string;

	constructor({ abonentId, proxyId }) {
		this.abonentId = abonentId;
		this.proxyId = proxyId;
	}
}
