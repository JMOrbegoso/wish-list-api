import { Entity } from '.';
import { UniqueId } from '../value-objects';
import { DomainEvent } from '../domain-events';

export abstract class AggregateRoot extends Entity {
  private readonly _domainEvents: DomainEvent[] = [];

  protected constructor(id: UniqueId) {
    super(id);
  }

  get domainEvents(): DomainEvent[] {
    return Object.assign([], this._domainEvents);
  }

  public addDomainEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent);
  }

  public clearDomainEvents(): void {
    this._domainEvents.splice(0, this._domainEvents.length);
  }
}
