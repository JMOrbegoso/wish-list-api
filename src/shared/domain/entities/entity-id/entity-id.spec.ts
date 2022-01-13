import { EntityId, InvalidEntityIdError } from '..';

describe('shared', () => {
  describe('domain', () => {
    describe('entities', () => {
      describe('entity-id', () => {
        class ProductId extends EntityId {
          protected readonly entityIdType = 'ProductId';

          private constructor(id: string) {
            super(id);
          }

          static create(id: string): ProductId {
            return new ProductId(id);
          }
        }

        class OrderId extends EntityId {
          protected readonly entityIdType: string = 'OrderId';

          private constructor(id: string) {
            super(id);
          }

          static create(id: string): OrderId {
            return new OrderId(id);
          }
        }

        it('create a ProductId with id null should throw error', () => {
          // Arrange

          // Act

          // Assert
          expect(() => ProductId.create(null)).toThrowError(
            InvalidEntityIdError,
          );
        });

        it('should create a ProductId with id = "id-1"', () => {
          // Arrange

          // Act
          const productId = ProductId.create('id-1');

          // Assert
          expect(productId.value).toBe('id-1');
        });

        it('comparing an entity id with null should return false', () => {
          // Arrange
          const productId = ProductId.create('id-2');

          // Act
          const result = productId.equals(null);

          // Assert
          expect(result).toBe(false);
        });

        it('comparing two entity ids of different classes should return false', () => {
          // Arrange
          const productId_1 = ProductId.create('id-1');
          const orderId_1 = OrderId.create('id-1');

          // Act
          const result = productId_1.equals(orderId_1);

          // Assert
          expect(result).toBe(false);
        });

        it('comparing two different entity ids of the same class should return false', () => {
          // Arrange
          const productId_1 = ProductId.create('id-1');
          const productId_2 = ProductId.create('id-2');

          // Act
          const result = productId_1.equals(productId_2);

          // Assert
          expect(result).toBe(false);
        });

        it('comparing two equals entity ids of the same class should return true', () => {
          // Arrange
          const productId_1 = ProductId.create('id-1');
          const productId_2 = ProductId.create('id-1');

          // Act
          const result = productId_1.equals(productId_2);

          // Assert
          expect(result).toBe(true);
        });
      });
    });
  });
});
