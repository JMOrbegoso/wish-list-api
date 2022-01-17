import {
  InvalidMillisecondsDateError,
  MalformedIso8601DateError,
  MillisecondsDate,
} from '..';

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

        test.each([undefined, null, ''])(
          'should throw an error when trying to create a MillisecondsDate from %p',
          (invalid) => {
            // Arrange

            // Act

            // Assert
            expect(() =>
              MillisecondsDate.createFromString(invalid),
            ).toThrowError(InvalidMillisecondsDateError);
          },
        );

        test.each([
          '2020-12-10',
          '1980/12/10',
          'Mon Jan 17 2022 07:23:12 GMT-0500 (Colombia Standard Time)',
          'Mon, 17 Jan 2022 12:20:40 GMT',
          '2022-01-17T12:23:12.500Z',
        ])(
          'should throw an error when trying to create a MillisecondsDate from the invalid ISO 8601 string date: %p',
          (invalid) => {
            // Arrange

            // Act

            // Assert
            expect(() =>
              MillisecondsDate.createFromString(invalid),
            ).toThrowError(MalformedIso8601DateError);
          },
        );

        test.each(validDates)(
          'should create a MillisecondsDate from the a ISO 8601 string date: %p',
          (date) => {
            // Arrange

            // Act
            const millisecondsDate = MillisecondsDate.createFromString(
              date.toISOString(),
            );

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

        test.each([undefined, null])(
          'should throw an error when trying to compare a MillisecondsDate using isLesser from %p',
          (invalid) => {
            // Arrange
            const date = new Date('2022-01-01');
            const millisecondsDate = MillisecondsDate.createFromDate(date);

            // Act

            // Assert
            expect(() => millisecondsDate.isLesser(invalid)).toThrowError(
              InvalidMillisecondsDateError,
            );
          },
        );

        it('2022-01-01 date isLesser than 2020-01-01 should return false', () => {
          // Arrange
          const date1 = new Date('2022-01-01');
          const date2 = new Date('2020-01-01');

          const millisecondsDate_1 = MillisecondsDate.createFromDate(date1);
          const millisecondsDate_2 = MillisecondsDate.createFromDate(date2);

          // Act
          const result = millisecondsDate_1.isLesser(millisecondsDate_2);

          // Assert
          expect(result).toBe(false);
        });

        it('2020-01-01 date isLesser than 2022-01-01 should return false', () => {
          // Arrange
          const date1 = new Date('2020-01-01');
          const date2 = new Date('2022-01-01');

          const millisecondsDate_1 = MillisecondsDate.createFromDate(date1);
          const millisecondsDate_2 = MillisecondsDate.createFromDate(date2);

          // Act
          const result = millisecondsDate_1.isLesser(millisecondsDate_2);

          // Assert
          expect(result).toBe(true);
        });

        test.each([undefined, null])(
          'should throw an error when trying to compare a MillisecondsDate using isGreater from %p',
          (invalid) => {
            // Arrange
            const date = new Date('2022-01-01');
            const millisecondsDate = MillisecondsDate.createFromDate(date);

            // Act

            // Assert
            expect(() => millisecondsDate.isGreater(invalid)).toThrowError(
              InvalidMillisecondsDateError,
            );
          },
        );

        it('2020-01-01 date isGreater than 2022-01-01 should return false', () => {
          // Arrange
          const date1 = new Date('2020-01-01');
          const date2 = new Date('2022-01-01');

          const millisecondsDate_1 = MillisecondsDate.createFromDate(date1);
          const millisecondsDate_2 = MillisecondsDate.createFromDate(date2);

          // Act
          const result = millisecondsDate_1.isGreater(millisecondsDate_2);

          // Assert
          expect(result).toBe(false);
        });

        it('2022-01-01 date isGreater than 2020-01-01 should return true', () => {
          // Arrange
          const date1 = new Date('2022-01-01');
          const date2 = new Date('2020-01-01');

          const millisecondsDate_1 = MillisecondsDate.createFromDate(date1);
          const millisecondsDate_2 = MillisecondsDate.createFromDate(date2);

          // Act
          const result = millisecondsDate_1.isGreater(millisecondsDate_2);

          // Assert
          expect(result).toBe(true);
        });

        it('reduce seconds to MillisecondsDate using addSeconds', () => {
          // Arrange
          const date = new Date('2022-01-01');
          const secondsToDecrease = 60;
          const millisecondsDate = MillisecondsDate.createFromDate(date);

          // Act
          const result = millisecondsDate.addSeconds(-secondsToDecrease);

          // Assert
          expect(millisecondsDate.getMilliseconds).toBe(date.getTime());
          expect(result.getMilliseconds).not.toBe(
            millisecondsDate.getMilliseconds,
          );
          expect(result.getMilliseconds).toBe(
            date.getTime() - secondsToDecrease * 1000,
          );
        });

        it('add seconds to MillisecondsDate using addSeconds', () => {
          // Arrange
          const date = new Date('2022-01-01');
          const secondsToAdd = 60;
          const millisecondsDate = MillisecondsDate.createFromDate(date);

          // Act
          const result = millisecondsDate.addSeconds(secondsToAdd);

          // Assert
          expect(millisecondsDate.getMilliseconds).toBe(date.getTime());
          expect(result.getMilliseconds).not.toBe(
            millisecondsDate.getMilliseconds,
          );
          expect(result.getMilliseconds).toBe(
            date.getTime() + secondsToAdd * 1000,
          );
        });

        it('use isLesserThanNow with the date 2022-01-01 should return false because the current date is 2020-01-01', () => {
          // Arrange
          const date1 = new Date('2022-01-01');
          const currentDateMock = new Date('2020-01-01');

          const millisecondsDate = MillisecondsDate.createFromDate(date1);
          MillisecondsDate.now = jest
            .fn()
            .mockReturnValue(MillisecondsDate.createFromDate(currentDateMock));

          // Act
          const result = millisecondsDate.isLesserThanNow();

          // Assert
          expect(result).toBe(false);
        });

        it('use isLesserThanNow with the date 2020-01-01 should return true because the current date is 2022-01-01', () => {
          // Arrange
          const date1 = new Date('2020-01-01');
          const currentDateMock = new Date('2022-01-01');

          const millisecondsDate = MillisecondsDate.createFromDate(date1);
          MillisecondsDate.now = jest
            .fn()
            .mockReturnValue(MillisecondsDate.createFromDate(currentDateMock));

          // Act
          const result = millisecondsDate.isLesserThanNow();

          // Assert
          expect(result).toBe(true);
        });

        it('use isGreaterThanNow with the date 2020-01-01 should return false because the current date is 2022-01-01', () => {
          // Arrange
          const date1 = new Date('2020-01-01');
          const currentDateMock = new Date('2022-01-01');

          const millisecondsDate = MillisecondsDate.createFromDate(date1);
          MillisecondsDate.now = jest
            .fn()
            .mockReturnValue(MillisecondsDate.createFromDate(currentDateMock));

          // Act
          const result = millisecondsDate.isGreaterThanNow();

          // Assert
          expect(result).toBe(false);
        });

        it('use isGreaterThanNow with the date 2022-01-01 should return true because the current date is 2020-01-01', () => {
          // Arrange
          const date1 = new Date('2022-01-01');
          const currentDateMock = new Date('2020-01-01');

          const millisecondsDate = MillisecondsDate.createFromDate(date1);
          MillisecondsDate.now = jest
            .fn()
            .mockReturnValue(MillisecondsDate.createFromDate(currentDateMock));

          // Act
          const result = millisecondsDate.isGreaterThanNow();

          // Assert
          expect(result).toBe(true);
        });
      });
    });
  });
});
