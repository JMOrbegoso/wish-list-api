import { InvalidIpAddressError, IpAddress } from '..';

const validValues = [
  '0.0.0.0',
  '192.168.0.0',
  '192.168.0.1',
  '168.127.133.0',
  '255.255.255.0',
];

describe('users', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('ip-address', () => {
        test.each([undefined, null, ''])(
          'should throw an error when trying to create a IpAddress from %p',
          (invalid) => {
            // Arrange

            // Act

            // Assert
            expect(() => IpAddress.create(invalid)).toThrowError(
              InvalidIpAddressError,
            );
          },
        );

        test.each(validValues)('should create a IpAddress from %p', (valid) => {
          // Arrange

          // Act
          const ipAddress = IpAddress.create(valid);

          // Assert
          expect(ipAddress.getIpAddress).toBe(valid);
        });

        test.each([
          [validValues[0], validValues[1]],
          [validValues[1], validValues[0]],
          [validValues[0], validValues[2]],
          [validValues[2], validValues[0]],
          [validValues[0], validValues[3]],
        ])(
          'comparing two IpAddress created from two different values (%p and %p) should return false',
          (text1, text2) => {
            // Arrange

            // Act
            const ipAddress_1 = IpAddress.create(text1);
            const ipAddress_2 = IpAddress.create(text2);
            const result = ipAddress_1.equals(ipAddress_2);

            // Assert
            expect(result).toBe(false);
          },
        );

        test.each(validValues)(
          'comparing two IpAddress created from the same value (%p) should return true',
          (text) => {
            // Arrange

            // Act
            const ipAddress_1 = IpAddress.create(text);
            const ipAddress_2 = IpAddress.create(text);
            const result = ipAddress_1.equals(ipAddress_2);

            // Assert
            expect(result).toBe(true);
          },
        );
      });
    });
  });
});
