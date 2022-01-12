import { MockedObject } from 'ts-jest/dist/utils/testing';
import { DomainEvent } from '../domain-events';
import { AggregateRoot, EntityId } from '.';

describe('shared', () => {
  describe('domain', () => {
    describe('entities', () => {
      describe('aggregate-root', () => {
        class OrderId extends EntityId {
          protected readonly entityIdType: string = 'OrderId';

          private constructor(id: string) {
            super(id);
          }

          static create(id: string): OrderId {
            return new OrderId(id);
          }
        }

        class Order extends AggregateRoot<OrderId> {
          public price: number;

          private constructor(id: OrderId, price: number) {
            super(id);

            this.price = price;
          }

          static create(id: OrderId, price: number): Order {
            return new Order(id, price);
          }
        }

        class OrderAdded extends DomainEvent {
          public order: Order;

          constructor(order: Order) {
            super();

            this.order = order;
          }

          getAggregateRootId(): EntityId {
            return this.order.id;
          }
        }

        it('should create a valid Order and should have zero domain events', () => {
          // Arrange
          const orderId = { value: 'id-0' } as MockedObject<OrderId>;
          const price = 100;

          // Act
          const order = Order.create(orderId, price);

          // Assert
          expect(order.id.value).toBe(orderId.value);
          expect(order.price).toBe(price);
          expect(order.domainEvents.length).toBe(0);
        });

        it('push one domain event using list getter to an Order recently created should have zero domain event (should not have an effect)', () => {
          // Arrange
          const orderId = { value: 'id-0' } as MockedObject<OrderId>;
          const price = 100;

          const order = Order.create(orderId, price);
          const orderAdded = new OrderAdded(order);

          // Act
          order.domainEvents.push(orderAdded);

          // Assert
          expect(order.domainEvents.length).toBe(0);
        });

        it('updating one domain event using the list getter of an Order should not have an effect on the original', () => {
          // Arrange
          const orderId = { value: 'id-0' } as MockedObject<OrderId>;
          const price = 100;

          const order = Order.create(orderId, price);
          const orderAdded = new OrderAdded(order);
          order.addDomainEvent(orderAdded);

          // Act
          order.domainEvents[0] = new OrderAdded({ price: 10 } as Order);

          // Assert
          expect((order.domainEvents[0] as OrderAdded).order.price).toBe(price);
        });

        it('adding one domain event to an Order recently created should have one domain event', () => {
          // Arrange
          const orderId = { value: 'id-0' } as MockedObject<OrderId>;
          const price = 100;

          const order = Order.create(orderId, price);
          const orderAdded = new OrderAdded(order);

          // Act
          order.addDomainEvent(orderAdded);

          // Assert
          expect(order.domainEvents.length).toBe(1);
        });

        it('Order with one domain event and clear all of them using getter should still having one domain event (should not have an effect)', () => {
          // Arrange
          const orderId = { value: 'id-0' } as MockedObject<OrderId>;
          const price = 100;

          const order = Order.create(orderId, price);
          const orderAdded = new OrderAdded(order);
          order.addDomainEvent(orderAdded);

          // Act
          order.domainEvents.slice(0, order.domainEvents.length);

          // Assert
          expect(order.domainEvents.length).toBe(1);
        });

        it('Order with one domain event and cleaning all of them using should have zero domain event', () => {
          // Arrange
          const orderId = { value: 'id-0' } as MockedObject<OrderId>;
          const price = 100;

          const order = Order.create(orderId, price);
          const orderAdded = new OrderAdded(order);
          order.addDomainEvent(orderAdded);

          // Act
          order.clearDomainEvents();

          // Assert
          expect(order.domainEvents.length).toBe(0);
        });

        it('comparing two aggregate roots should call "equals" method from OrderId', () => {
          // Arrange
          const orderId = {
            value: 'id-0',
            equals: jest.fn(),
          } as MockedObject<OrderId>;
          const price = 100;

          const order = Order.create(orderId, price);

          // Act
          order.equals(order);

          // Assert
          expect(orderId.equals.mock.calls).toHaveLength(1);
        });
      });
    });
  });
});
