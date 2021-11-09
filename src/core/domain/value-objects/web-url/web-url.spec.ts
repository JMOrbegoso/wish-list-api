import { WebUrl, InvalidWebUrlError, MalformedWebUrlError } from '..';

describe('core', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('web-url', () => {
        const validValues = [
          'https://www.com',
          'https://a.com',
          'https://ab.com',
          'https://example.net',
          'https://example.com',
        ];

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
          'aaa.bbb',
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
          'www.example.com',
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

        test.each(validValues)('should to create a WebUrl from %p', (valid) => {
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
