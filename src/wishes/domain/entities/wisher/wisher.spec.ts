import { Wisher } from '..';
import { UniqueId } from '../../../../core/domain/value-objects';

describe('wishes', () => {
  describe('entities', () => {
    describe('wisher', () => {
      it('created wisher entity should store the values', () => {
        // Arrange

        // Act
        const id = 'id';
        const uniqueId = UniqueId.create(id);
        const wisher = Wisher.create(uniqueId);

        // Assert
        expect(wisher.getId.value).toBe(id);
      });

      it('both wishers should be different', () => {
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

      it('both wishers should be different', () => {
        // Arrange

        // Act
        const id = 'id';
        const uniqueId = UniqueId.create(id);
        const wisher = Wisher.create(uniqueId);
        const result = wisher.equals(undefined);

        // Assert
        expect(result).toBe(false);
      });

      it('both wishers should be different', () => {
        // Arrange

        // Act
        const id = 'id';
        const uniqueId = UniqueId.create(id);
        const wisher = Wisher.create(uniqueId);
        const result = wisher.equals(null);

        // Assert
        expect(result).toBe(false);
      });

      it('both wishers should be equal', () => {
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
