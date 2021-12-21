import { MockedObject } from 'ts-jest/dist/utils/testing';
import { InvalidUniqueIdError, UniqueId } from '../value-objects';
import { Entity } from './entity';

class Product extends Entity {
  public price: number;

  private constructor(id: UniqueId, price: number) {
    super(id);

    this.price = price;
  }

  static create(id: UniqueId, price: number): Product {
    return new Product(id, price);
  }

  public get id(): UniqueId {
    return this._id;
  }
}

const validValues = [
  [
    {
      getId: 'id-0',
      equals: jest.fn(),
    } as MockedObject<UniqueId>,
    0,
  ],
  [
    {
      getId: 'id-1',
      equals: jest.fn(),
    } as MockedObject<UniqueId>,
    10,
  ],
  [
    {
      getId: 'id-2',
      equals: jest.fn(),
    } as MockedObject<UniqueId>,
    20,
  ],
  [
    {
      getId: 'id-3',
      equals: jest.fn(),
    } as MockedObject<UniqueId>,
    30,
  ],
];

describe('shared', () => {
  describe('domain', () => {
    describe('entities', () => {
      describe('entity', () => {
        test.each(validValues)(
          'create a Product with id null should throw error',
          (uniqueId: MockedObject<UniqueId>, price: number) => {
            // Arrange

            // Act

            // Assert
            expect(() => Product.create(null, price)).toThrowError(
              InvalidUniqueIdError,
            );
          },
        );

        test.each(validValues)(
          'should create a Product with [id: %p] and [price: %p]',
          (uniqueId: MockedObject<UniqueId>, price: number) => {
            // Arrange

            // Act
            const product = Product.create(uniqueId, price);

            // Assert
            expect(product.id.getId).toBe(uniqueId.getId);
            expect(product.price).toBe(price);
          },
        );

        test.each(validValues)(
          'comparing two entities should call "equals" method from UniqueId',
          (uniqueId: MockedObject<UniqueId>, price: number) => {
            // Arrange
            const product = Product.create(uniqueId, price);

            // Act
            product.equals(product);

            // Assert
            expect(uniqueId.equals.mock.calls).toHaveLength(1);
          },
        );
      });
    });
  });
});
