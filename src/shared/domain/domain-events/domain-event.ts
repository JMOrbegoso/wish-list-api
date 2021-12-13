import { MillisecondsDate, UniqueId } from '../value-objects';

export abstract class DomainEvent {
  public readonly createdAt: MillisecondsDate;

  protected constructor() {
    this.createdAt = MillisecondsDate.create();
  }

  abstract getAggregateRootId(): UniqueId;
}
