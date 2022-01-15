import { Entity, EntityId } from '..';
import { DomainEvent } from '../../domain-events';

export abstract class AggregateRoot<T extends EntityId> extends Entity<T> {
  private readonly _domainEvents: DomainEvent[] = [];

  protected constructor(id: T) {
    super(id);
  }

  get domainEvents(): DomainEvent[] {
    return [...this._domainEvents];
  }

  public addDomainEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent);
  }

  public clearDomainEvents(): void {
    this._domainEvents.splice(0, this._domainEvents.length);
  }
}
