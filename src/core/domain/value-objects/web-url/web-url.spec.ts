import { WebUrl, InvalidWebUrlError, MalformedWebUrlError } from '..';

describe('core', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('web-url', () => {
        it('should throw an error when trying to create a WebUrl from undefined', () => {
          // Arrange

          // Act

          // Assert
          expect(() => WebUrl.create(undefined)).toThrowError(
            InvalidWebUrlError,
          );
        });

        it('should throw an error when trying to create a WebUrl from null', () => {
          // Arrange

          // Act

          // Assert
          expect(() => WebUrl.create(null)).toThrowError(InvalidWebUrlError);
        });

        it('should throw an error when trying to create a WebUrl from an empty string', () => {
          // Arrange

          // Act

          // Assert
          expect(() => WebUrl.create('')).toThrowError(InvalidWebUrlError);
        });

        it('should throw an error when trying to create a WebUrl from an invalid url', () => {
          // Arrange

          // Act

          // Assert
          expect(() => WebUrl.create('invalid')).toThrowError(
            MalformedWebUrlError,
          );
        });

        it('should create a WebUrl instance from a valid url and should store the value', () => {
          // Arrange

          // Act
          const url = 'https://example.com';
          const webUrl = WebUrl.create(url);

          // Assert
          expect(webUrl.getUrl).toBe(url);
        });

        it('create two WebUrl instances with different value and compare them using "equals" should return false', () => {
          // Arrange

          // Act
          const url_1 = 'https://example.com';
          const url_2 = 'https://example.net';
          const webUrl_1 = WebUrl.create(url_1);
          const webUrl_2 = WebUrl.create(url_2);
          const result = webUrl_1.equals(webUrl_2);

          // Assert
          expect(result).toBe(false);
        });

        it('create two WebUrl instances with the same value and compare them using "equals" should return true', () => {
          // Arrange

          // Act
          const name = 'https://example.com';
          const webUrl_1 = WebUrl.create(name);
          const webUrl_2 = WebUrl.create(name);
          const result = webUrl_1.equals(webUrl_2);

          // Assert
          expect(result).toBe(true);
        });
      });
    });
  });
});
