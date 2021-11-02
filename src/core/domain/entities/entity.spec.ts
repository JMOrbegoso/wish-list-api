import { Entity } from './entity';
import { UniqueId } from '../value-objects';

describe('entities', () => {
  class ProductEntity extends Entity {
    public price: number;

    private constructor(id: UniqueId, price: number) {
      super(id);

      this.price = price;
    }

    static create(id: UniqueId, price: number): ProductEntity {
      return new ProductEntity(id, price);
    }

    public get id(): UniqueId {
      return this._id;
    }
  }

  it('created product entity should store the values', () => {
    // Arrange

    // Act
    const id = 'id';
    const uniqueId = UniqueId.create(id);
    const price = 40;
    const product = ProductEntity.create(uniqueId, price);

    // Assert
    expect(product.id.value).toBe(id);
    expect(product.price).toBe(price);
  });

  it('both entities should be different', () => {
    // Arrange

    // Act
    const id_1 = 'id_1';
    const id_2 = 'id_2';
    const uniqueId_1 = UniqueId.create(id_1);
    const uniqueId_2 = UniqueId.create(id_2);
    const price = 40;
    const product_1 = ProductEntity.create(uniqueId_1, price);
    const product_2 = ProductEntity.create(uniqueId_2, price);
    const result = product_1.equals(product_2);

    // Assert
    expect(result).toBe(false);
  });

  it('both entities should be different', () => {
    // Arrange

    // Act
    const id = 'id';
    const uniqueId = UniqueId.create(id);
    const price = 20;
    const product = ProductEntity.create(uniqueId, price);
    const result = product.equals(undefined);

    // Assert
    expect(result).toBe(false);
  });

  it('both entities should be different', () => {
    // Arrange

    // Act
    const id = 'id';
    const uniqueId = UniqueId.create(id);
    const price = 20;
    const product = ProductEntity.create(uniqueId, price);
    const result = product.equals(null);

    // Assert
    expect(result).toBe(false);
  });

  it('both entities should be equal', () => {
    // Arrange

    // Act
    const id = 'id';
    const uniqueId = UniqueId.create(id);
    const price_1 = 40;
    const price_2 = 80;
    const product_1 = ProductEntity.create(uniqueId, price_1);
    const product_2 = ProductEntity.create(uniqueId, price_2);
    const result = product_1.equals(product_2);

    // Assert
    expect(result).toBe(true);
  });
});
