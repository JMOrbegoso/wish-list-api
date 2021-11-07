import { UniqueId } from '..';

describe('core', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('unique-id', () => {
        it('should throw an error when trying to create a UniqueId from undefined', () => {
          // Arrange

          // Act

          // Assert
          expect(() => UniqueId.create(undefined)).toThrowError('Invalid id');
        });

        it('should throw an error when trying to create a UniqueId from null', () => {
          // Arrange

          // Act

          // Assert
          expect(() => UniqueId.create(null)).toThrowError('Invalid id');
        });

        it('should throw an error when trying to create a UniqueId from an empty string', () => {
          // Arrange

          // Act

          // Assert
          expect(() => UniqueId.create('')).toThrowError('Invalid id');
        });

        it('should create an UniqueId instance and should store the value', () => {
          // Arrange

          // Act
          const id = 'id';
          const uniqueId = UniqueId.create(id);

          // Assert
          expect(uniqueId.getId).toBe(id);
        });

        it('create two UniqueId instances with different value and compare them using "equals" should return false', () => {
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

        it('create two UniqueId instances with the same value and compare them using "equals" should return true', () => {
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
