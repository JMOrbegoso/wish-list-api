import { MockedObject } from 'ts-jest/dist/utils/testing';
import { mocked } from 'ts-jest/utils';
import { UniqueId } from '../value-objects';
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
      describe('entity', () => {
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
