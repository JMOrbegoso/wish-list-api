import { DomainEvent } from './domain-event';
import { UniqueId } from '../value-objects';

describe('core', () => {
  describe('domain', () => {
    describe('domain-events', () => {
      describe('domain-event', () => {
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

        it('should create an domain event instance and should store the values', () => {
          // Arrange
          const creationDate = new Date();
          const id = 'id';
          const uniqueId = UniqueId.create(id);
          const productName = 'product name';

          // Act
          const domainEvent = new ProductCreated(uniqueId, productName);

          // Assert
          expect(domainEvent.id.getId).toBe(uniqueId.getId);
          expect(domainEvent.name).toBe(productName);
          expect(domainEvent.createdAt.getUTCDate()).toBeCloseTo(
            creationDate.getUTCDate(),
          );
        });
      });
    });
  });
});
