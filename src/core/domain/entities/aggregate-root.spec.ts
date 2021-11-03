import { AggregateRoot } from '.';
import { DomainEvent } from '../domain-events';
import { UniqueId } from '../value-objects';

describe('core', () => {
  describe('domain', () => {
    describe('entities', () => {
      describe('aggregate-root', () => {
        class OrderAggregateRoot extends AggregateRoot {
          public price: number;

          private constructor(id: UniqueId, price: number) {
            super(id);

            this.price = price;
          }

          static create(id: UniqueId, price: number): OrderAggregateRoot {
            return new OrderAggregateRoot(id, price);
          }

          public get id(): UniqueId {
            return this._id;
          }
        }

        class OrderAdded extends DomainEvent {
          public order: OrderAggregateRoot;

          constructor(order: OrderAggregateRoot) {
            super();

            this.order = order;
          }

          getAggregateRootId(): UniqueId {
            return this.order.id;
          }
        }

        it('should create an aggregate root instance and should store the values and should have zero domain events', () => {
          // Arrange

          // Act
          const id = 'id';
          const uniqueId = UniqueId.create(id);
          const price = 40;
          const order = OrderAggregateRoot.create(uniqueId, price);

          // Assert
          expect(order.id.getId).toBe(id);
          expect(order.price).toBe(price);
          expect(order.domainEvents.length).toBe(0);
        });

        it('aggregate root instance should have one domain event after add one', () => {
          // Arrange

          // Act
          const id = 'id';
          const uniqueId = UniqueId.create(id);
          const price = 40;
          const order = OrderAggregateRoot.create(uniqueId, price);
          const orderAdded = new OrderAdded(order);
          order.addDomainEvent(orderAdded);

          // Assert
          expect(order.domainEvents.length).toBe(1);
        });

        it('aggregate root instance should have zero domain events after push one using list getter', () => {
          // Arrange

          // Act
          const id = 'id';
          const uniqueId = UniqueId.create(id);
          const price = 40;
          const order = OrderAggregateRoot.create(uniqueId, price);
          const orderAdded = new OrderAdded(order);
          order.domainEvents.push(orderAdded);

          // Assert
          expect(order.domainEvents.length).toBe(0);
        });

        it('aggregate root instance should have zero domain events after add one and clear all of them', () => {
          // Arrange

          // Act
          const id = 'id';
          const uniqueId = UniqueId.create(id);
          const price = 40;
          const order = OrderAggregateRoot.create(uniqueId, price);
          const orderAdded = new OrderAdded(order);
          order.addDomainEvent(orderAdded);
          order.clearDomainEvents();

          // Assert
          expect(order.domainEvents.length).toBe(0);
        });

        it('aggregate root instance should have one domain events after add one and clear all of them using getter', () => {
          // Arrange

          // Act
          const id = 'id';
          const uniqueId = UniqueId.create(id);
          const price = 40;
          const order = OrderAggregateRoot.create(uniqueId, price);
          const orderAdded = new OrderAdded(order);
          order.addDomainEvent(orderAdded);
          order.domainEvents.slice(0, order.domainEvents.length);

          // Assert
          expect(order.domainEvents.length).toBe(1);
        });

        it('create two aggregate root instances with different id and compare them using "equals" should return false', () => {
          // Arrange

          // Act
          const id_1 = 'id_1';
          const id_2 = 'id_2';
          const uniqueId_1 = UniqueId.create(id_1);
          const uniqueId_2 = UniqueId.create(id_2);
          const price = 40;
          const order_1 = OrderAggregateRoot.create(uniqueId_1, price);
          const order_2 = OrderAggregateRoot.create(uniqueId_2, price);
          const result = order_1.equals(order_2);

          // Assert
          expect(result).toBe(false);
        });

        it('create two aggregate root instances with the same id and compare them using "equals" should return true', () => {
          // Arrange

          // Act
          const id = 'id';
          const uniqueId = UniqueId.create(id);
          const price_1 = 40;
          const price_2 = 80;
          const order_1 = OrderAggregateRoot.create(uniqueId, price_1);
          const order_2 = OrderAggregateRoot.create(uniqueId, price_2);
          const result = order_1.equals(order_2);

          // Assert
          expect(result).toBe(true);
        });
      });
    });
  });
});
