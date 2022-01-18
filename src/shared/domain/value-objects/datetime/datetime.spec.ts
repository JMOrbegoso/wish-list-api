import { DateTime, InvalidDateTimeError, MalformedIso8601DateError } from '..';

describe('shared', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('datetime', () => {
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
          'should throw an error when trying to create a DateTime from %p',
          (invalid) => {
            // Arrange

            // Act

            // Assert
            expect(() => DateTime.createFromDate(invalid)).toThrowError(
              InvalidDateTimeError,
            );
          },
        );

        it('should create a DateTime with the current date', () => {
          // Arrange
          const currentDate = new Date();
          const milliseconds = currentDate.getTime();

          // Act
          const dateTime = DateTime.now();

          // Assert
          expect(dateTime.getMilliseconds).toBeGreaterThanOrEqual(milliseconds);
          expect(dateTime.getMilliseconds).toBeLessThan(
            milliseconds + 100, //add 100ms
          );
        });

        test.each(validDates)(
          'should create a DateTime from the date: %p',
          (date) => {
            // Arrange

            // Act
            const dateTime = DateTime.createFromDate(date);

            // Assert
            expect(dateTime.getMilliseconds).toBe(date.getTime());
          },
        );

        test.each([undefined, null, ''])(
          'should throw an error when trying to create a DateTime from %p',
          (invalid) => {
            // Arrange

            // Act

            // Assert
            expect(() => DateTime.createFromString(invalid)).toThrowError(
              InvalidDateTimeError,
            );
          },
        );

        test.each([
          '1970-12-10',
          '1980/12/10',
          '2019-09-07T-15:50+00',
          '2019-09-07T15:50+00Z',
          '2019-09-07T15:50+01:00',
          '2020-12-10',
          '2022-01-17T12:23:12.00',
          '2022-01-17T12:23:12.000000',
          '2022-01-17T12:23:12.000Z+0000',
          '2022-01-17T12:23:12.Z',
          '2022-01-17T12:23:12.ZZ',
          'Mon Jan 17 2022 07:23:12 GMT-0500 (Colombia Standard Time)',
          'Mon Jan 17 2022 07:23:12 GMT-0500',
          'Mon, 17 Jan 2022 12:20:40 GMT',
        ])(
          'should throw an error when trying to create a DateTime from the invalid ISO 8601 string date: %p',
          (invalid) => {
            // Arrange

            // Act

            // Assert
            expect(() => DateTime.createFromString(invalid)).toThrowError(
              MalformedIso8601DateError,
            );
          },
        );

        test.each(validDates)(
          'should create a DateTime from the a ISO 8601 string date: %p',
          (date) => {
            // Arrange
            const iso8601 = date.toISOString();

            // Act
            const dateTime = DateTime.createFromString(iso8601);

            // Assert
            expect(dateTime.getMilliseconds).toBe(date.getTime());
            expect(dateTime.getIso8601).toBe(iso8601);
          },
        );

        it('comparing two DateTime created from two different values (%p and %p) should return false', () => {
          // Arrange
          const date1 = new Date('2022-01-01');
          const date2 = new Date('2020-01-01');
          const dateTime_1 = DateTime.createFromDate(date1);
          const dateTime_2 = DateTime.createFromDate(date2);

          // Act
          const result = dateTime_1.equals(dateTime_2);

          // Assert
          expect(result).toBe(false);
        });

        it('comparing two DateTime created from the same value (%p) should return true', () => {
          // Arrange
          const date = new Date('2022-01-01');
          const dateTime1 = DateTime.createFromDate(date);
          const dateTime2 = DateTime.createFromDate(date);

          // Act
          const result = dateTime1.equals(dateTime2);

          // Assert
          expect(result).toBe(true);
        });

        test.each([undefined, null])(
          'should throw an error when trying to compare a DateTime using isLesser from %p',
          (invalid) => {
            // Arrange
            const date = new Date('2022-01-01');
            const dateTime = DateTime.createFromDate(date);

            // Act

            // Assert
            expect(() => dateTime.isLesser(invalid)).toThrowError(
              InvalidDateTimeError,
            );
          },
        );

        it('2022-01-01 date isLesser than 2020-01-01 should return false', () => {
          // Arrange
          const date1 = new Date('2022-01-01');
          const date2 = new Date('2020-01-01');

          const dateTime_1 = DateTime.createFromDate(date1);
          const dateTime_2 = DateTime.createFromDate(date2);

          // Act
          const result = dateTime_1.isLesser(dateTime_2);

          // Assert
          expect(result).toBe(false);
        });

        it('2020-01-01 date isLesser than 2022-01-01 should return false', () => {
          // Arrange
          const date1 = new Date('2020-01-01');
          const date2 = new Date('2022-01-01');

          const dateTime_1 = DateTime.createFromDate(date1);
          const dateTime_2 = DateTime.createFromDate(date2);

          // Act
          const result = dateTime_1.isLesser(dateTime_2);

          // Assert
          expect(result).toBe(true);
        });

        test.each([undefined, null])(
          'should throw an error when trying to compare a DateTime using isGreater from %p',
          (invalid) => {
            // Arrange
            const date = new Date('2022-01-01');
            const dateTime = DateTime.createFromDate(date);

            // Act

            // Assert
            expect(() => dateTime.isGreater(invalid)).toThrowError(
              InvalidDateTimeError,
            );
          },
        );

        it('2020-01-01 date isGreater than 2022-01-01 should return false', () => {
          // Arrange
          const date1 = new Date('2020-01-01');
          const date2 = new Date('2022-01-01');

          const dateTime_1 = DateTime.createFromDate(date1);
          const dateTime_2 = DateTime.createFromDate(date2);

          // Act
          const result = dateTime_1.isGreater(dateTime_2);

          // Assert
          expect(result).toBe(false);
        });

        it('2022-01-01 date isGreater than 2020-01-01 should return true', () => {
          // Arrange
          const date1 = new Date('2022-01-01');
          const date2 = new Date('2020-01-01');

          const dateTime_1 = DateTime.createFromDate(date1);
          const dateTime_2 = DateTime.createFromDate(date2);

          // Act
          const result = dateTime_1.isGreater(dateTime_2);

          // Assert
          expect(result).toBe(true);
        });

        it('reduce seconds to DateTime using addSeconds', () => {
          // Arrange
          const date = new Date('2022-01-01');
          const secondsToDecrease = 60;
          const dateTime = DateTime.createFromDate(date);

          // Act
          const result = dateTime.addSeconds(-secondsToDecrease);

          // Assert
          expect(dateTime.getMilliseconds).toBe(date.getTime());
          expect(result.getMilliseconds).not.toBe(dateTime.getMilliseconds);
          expect(result.getMilliseconds).toBe(
            date.getTime() - secondsToDecrease * 1000,
          );
        });

        it('add seconds to DateTime using addSeconds', () => {
          // Arrange
          const date = new Date('2022-01-01');
          const secondsToAdd = 60;
          const dateTime = DateTime.createFromDate(date);

          // Act
          const result = dateTime.addSeconds(secondsToAdd);

          // Assert
          expect(dateTime.getMilliseconds).toBe(date.getTime());
          expect(result.getMilliseconds).not.toBe(dateTime.getMilliseconds);
          expect(result.getMilliseconds).toBe(
            date.getTime() + secondsToAdd * 1000,
          );
        });

        it('use isLesserThanNow with the date 2022-01-01 should return false because the current date is 2020-01-01', () => {
          // Arrange
          const date1 = new Date('2022-01-01');
          const currentDateMock = new Date('2020-01-01');

          const dateTime = DateTime.createFromDate(date1);
          DateTime.now = jest
            .fn()
            .mockReturnValue(DateTime.createFromDate(currentDateMock));

          // Act
          const result = dateTime.isLesserThanNow();

          // Assert
          expect(result).toBe(false);
        });

        it('use isLesserThanNow with the date 2020-01-01 should return true because the current date is 2022-01-01', () => {
          // Arrange
          const date1 = new Date('2020-01-01');
          const currentDateMock = new Date('2022-01-01');

          const dateTime = DateTime.createFromDate(date1);
          DateTime.now = jest
            .fn()
            .mockReturnValue(DateTime.createFromDate(currentDateMock));

          // Act
          const result = dateTime.isLesserThanNow();

          // Assert
          expect(result).toBe(true);
        });

        it('use isGreaterThanNow with the date 2020-01-01 should return false because the current date is 2022-01-01', () => {
          // Arrange
          const date1 = new Date('2020-01-01');
          const currentDateMock = new Date('2022-01-01');

          const dateTime = DateTime.createFromDate(date1);
          DateTime.now = jest
            .fn()
            .mockReturnValue(DateTime.createFromDate(currentDateMock));

          // Act
          const result = dateTime.isGreaterThanNow();

          // Assert
          expect(result).toBe(false);
        });

        it('use isGreaterThanNow with the date 2022-01-01 should return true because the current date is 2020-01-01', () => {
          // Arrange
          const date1 = new Date('2022-01-01');
          const currentDateMock = new Date('2020-01-01');

          const dateTime = DateTime.createFromDate(date1);
          DateTime.now = jest
            .fn()
            .mockReturnValue(DateTime.createFromDate(currentDateMock));

          // Act
          const result = dateTime.isGreaterThanNow();

          // Assert
          expect(result).toBe(true);
        });
      });
    });
  });
});
