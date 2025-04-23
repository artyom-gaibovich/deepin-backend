export class ProxyAbonentLinkEntity {
	public readonly abonentId: string;
	public readonly proxyId: string;
	public readonly projectCreedsId: string;

	constructor({ abonentId, proxyId, projectCreedsId }) {
		this.abonentId = abonentId;
		this.proxyId = proxyId;
		this.projectCreedsId = projectCreedsId;
	}
}
