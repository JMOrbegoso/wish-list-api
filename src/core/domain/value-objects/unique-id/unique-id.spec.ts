import { UniqueId } from '..';

describe('core', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('unique-id', () => {
        it('should create a valid unique id', () => {
          // Arrange

          // Act
          const uniqueId = UniqueId.create(undefined);

          // Assert
          expect(uniqueId.getId).not.toBeUndefined();
        });

        it('should create a valid unique id', () => {
          // Arrange

          // Act
          const uniqueId = UniqueId.create(null);

          // Assert
          expect(uniqueId.getId).not.toBeNull();
        });

        it('should create a valid unique id', () => {
          // Arrange

          // Act
          const uniqueId = UniqueId.create('');

          // Assert
          expect(uniqueId.getId).not.toBeNull();
        });

        it('should create a valid unique id', () => {
          // Arrange

          // Act
          const id = 'id';
          const uniqueId = UniqueId.create(id);

          // Assert
          expect(uniqueId.getId).toBe(id);
        });

        it('both unique ids should be different', () => {
          // Arrange

          // Act
          const id = 'id';
          const uniqueId = UniqueId.create(id);
          const result = uniqueId.equals(undefined);

          // Assert
          expect(result).toBe(false);
        });

        it('both unique ids should be different', () => {
          // Arrange

          // Act
          const id = 'id';
          const uniqueId = UniqueId.create(id);
          const result = uniqueId.equals(null);

          // Assert
          expect(result).toBe(false);
        });

        it('both unique ids should be different', () => {
          // Arrange

          // Act
          const id_1 = 'id_1';
          const id_2 = 'id_2';
          const uniqueId_1 = UniqueId.create(id_1);
          const uniqueId_2 = UniqueId.create(id_2);
          const result = uniqueId_1.equals(uniqueId_2);

          // Assert
          expect(result).toBe(false);
        });

        it('both value objects should be equal', () => {
          // Arrange

          // Act
          const id = 'id';
          const uniqueId_1 = UniqueId.create(id);
          const uniqueId_2 = UniqueId.create(id);
          const result = uniqueId_1.equals(uniqueId_2);

          // Assert
          expect(result).toBe(true);
        });
      });
    });
  });
});
