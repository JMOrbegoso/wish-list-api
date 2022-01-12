import { EntityId } from '../entities';
import { DomainEvent } from './domain-event';

describe('shared', () => {
  describe('domain', () => {
    describe('domain-events', () => {
      describe('domain-event', () => {
        class ProductId extends EntityId {
          protected readonly entityIdType: string = 'ProductId';

          private constructor(id: string) {
            super(id);
          }

          static create(id: string): ProductId {
            return new ProductId(id);
          }
        }

        class ProductCreated extends DomainEvent {
          public id: ProductId;
          public name: string;

          constructor(id: ProductId, name: string) {
            super();

            this.id = id;
            this.name = name;
          }

          getAggregateRootId(): ProductId {
            return this.id;
          }
        }

        it('should create a domain event instance and should store the values', () => {
          // Arrange
          const id = 'id';
          const productId = ProductId.create(id);
          const productName = 'product name';

          // Act
          const domainEvent = new ProductCreated(productId, productName);

          // Assert
          expect(domainEvent.id.value).toBe(productId.value);
          expect(domainEvent.name).toBe(productName);
          expect(domainEvent.createdAt).toBeTruthy();
        });
      });
    });
  });
});
