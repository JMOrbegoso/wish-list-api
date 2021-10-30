import { AggregateRoot } from '.';
import { DomainEvent } from '../domain-events';
import { UniqueId } from '../unique-id';
import { v4 as uuidv4 } from 'uuid';

describe('aggregate-roots', () => {
  class OrderAggregateRoot extends AggregateRoot {
    public price: number;

    private constructor(id: UniqueId, price: number) {
      super(id);

      this.price = price;
    }

    static create(id: UniqueId, price: number): OrderAggregateRoot {
      return new OrderAggregateRoot(id, price);
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

  it('created order aggregate root should store the values', () => {
    // Arrange

    // Act
    const uuid = uuidv4();
    const id = UniqueId.create(uuid);
    const price = 40;
    const order = OrderAggregateRoot.create(id, price);

    // Assert
    expect(order.id.value).toBe(uuid);
    expect(order.price).toBe(price);
  });

  it('created order aggregate root should have zero domain events', () => {
    // Arrange

    // Act
    const uuid = uuidv4();
    const id = UniqueId.create(uuid);
    const price = 40;
    const order = OrderAggregateRoot.create(id, price);

    // Assert
    expect(order.domainEvents.length).toBe(0);
  });

  it('created order aggregate root should have one domain events after add one', () => {
    // Arrange

    // Act
    const uuid = uuidv4();
    const id = UniqueId.create(uuid);
    const price = 40;
    const order = OrderAggregateRoot.create(id, price);
    const orderAdded = new OrderAdded(order);
    order.addDomainEvent(orderAdded);

    // Assert
    expect(order.domainEvents.length).toBe(1);
  });

  it('created order aggregate root should have zero domain events after push one using getter', () => {
    // Arrange

    // Act
    const uuid = uuidv4();
    const id = UniqueId.create(uuid);
    const price = 40;
    const order = OrderAggregateRoot.create(id, price);
    const orderAdded = new OrderAdded(order);
    order.domainEvents.push(orderAdded);

    // Assert
    expect(order.domainEvents.length).toBe(0);
  });

  it('created order aggregate root should have zero domain events after add one and clear them', () => {
    // Arrange

    // Act
    const uuid = uuidv4();
    const id = UniqueId.create(uuid);
    const price = 40;
    const order = OrderAggregateRoot.create(id, price);
    const orderAdded = new OrderAdded(order);
    order.addDomainEvent(orderAdded);
    order.clearDomainEvents();

    // Assert
    expect(order.domainEvents.length).toBe(0);
  });

  it('created order aggregate root should have one domain events after add one and clear them using getter', () => {
    // Arrange

    // Act
    const uuid = uuidv4();
    const id = UniqueId.create(uuid);
    const price = 40;
    const order = OrderAggregateRoot.create(id, price);
    const orderAdded = new OrderAdded(order);
    order.addDomainEvent(orderAdded);
    order.domainEvents.slice(0, order.domainEvents.length);

    // Assert
    expect(order.domainEvents.length).toBe(1);
  });

  it('both aggregate roots should be different', () => {
    // Arrange

    // Act
    const uuid_1 = uuidv4();
    const uuid_2 = uuidv4();
    const id_1 = UniqueId.create(uuid_1);
    const id_2 = UniqueId.create(uuid_2);
    const price = 40;
    const order_1 = OrderAggregateRoot.create(id_1, price);
    const order_2 = OrderAggregateRoot.create(id_2, price);
    const result = order_1.equals(order_2);

    // Assert
    expect(result).toBe(false);
  });

  it('both aggregate roots should be different', () => {
    // Arrange

    // Act
    const uuid = uuidv4();
    const id = UniqueId.create(uuid);
    const price = 20;
    const order = OrderAggregateRoot.create(id, price);
    const result = order.equals(undefined);

    // Assert
    expect(result).toBe(false);
  });

  it('both aggregate roots should be different', () => {
    // Arrange

    // Act
    const uuid = uuidv4();
    const id = UniqueId.create(uuid);
    const price = 20;
    const order = OrderAggregateRoot.create(id, price);
    const result = order.equals(null);

    // Assert
    expect(result).toBe(false);
  });

  it('both aggregate roots should be equal', () => {
    // Arrange

    // Act
    const uuid = uuidv4();
    const id = UniqueId.create(uuid);
    const price_1 = 40;
    const price_2 = 80;
    const order_1 = OrderAggregateRoot.create(id, price_1);
    const order_2 = OrderAggregateRoot.create(id, price_2);
    const result = order_1.equals(order_2);

    // Assert
    expect(result).toBe(true);
  });
});
