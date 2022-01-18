import { EntityId } from '../entities';
import { DateTime } from '../value-objects';

export abstract class DomainEvent {
  public readonly createdAt: DateTime;

  protected constructor() {
    this.createdAt = DateTime.now();
  }

  abstract getAggregateRootId(): EntityId;
}
