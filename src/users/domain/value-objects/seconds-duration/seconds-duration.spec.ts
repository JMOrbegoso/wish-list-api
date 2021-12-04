import {
  InvalidSecondsDurationError,
  SecondsDuration,
  SecondsDurationIsTooLongError,
} from '..';

const validValues = [1, 100, 100000, 5000000, SecondsDuration.Max];

describe('users', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('duration', () => {
        test.each([undefined, null, 0, 0.5, 10.4, 18.9])(
          'should throw an error when trying to create a SecondsDuration from %p',
          (invalid) => {
            // Arrange

            // Act

            // Assert
            expect(() => SecondsDuration.create(invalid)).toThrowError(
              InvalidSecondsDurationError,
            );
          },
        );

        test.each([
          SecondsDuration.Max + 1,
          SecondsDuration.Max + 5,
          SecondsDuration.Max + 10,
        ])(
          'should throw an error when trying to create a SecondsDuration from %p (More characters than the limit)',
          (larger) => {
            // Arrange

            // Act

            // Assert
            expect(() => SecondsDuration.create(larger)).toThrowError(
              SecondsDurationIsTooLongError,
            );
          },
        );

        test.each(validValues)(
          'should create a SecondsDuration from %p',
          (valid) => {
            // Arrange

            // Act
            const duration = SecondsDuration.create(valid);

            // Assert
            expect(duration.getDuration).toBe(valid);
          },
        );

        test.each([
          [validValues[0], validValues[1]],
          [validValues[1], validValues[0]],
          [validValues[0], validValues[2]],
          [validValues[2], validValues[0]],
          [validValues[0], validValues[3]],
        ])(
          'comparing two SecondsDuration created from two different values (%p and %p) should return false',
          (text1, text2) => {
            // Arrange

            // Act
            const duration_1 = SecondsDuration.create(text1);
            const duration_2 = SecondsDuration.create(text2);
            const result = duration_1.equals(duration_2);

            // Assert
            expect(result).toBe(false);
          },
        );

        test.each(validValues)(
          'comparing two SecondsDuration created from the same value (%p) should return true',
          (text) => {
            // Arrange

            // Act
            const duration1 = SecondsDuration.create(text);
            const duration2 = SecondsDuration.create(text);
            const result = duration1.equals(duration2);

            // Assert
            expect(result).toBe(true);
          },
        );
      });
    });
  });
});
