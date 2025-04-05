export class Abonent {
	constructor(
		public readonly id: string,
		public email: string,
		public readonly createdAt: Date,
		public readonly updatedAt: Date,
	) {}
}
