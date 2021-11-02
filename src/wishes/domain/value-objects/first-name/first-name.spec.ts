import { FirstName } from '..';

describe('wishes', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('first-name', () => {
        it('should throw error on validation', () => {
          // Arrange

          // Act

          // Assert
          expect(() => FirstName.create(undefined)).toThrowError(
            'Invalid first name',
          );
        });

        it('should throw error on validation', () => {
          // Arrange

          // Act

          // Assert
          expect(() => FirstName.create(null)).toThrowError(
            'Invalid first name',
          );
        });

        it('should throw error on validation', () => {
          // Arrange

          // Act

          // Assert
          expect(() => FirstName.create('')).toThrowError('Invalid first name');
        });

        it('created value object should store the value', () => {
          // Arrange

          // Act
          const name = 'John';
          const nameValueObject = FirstName.create(name);

          // Assert
          expect(nameValueObject.getFirstName).toBe(name);
        });

        it('both value objects should be different', () => {
          // Arrange

          // Act
          const name_1 = 'John';
          const name_2 = 'Johnny';
          const nameValueObject_1 = FirstName.create(name_1);
          const nameValueObject_2 = FirstName.create(name_2);
          const result = nameValueObject_1.equals(nameValueObject_2);

          // Assert
          expect(result).toBe(false);
        });

        it('both value objects should be different', () => {
          // Arrange

          // Act
          const name = 'John';
          const nameValueObject = FirstName.create(name);
          const result = nameValueObject.equals(undefined);

          // Assert
          expect(result).toBe(false);
        });

        it('both value objects should be different', () => {
          // Arrange

          // Act
          const name = 'John';
          const nameValueObject = FirstName.create(name);
          const result = nameValueObject.equals(null);

          // Assert
          expect(result).toBe(false);
        });

        it('both value objects should be equal', () => {
          // Arrange

          // Act
          const name = 'John';
          const nameValueObject_1 = FirstName.create(name);
          const nameValueObject_2 = FirstName.create(name);
          const result = nameValueObject_1.equals(nameValueObject_2);

          // Assert
          expect(result).toBe(true);
        });
      });
    });
  });
});
