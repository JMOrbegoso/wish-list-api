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

        it('created domain event should save values', () => {
          // Arrange
          const id = 'id';
          const uniqueId = UniqueId.create(id);
          const productName = 'product name';

          // Act
          const domainEvent = new ProductCreated(uniqueId, productName);

          // Assert
          expect(domainEvent.id.getId).toBe(uniqueId.getId);
          expect(domainEvent.name).toBe(productName);
        });

        it('creation date should be valid', () => {
          // Arrange
          const creationDate = new Date();
          const id = 'id';
          const uniqueId = UniqueId.create(id);
          const productName = 'product name';

          // Act
          const domainEvent = new ProductCreated(uniqueId, productName);

          // Assert
          expect(domainEvent.createdAt.getUTCDate()).toBeCloseTo(
            creationDate.getUTCDate(),
          );
        });
      });
    });
  });
});
