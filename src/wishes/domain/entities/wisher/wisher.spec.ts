import { Wisher } from '..';
import { UniqueId } from '../../../../core/domain/value-objects';

describe('wishes', () => {
  describe('domain', () => {
    describe('entities', () => {
      describe('wisher', () => {
        it('should create a Wisher instance and should store the value', () => {
          // Arrange

          // Act
          const id = 'id';
          const uniqueId = UniqueId.create(id);
          const wisher = Wisher.create(uniqueId);

          // Assert
          expect(wisher.id.getId).toBe(id);
        });

        it('create two Wisher instances with different ids and compare them using "equals" should return false', () => {
          // Arrange

          // Act
          const id_1 = 'id_1';
          const id_2 = 'id_2';
          const uniqueId_1 = UniqueId.create(id_1);
          const uniqueId_2 = UniqueId.create(id_2);
          const wisher_1 = Wisher.create(uniqueId_1);
          const wisher_2 = Wisher.create(uniqueId_2);
          const result = wisher_1.equals(wisher_2);

          // Assert
          expect(result).toBe(false);
        });

        it('create two Wisher instances with the same value and compare them using "equals" should return true', () => {
          // Arrange

          // Act
          const id = 'id';
          const uniqueId = UniqueId.create(id);
          const wisher_1 = Wisher.create(uniqueId);
          const wisher_2 = Wisher.create(uniqueId);
          const result = wisher_1.equals(wisher_2);

          // Assert
          expect(result).toBe(true);
        });
      });
    });
  });
});
