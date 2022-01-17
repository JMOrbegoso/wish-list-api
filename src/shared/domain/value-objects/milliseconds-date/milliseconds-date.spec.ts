import { InvalidMillisecondsDateError, MillisecondsDate } from '..';

describe('shared', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('milliseconds-date', () => {
        const validDates = [
          new Date('1940-12-2'),
          new Date('1960-11-11'),
          new Date('1975-10-15'),
          new Date('1980-8-8'),
          new Date('1990-1-2'),
          new Date('1999-5-5'),
          new Date('1999-10-10'),
          new Date('1999-12-12'),
          new Date('2000-1-1'),
          new Date('2005-1-2'),
          new Date('2010-4-4'),
          new Date('2050-12-10'),
        ];

        test.each([undefined, null])(
          'should throw an error when trying to create a MillisecondsDate from %p',
          (invalid) => {
            // Arrange

            // Act

            // Assert
            expect(() => MillisecondsDate.createFromDate(invalid)).toThrowError(
              InvalidMillisecondsDateError,
            );
          },
        );

        test.each([undefined, null, 0])(
          'should throw an error when trying to create a MillisecondsDate from %p',
          (invalid) => {
            // Arrange

            // Act

            // Assert
            expect(() =>
              MillisecondsDate.createFromMilliseconds(invalid),
            ).toThrowError(InvalidMillisecondsDateError);
          },
        );

        it('should create a MillisecondsDate with the current date', () => {
          // Arrange
          const currentDate = new Date();
          const milliseconds = currentDate.getTime();

          // Act
          const millisecondsDate = MillisecondsDate.now();

          // Assert
          expect(millisecondsDate.getMilliseconds).toBeGreaterThanOrEqual(
            milliseconds,
          );
          expect(millisecondsDate.getMilliseconds).toBeLessThan(
            milliseconds + 100, //add 100ms
          );
        });

        test.each(validDates)(
          'should create a MillisecondsDate from the date: %p',
          (date) => {
            // Arrange

            // Act
            const millisecondsDate = MillisecondsDate.createFromDate(date);

            // Assert
            expect(millisecondsDate.getMilliseconds).toBe(date.getTime());
          },
        );

        test.each(validDates)(
          'should create a MillisecondsDate from the milliseconds of the date: %p',
          (date) => {
            // Arrange

            // Act
            const millisecondsDate = MillisecondsDate.createFromMilliseconds(
              date.getTime(),
            );

            // Assert
            expect(millisecondsDate.getMilliseconds).toBe(date.getTime());
          },
        );

        it('comparing two MillisecondsDate created from two different values (%p and %p) should return false', () => {
          // Arrange
          const date1 = new Date('2022-01-01');
          const date2 = new Date('2020-01-01');
          const millisecondsDate_1 = MillisecondsDate.createFromDate(date1);
          const millisecondsDate_2 = MillisecondsDate.createFromDate(date2);

          // Act
          const result = millisecondsDate_1.equals(millisecondsDate_2);

          // Assert
          expect(result).toBe(false);
        });

        it('comparing two MillisecondsDate created from the same value (%p) should return true', () => {
          // Arrange
          const date = new Date('2022-01-01');
          const millisecondsDate1 = MillisecondsDate.createFromDate(date);
          const millisecondsDate2 = MillisecondsDate.createFromMilliseconds(
            date.getTime(),
          );

          // Act
          const result = millisecondsDate1.equals(millisecondsDate2);

          // Assert
          expect(result).toBe(true);
        });
      });
    });
  });
});
