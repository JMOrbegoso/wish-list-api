import { MillisecondsDate } from '..';

describe('core', () => {
  describe('value-objects', () => {
    describe('milliseconds-date', () => {
      it('should create a valid milliseconds date', () => {
        // Arrange

        // Act
        const milliseconds = Date.now();
        const millisecondsDate = MillisecondsDate.create(undefined);

        // Assert
        expect(millisecondsDate.value).toBeCloseTo(milliseconds);
      });

      it('should create a valid milliseconds date', () => {
        // Arrange

        // Act
        const milliseconds = Date.now();
        const millisecondsDate = MillisecondsDate.create(null);

        // Assert
        expect(millisecondsDate.value).toBeCloseTo(milliseconds);
      });

      it('should create a valid milliseconds date', () => {
        // Arrange

        // Act
        const date = new Date('1999-10-10');
        const millisecondsDate = MillisecondsDate.create(date.getTime());

        // Assert
        expect(millisecondsDate.value).toBeCloseTo(date.getTime());
      });

      it('both value objects should be different', () => {
        // Arrange

        // Act
        const date_1 = new Date('1999-10-10');
        const date_2 = new Date('1990-5-5');
        const millisecondsDate_1 = MillisecondsDate.create(date_1.getTime());
        const millisecondsDate_2 = MillisecondsDate.create(date_2.getTime());

        const result = millisecondsDate_1.equals(millisecondsDate_2);

        // Assert
        expect(result).toBe(false);
      });

      it('both value objects should be different', () => {
        // Arrange

        // Act
        const date = new Date('1990-5-5');
        const millisecondsDate = MillisecondsDate.create(date.getTime());
        const result = millisecondsDate.equals(undefined);

        // Assert
        expect(result).toBe(false);
      });

      it('both value objects should be different', () => {
        // Arrange

        // Act
        const date = new Date('1990-5-5');
        const millisecondsDate = MillisecondsDate.create(date.getTime());
        const result = millisecondsDate.equals(null);

        // Assert
        expect(result).toBe(false);
      });

      it('both value objects should be equal', () => {
        // Arrange

        // Act
        const date = new Date('1990-5-5');
        const millisecondsDate_1 = MillisecondsDate.create(date.getTime());
        const millisecondsDate_2 = MillisecondsDate.create(date.getTime());
        const result = millisecondsDate_1.equals(millisecondsDate_2);

        // Assert
        expect(result).toBe(true);
      });

      it('should create a valid milliseconds date', () => {
        // Arrange

        // Act
        const date = new Date('1999-10-10');
        const millisecondsDate = MillisecondsDate.create(date.getTime());

        // Assert
        expect(millisecondsDate.asDate.getTime()).toBe(date.getTime());
      });
    });
  });
});
