import { mocked } from 'ts-jest/utils';
import { MockedObject } from 'ts-jest/dist/utils/testing';
import { AggregateRoot } from '.';
import { DomainEvent } from '../domain-events';
import { UniqueId } from '../value-objects';

class Order extends AggregateRoot {
  public price: number;

  private constructor(uniqueId: MockedObject<UniqueId>, price: number) {
    super(uniqueId);

    this.price = price;
  }

  static create(uniqueId: MockedObject<UniqueId>, price: number): Order {
    return new Order(uniqueId, price);
  }

  public get id(): UniqueId {
    return this._id;
  }
}

class OrderAdded extends DomainEvent {
  public order: Order;

  constructor(order: Order) {
    super();

    this.order = order;
  }

  getAggregateRootId(): UniqueId {
    return this.order.id;
  }
}

const validValues = [
  [
    mocked<UniqueId>({
      getId: 'id-0',
      equals: jest.fn(),
    } as unknown as UniqueId),
    0,
  ],
  [
    mocked<UniqueId>({
      getId: 'id-1',
      equals: jest.fn(),
    } as unknown as UniqueId),
    10,
  ],
  [
    mocked<UniqueId>({
      getId: 'id-2',
      equals: jest.fn(),
    } as unknown as UniqueId),
    20,
  ],
  [
    mocked<UniqueId>({
      getId: 'id-3',
      equals: jest.fn(),
    } as unknown as UniqueId),
    30,
  ],
];

describe('core', () => {
  describe('domain', () => {
    describe('entities', () => {
      describe('aggregate-root', () => {
        test.each(validValues)(
          'should create a Order with [id: %p], [price: %p] and should have zero domain events',
          (uniqueId: MockedObject<UniqueId>, price: number) => {
            // Arrange

            // Act
            const order = Order.create(uniqueId, price);

            // Assert
            expect(order.id.getId).toBe(uniqueId.getId);
            expect(order.price).toBe(price);
            expect(order.domainEvents.length).toBe(0);
          },
        );

        test.each(validValues)(
          'push one domain event using list getter to an Order recently created should have zero domain event (should not have an effect)',
          (uniqueId: MockedObject<UniqueId>, price: number) => {
            // Arrange
            const order = Order.create(uniqueId, price);
            const orderAdded = new OrderAdded(order);

            // Act
            order.domainEvents.push(orderAdded);

            // Assert
            expect(order.domainEvents.length).toBe(0);
          },
        );

        test.each(validValues)(
          'adding one domain event to an Order recently created should have one domain event',
          (uniqueId: MockedObject<UniqueId>, price: number) => {
            // Arrange
            const order = Order.create(uniqueId, price);
            const orderAdded = new OrderAdded(order);

            // Act
            order.addDomainEvent(orderAdded);

            // Assert
            expect(order.domainEvents.length).toBe(1);
          },
        );

        test.each(validValues)(
          'Order with one domain event and clear all of them using getter should still having one domain event (should not have an effect)',
          (uniqueId: MockedObject<UniqueId>, price: number) => {
            // Arrange
            const order = Order.create(uniqueId, price);
            const orderAdded = new OrderAdded(order);
            order.addDomainEvent(orderAdded);

            // Act
            order.domainEvents.slice(0, order.domainEvents.length);

            // Assert
            expect(order.domainEvents.length).toBe(1);
          },
        );

        test.each(validValues)(
          'Order with one domain event and cleaning all of them using should have zero domain event',
          (uniqueId: MockedObject<UniqueId>, price: number) => {
            // Arrange
            const order = Order.create(uniqueId, price);
            const orderAdded = new OrderAdded(order);
            order.addDomainEvent(orderAdded);

            // Act
            order.clearDomainEvents();

            // Assert
            expect(order.domainEvents.length).toBe(0);
          },
        );

        test.each(validValues)(
          'comparing two aggregate roots should call "equals" method from UniqueId',
          (uniqueId: MockedObject<UniqueId>, price: number) => {
            // Arrange
            const order = Order.create(uniqueId, price);

            // Act
            order.equals(order);

            // Assert
            expect(uniqueId.equals.mock.calls).toHaveLength(1);
          },
        );
      });
    });
  });
});
