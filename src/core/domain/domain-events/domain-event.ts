import { UniqueId, MillisecondsDate } from '../value-objects';

export abstract class DomainEvent {
  public readonly createdAt: MillisecondsDate;

  protected constructor() {
    this.createdAt = MillisecondsDate.create();
  }

  abstract getAggregateRootId(): UniqueId;
}
