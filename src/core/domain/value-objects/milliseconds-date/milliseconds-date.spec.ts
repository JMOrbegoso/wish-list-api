import { InvalidMillisecondsDateError, MillisecondsDate } from '..';

const validValues = [
  new Date('1980-8-8'),
  new Date('1990-1-2'),
  new Date('1999-5-5'),
  new Date('1999-10-10'),
  new Date('1999-12-12'),
  new Date('2000-01-01'),
  new Date('2005-01-02'),
  new Date('2010-04-04'),
];

describe('core', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('milliseconds-date', () => {
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

          // Act
          const currentDate = new Date();
          const milliseconds = currentDate.getTime();
          const millisecondsDate = MillisecondsDate.create();

          // Assert
          expect(millisecondsDate.getMilliseconds).toBeGreaterThanOrEqual(
            milliseconds,
          );
          expect(millisecondsDate.getMilliseconds).toBeLessThan(
            milliseconds + 100, //add 100ms
          );
        });

        test.each(validValues)(
          'should create a MillisecondsDate from the date: %p',
          (valid) => {
            // Arrange

            // Act
            const millisecondsDate = MillisecondsDate.createFromDate(valid);

            // Assert
            expect(millisecondsDate.getMilliseconds).toBe(valid.getTime());
          },
        );

        test.each(validValues)(
          'should create a MillisecondsDate from the milliseconds of the date: %p',
          (valid) => {
            // Arrange

            // Act
            const millisecondsDate = MillisecondsDate.createFromMilliseconds(
              valid.getTime(),
            );

            // Assert
            expect(millisecondsDate.getMilliseconds).toBe(valid.getTime());
          },
        );

        test.each([
          [validValues[0], validValues[1]],
          [validValues[1], validValues[0]],
          [validValues[0], validValues[2]],
          [validValues[2], validValues[0]],
          [validValues[0], validValues[3]],
          [validValues[0], validValues[4]],
        ])(
          'comparing two MillisecondsDate created from two different values (%p and %p) should return false',
          (value1, value2) => {
            // Arrange

            // Act
            const millisecondsDate_1 = MillisecondsDate.createFromDate(value1);
            const millisecondsDate_2 = MillisecondsDate.createFromDate(value2);
            const result = millisecondsDate_1.equals(millisecondsDate_2);

            // Assert
            expect(result).toBe(false);
          },
        );

        test.each(validValues)(
          'comparing two MillisecondsDate created from the same value (%p) should return true',
          (value) => {
            // Arrange

            // Act
            const millisecondsDate1 = MillisecondsDate.createFromDate(value);
            const millisecondsDate2 = MillisecondsDate.createFromMilliseconds(
              value.getTime(),
            );
            const result = millisecondsDate1.equals(millisecondsDate2);

            // Assert
            expect(result).toBe(true);
          },
        );
      });
    });
  });
});
