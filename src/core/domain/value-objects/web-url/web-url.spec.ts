import { InvalidWebUrlError, MalformedWebUrlError, WebUrl } from '..';

const validValues = [
  'https://www.com',
  'https://ab.com',
  'https://example.net',
  'https://example.com',
  'https://www.example.com',
  'http://www.example.com',
  'http://blog.example.com',
  'http://www.example.com/product',
  'http://www.example.com/products?id=1&page=2',
  'http://www.example.com#up',
  'http://255.255.255.255',
  'http://255.255.255.255/resource/',
  'http://valid.com/perl.id?key=',
  'http://web-site.com/cgi-bin/perl.cgi?key1=value1&key2',
  'http://www.site.com:8008',
  'http://localhost:3000/users/profile-pictures/01c0fd3a-1eaa-486d-99ad-81bbb9bbf1d4.jpg',
];

describe('core', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('web-url', () => {
        test.each([undefined, null, ''])(
          'should throw an error when trying to create a WebUrl from %p',
          (invalid) => {
            // Arrange

            // Act

            // Assert
            expect(() => WebUrl.create(invalid)).toThrowError(
              InvalidWebUrlError,
            );
          },
        );

        test.each([
          '        ',
          'aaa bbb',
          'aaaaaaa bbbbbbb',
          'aaaaaañ',
          'ññññññ',
          'aaabbbÄ',
          'aaabbb,',
          'aaabbb§',
          ' ',
          'invalid',
          'httpp://',
          'hhttp://www.example.com',
          'httpp://www.example.com',
          '255.255.255.255',
          'www.example.com',
          'example.com',
        ])(
          'should throw an error when trying to create a WebUrl from %p (Malformed)',
          (malformed) => {
            // Arrange

            // Act

            // Assert
            expect(() => WebUrl.create(malformed)).toThrowError(
              MalformedWebUrlError,
            );
          },
        );

        test.each(validValues)('should create a WebUrl from %p', (valid) => {
          // Arrange

          // Act
          const webUrl = WebUrl.create(valid);

          // Assert
          expect(webUrl.getUrl).toBe(valid);
        });

        test.each([
          [validValues[0], validValues[1]],
          [validValues[1], validValues[0]],
          [validValues[0], validValues[2]],
          [validValues[2], validValues[0]],
          [validValues[0], validValues[3]],
        ])(
          'comparing two WebUrl created from two different values (%p and %p) should return false',
          (text1, text2) => {
            // Arrange

            // Act
            const webUrl_1 = WebUrl.create(text1);
            const webUrl_2 = WebUrl.create(text2);
            const result = webUrl_1.equals(webUrl_2);

            // Assert
            expect(result).toBe(false);
          },
        );

        test.each(validValues)(
          'comparing two WebUrl created from the same value (%p) should return true',
          (text) => {
            // Arrange

            // Act
            const webUrl1 = WebUrl.create(text);
            const webUrl2 = WebUrl.create(text);
            const result = webUrl1.equals(webUrl2);

            // Assert
            expect(result).toBe(true);
          },
        );
      });
    });
  });
});
