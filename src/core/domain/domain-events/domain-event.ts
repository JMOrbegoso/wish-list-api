import { UniqueId } from '../value-objects';

export abstract class DomainEvent {
  public readonly createdAt: Date;

  protected constructor() {
    this.createdAt = new Date();
  }

  abstract getAggregateRootId(): UniqueId;
}
