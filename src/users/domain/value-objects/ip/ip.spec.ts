import { InvalidIpError, Ip } from '..';

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
      describe('ip', () => {
        test.each([undefined, null, ''])(
          'should throw an error when trying to create a Ip from %p',
          (invalid) => {
            // Arrange

            // Act

            // Assert
            expect(() => Ip.create(invalid)).toThrowError(InvalidIpError);
          },
        );

        test.each(validValues)('should create a Ip from %p', (valid) => {
          // Arrange

          // Act
          const ip = Ip.create(valid);

          // Assert
          expect(ip.getIp).toBe(valid);
        });

        test.each([
          [validValues[0], validValues[1]],
          [validValues[1], validValues[0]],
          [validValues[0], validValues[2]],
          [validValues[2], validValues[0]],
          [validValues[0], validValues[3]],
        ])(
          'comparing two Ip created from two different values (%p and %p) should return false',
          (text1, text2) => {
            // Arrange

            // Act
            const ip_1 = Ip.create(text1);
            const ip_2 = Ip.create(text2);
            const result = ip_1.equals(ip_2);

            // Assert
            expect(result).toBe(false);
          },
        );

        test.each(validValues)(
          'comparing two Ip created from the same value (%p) should return true',
          (text) => {
            // Arrange

            // Act
            const ip1 = Ip.create(text);
            const ip2 = Ip.create(text);
            const result = ip1.equals(ip2);

            // Assert
            expect(result).toBe(true);
          },
        );
      });
    });
  });
});
