import { Entity } from '../entities';
import { DomainEvent } from '../domain-events';

export abstract class AggregateRoot extends Entity {
  private readonly _domainEvents: DomainEvent[] = [];

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
