import { DomainEvent } from './domain-event';
import { UniqueId } from '../value-objects';

describe('domain-events', () => {
  class ProductCreated extends DomainEvent {
    public id: UniqueId;
    public name: string;

    constructor(id: UniqueId, name: string) {
      super();

      this.id = id;
      this.name = name;
    }

    getAggregateRootId(): UniqueId {
      return this.id;
    }
  }

  it('created domain event should save values', () => {
    // Arrange
    const id = UniqueId.create();
    const productName = 'product name';

    // Act
    const domainEvent = new ProductCreated(id, productName);

    // Assert
    expect(domainEvent.id.getId).toBe(id.getId);
    expect(domainEvent.name).toBe(productName);
  });

  it('creation date should be valid', () => {
    // Arrange
    const creationDate = new Date();
    const id = UniqueId.create();
    const productName = 'product name';

    // Act
    const domainEvent = new ProductCreated(id, productName);

    // Assert
    expect(domainEvent.createdAt.getUTCDate()).toBeCloseTo(
      creationDate.getUTCDate(),
    );
  });
});
