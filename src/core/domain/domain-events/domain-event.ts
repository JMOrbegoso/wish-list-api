import { UniqueId } from '../unique-id';

export abstract class DomainEvent {
	public readonly createdAt: Date;

	protected constructor() {
		this.createdAt = new Date();
	}

	abstract getAggregateRootId(): UniqueId;
}
