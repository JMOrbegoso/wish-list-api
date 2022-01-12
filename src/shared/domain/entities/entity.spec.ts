import { MockedObject } from 'ts-jest/dist/utils/testing';
import { Entity } from './entity';
import { EntityId, InvalidEntityIdError } from '.';

describe('shared', () => {
  describe('domain', () => {
    describe('entities', () => {
      describe('entity', () => {
        class ProductId extends EntityId {
          protected readonly entityIdType = 'ProductId';

          private constructor(id: string) {
            super(id);
          }

          static create(id: string): ProductId {
            return new ProductId(id);
          }
        }

        class Product extends Entity<ProductId> {
          public price: number;

          private constructor(id: ProductId, price: number) {
            super(id);

            this.price = price;
          }

          static create(id: ProductId, price: number): Product {
            return new Product(id, price);
          }
        }

        it('create a Product with id null should throw error', () => {
          // Arrange
          const price = 100;

          // Act

          // Assert
          expect(() => Product.create(null, price)).toThrowError(
            InvalidEntityIdError,
          );
        });

        it('should create a Product', () => {
          // Arrange
          const productId = { value: 'id-0' } as MockedObject<ProductId>;
          const price = 100;

          // Act
          const product = Product.create(productId, price);

          // Assert
          expect(product.id.value).toBe(productId.value);
          expect(product.price).toBe(price);
        });

        it('comparing an entity with null should return false without call the "equals" method from ProductId', () => {
          // Arrange
          const productId = {
            value: 'id-0',
            equals: jest.fn(),
          } as MockedObject<ProductId>;
          const price = 100;
          const product = Product.create(productId, price);

          // Act
          const result = product.equals(null);

          // Assert
          expect(result).toBe(false);
          expect(productId.equals.mock.calls).toHaveLength(0);
        });

        it('comparing two entities should call "equals" method from ProductId', () => {
          // Arrange
          const productId = {
            value: 'id-0',
            equals: jest.fn().mockReturnValue(true),
          } as MockedObject<ProductId>;
          const price = 100;
          const product = Product.create(productId, price);

          // Act
          const result = product.equals(product);

          // Assert
          expect(result).toBe(true);
          expect(productId.equals.mock.calls).toHaveLength(1);
        });
      });
    });
  });
});
