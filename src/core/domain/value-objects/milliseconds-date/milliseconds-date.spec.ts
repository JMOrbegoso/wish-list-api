import { MillisecondsDate, InvalidMillisecondsDateError } from '..';

describe('core', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('milliseconds-date', () => {
        it('should throw an error when trying to create a MillisecondsDate from milliseconds with undefined', () => {
          // Arrange

          // Act

          // Assert
          expect(() =>
            MillisecondsDate.createFromMilliseconds(undefined),
          ).toThrowError(InvalidMillisecondsDateError);
        });

        it('should throw an error when trying to create a MillisecondsDate from milliseconds with null', () => {
          // Arrange

          // Act

          // Assert
          expect(() =>
            MillisecondsDate.createFromMilliseconds(null),
          ).toThrowError(InvalidMillisecondsDateError);
        });

        it('should throw an error when trying to create a MillisecondsDate from date with undefined', () => {
          // Arrange

          // Act

          // Assert
          expect(() => MillisecondsDate.createFromDate(undefined)).toThrowError(
            InvalidMillisecondsDateError,
          );
        });

        it('should throw an error when trying to create a MillisecondsDate from date with null', () => {
          // Arrange

          // Act

          // Assert
          expect(() => MillisecondsDate.createFromDate(null)).toThrowError(
            InvalidMillisecondsDateError,
          );
        });

        it('should create a MillisecondsDate instance with the current date', () => {
          // Arrange

          // Act
          const currentDate = new Date();
          const milliseconds = currentDate.getTime();
          const millisecondsDate = MillisecondsDate.create();

          // Assert
          expect(millisecondsDate.getMilliseconds).toBeCloseTo(milliseconds);
        });

        it('should create a MillisecondsDate instance from a date', () => {
          // Arrange

          // Act
          const currentDate = new Date('1999-10-10');
          const milliseconds = currentDate.getTime();
          const millisecondsDate = MillisecondsDate.createFromDate(currentDate);

          // Assert
          expect(millisecondsDate.getMilliseconds).toBeCloseTo(milliseconds);
        });

        it('should create a MillisecondsDate instance from milliseconds', () => {
          // Arrange

          // Act
          const currentDate = new Date('1999-10-10');
          const milliseconds = currentDate.getTime();
          const millisecondsDate =
            MillisecondsDate.createFromMilliseconds(milliseconds);

          // Assert
          expect(millisecondsDate.getMilliseconds).toBeCloseTo(milliseconds);
        });

        it('create two MillisecondsDate instances with different value and compare them using "equals" should return false', () => {
          // Arrange

          // Act
          const currentDate_1 = new Date('1999-10-10');
          const currentDate_2 = new Date('1990-5-5');
          const millisecondsDate_1 =
            MillisecondsDate.createFromDate(currentDate_1);
          const millisecondsDate_2 =
            MillisecondsDate.createFromDate(currentDate_2);

          const result = millisecondsDate_1.equals(millisecondsDate_2);

          // Assert
          expect(result).toBe(false);
        });

        it('create two MillisecondsDate instances with the same value and compare them using "equals" should return true', () => {
          // Arrange

          // Act
          const currentDate = new Date('1999-10-10');
          const millisecondsDate_1 =
            MillisecondsDate.createFromDate(currentDate);
          const millisecondsDate_2 =
            MillisecondsDate.createFromDate(currentDate);

          const result = millisecondsDate_1.equals(millisecondsDate_2);

          // Assert
          expect(result).toBe(true);
        });
      });
    });
  });
});
