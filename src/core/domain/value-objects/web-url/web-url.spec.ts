import { WebUrl } from '..';

describe('core', () => {
  describe('value-objects', () => {
    describe('web-url', () => {
      it('using "undefined" to create a WebUrl should throw error on validation', () => {
        // Arrange

        // Act

        // Assert
        expect(() => WebUrl.create(undefined)).toThrowError('Invalid url.');
      });

      it('using "null" to create a WebUrl should throw error on validation', () => {
        // Arrange

        // Act

        // Assert
        expect(() => WebUrl.create(null)).toThrowError('Invalid url.');
      });

      it('using an empty string to create a WebUrl should throw error on validation', () => {
        // Arrange

        // Act

        // Assert
        expect(() => WebUrl.create('')).toThrowError('Invalid url.');
      });

      it('using an invalid url to create a WebUrl should throw error on validation', () => {
        // Arrange

        // Act

        // Assert
        expect(() => WebUrl.create('invalid')).toThrowError(
          'Invalid URL: invalid',
        );
      });

      it('using a valid url to create a WebUrl should create it and store the value', () => {
        // Arrange

        // Act
        const url = 'https://example.com';
        const webUrl = WebUrl.create(url);

        // Assert
        expect(webUrl.getUrl).toBe(url);
      });

      it('comparing two equals created WebUrl should be equal', () => {
        // Arrange

        // Act
        const name = 'https://example.com';
        const webUrl_1 = WebUrl.create(name);
        const webUrl_2 = WebUrl.create(name);
        const result = webUrl_1.equals(webUrl_2);

        // Assert
        expect(result).toBe(true);
      });

      it('comparing two different created WebUrl should be different', () => {
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
    });
  });
});
