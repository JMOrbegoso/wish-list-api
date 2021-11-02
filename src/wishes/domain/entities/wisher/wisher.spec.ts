import { Wisher } from '..';
import { UniqueId } from '../../../../core/domain/value-objects';
import { v4 as uuidv4 } from 'uuid';

describe('wishes', () => {
  describe('entities', () => {
    describe('wisher', () => {
      it('created wisher entity should store the values', () => {
        // Arrange

        // Act
        const uuid = uuidv4();
        const uniqueId = UniqueId.create(uuid);
        const wisher = Wisher.create(uniqueId);

        // Assert
        expect(wisher.getId.value).toBe(uuid);
      });

      it('both wishers should be different', () => {
        // Arrange

        // Act
        const uuid_1 = uuidv4();
        const uuid_2 = uuidv4();
        const uniqueId_1 = UniqueId.create(uuid_1);
        const uniqueId_2 = UniqueId.create(uuid_2);
        const wisher_1 = Wisher.create(uniqueId_1);
        const wisher_2 = Wisher.create(uniqueId_2);
        const result = wisher_1.equals(wisher_2);

        // Assert
        expect(result).toBe(false);
      });

      it('both wishers should be different', () => {
        // Arrange

        // Act
        const uuid = uuidv4();
        const uniqueId = UniqueId.create(uuid);
        const wisher = Wisher.create(uniqueId);
        const result = wisher.equals(undefined);

        // Assert
        expect(result).toBe(false);
      });

      it('both wishers should be different', () => {
        // Arrange

        // Act
        const uuid = uuidv4();
        const uniqueId = UniqueId.create(uuid);
        const wisher = Wisher.create(uniqueId);
        const result = wisher.equals(null);

        // Assert
        expect(result).toBe(false);
      });

      it('both wishers should be equal', () => {
        // Arrange

        // Act
        const uuid = uuidv4();
        const uniqueId = UniqueId.create(uuid);
        const wisher_1 = Wisher.create(uniqueId);
        const wisher_2 = Wisher.create(uniqueId);
        const result = wisher_1.equals(wisher_2);

        // Assert
        expect(result).toBe(true);
      });
    });
  });
});
