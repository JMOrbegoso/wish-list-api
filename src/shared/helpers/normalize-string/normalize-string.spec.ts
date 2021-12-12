import { normalizeString } from '..';

describe('shared', () => {
  describe('helpers', () => {
    describe('normalizeString', () => {
      it('normalize an undefined should return an empty string', () => {
        // Arrange
        const text = undefined;
        const normalized = '';

        // Act
        const result = normalizeString(text);

        // Assert
        expect(result).toBe(normalized);
      });

      it('normalize a null should return an empty string', () => {
        // Arrange
        const text = null;
        const normalized = '';

        // Act
        const result = normalizeString(text);

        // Assert
        expect(result).toBe(normalized);
      });

      it('normalize an empty string should return an empty string', () => {
        // Arrange
        const text = '';
        const normalized = '';

        // Act
        const result = normalizeString(text);

        // Assert
        expect(result).toBe(normalized);
      });

      it('normalize a string should return the string normalized', () => {
        // Arrange
        const text = 'aBc';
        const normalized = 'abc';

        // Act
        const result = normalizeString(text);

        // Assert
        expect(result).toBe(normalized);
      });

      it('normalize a string should return the string normalized', () => {
        // Arrange
        const text = 'aBc1De_YYy';
        const normalized = 'abc1de_yyy';

        // Act
        const result = normalizeString(text);

        // Assert
        expect(result).toBe(normalized);
      });
    });
  });
});
