import { deepEqual } from '..';

describe('core', () => {
  describe('helpers', () => {
    describe('deepEqual', () => {
      it('comparing undefineds should throw error', () => {
        // Arrange

        // Act

        // Assert
        expect(() => deepEqual(undefined, undefined)).toThrowError();
      });

      it('comparing an undefined and a null should throw error', () => {
        // Arrange

        // Act

        // Assert
        expect(() => deepEqual(undefined, null)).toThrowError();
      });

      it('comparing a null and an undefined should throw error', () => {
        // Arrange

        // Act

        // Assert
        expect(() => deepEqual(null, undefined)).toThrowError();
      });

      it('comparing nulls should throw error', () => {
        // Arrange

        // Act

        // Assert
        expect(() => deepEqual(null, null)).toThrowError();
      });

      it('comparing two empty objects should return true', () => {
        // Arrange
        const object_1 = {};
        const object_2 = {};

        // Act
        const result = deepEqual(object_1, object_2);

        // Assert
        expect(result).toBe(true);
      });

      it('comparing two equal objects should return true', () => {
        // Arrange
        const object_1 = { value: 1 };
        const object_2 = { value: 1 };

        // Act
        const result = deepEqual(object_1, object_2);

        // Assert
        expect(result).toBe(true);
      });

      it('comparing two equal objects should return true', () => {
        // Arrange
        const object_1 = { firstName: 'Jhon', lastName: 'Doe' };
        const object_2 = { firstName: 'Jhon', lastName: 'Doe' };

        // Act
        const result = deepEqual(object_1, object_2);

        // Assert
        expect(result).toBe(true);
      });

      it('comparing two equal objects should return true', () => {
        // Arrange
        const object_1 = { firstName: 'Jhon', lastName: 'Doe', age: 25 };
        const object_2 = { firstName: 'Jhon', lastName: 'Doe', age: 25 };

        // Act
        const result = deepEqual(object_1, object_2);

        // Assert
        expect(result).toBe(true);
      });

      it('comparing two equal objects (with an array nested) should return true', () => {
        // Arrange
        const object_1 = { names: ['Jhon', 'Doe'], age: 25 };
        const object_2 = { names: ['Jhon', 'Doe'], age: 25 };

        // Act
        const result = deepEqual(object_1, object_2);

        // Assert
        expect(result).toBe(true);
      });

      it('comparing two equal objects (with an object nested) should return true', () => {
        // Arrange
        const object_1 = {
          fullName: { firstName: 'Jhon', lastName: 'Doe' },
          age: 25,
        };
        const object_2 = {
          fullName: { firstName: 'Jhon', lastName: 'Doe' },
          age: 25,
        };

        // Act
        const result = deepEqual(object_1, object_2);

        // Assert
        expect(result).toBe(true);
      });

      it('comparing two different objects should return false', () => {
        // Arrange
        const object_1 = { value: 1 };
        const object_2 = { value: 2 };

        // Act
        const result = deepEqual(object_1, object_2);

        // Assert
        expect(result).toBe(false);
      });

      it('comparing two different objects should return false', () => {
        // Arrange
        const object_1 = { firstName: 'Jhon', lastName: 'Doe' };
        const object_2 = { firstName: 'Jhon' };

        // Act
        const result = deepEqual(object_1, object_2);

        // Assert
        expect(result).toBe(false);
      });

      it('comparing two different objects should return false', () => {
        // Arrange
        const object_1 = { firstName: 'Jhon', lastName: 'Doe', age: 25 };
        const object_2 = { firstName: 'Jhon', lastName: 'Doe' };

        // Act
        const result = deepEqual(object_1, object_2);

        // Assert
        expect(result).toBe(false);
      });

      it('comparing two different objects (with an array nested) should return false', () => {
        // Arrange
        const object_1 = { names: ['Jhon', 'Doe'], age: 25 };
        const object_2 = { names: ['Jhon'], age: 25 };

        // Act
        const result = deepEqual(object_1, object_2);

        // Assert
        expect(result).toBe(false);
      });

      it('comparing two different objects (with an object nested) should return false', () => {
        // Arrange
        const object_1 = {
          fullName: { firstName: 'Jhon', lastName: 'Doe' },
          age: 25,
        };
        const object_2 = {
          fullName: { firstName: 'Jhon' },
          age: 25,
        };

        // Act
        const result = deepEqual(object_1, object_2);

        // Assert
        expect(result).toBe(false);
      });
    });
  });
});
