export class ProxyEntity {
	public readonly id: string;
	public readonly username?: string;
	public readonly password?: string;
	public readonly port?: number;
	public readonly host?: string;
	public readonly ip?: string;
	public readonly protocol?: string;
	public readonly createdAt?: Date;
	public readonly updatedAt?: Date;

	constructor({ username, password, port, host, protocol, ip }) {
		this.username = username;
		this.password = password;
		this.ip = ip;
		this.port = port;
		this.host = host;
		this.protocol = protocol;
	}
}
