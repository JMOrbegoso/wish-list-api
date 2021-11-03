import { ValueObject } from './value-object';

describe('core', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('value-object', () => {
        class NameValueObject extends ValueObject<string> {
          protected validate(value: string): void {
            if (!value) throw new Error('Invalid name.');
          }

          static create(value: string): NameValueObject {
            return new NameValueObject(value);
          }

          public get getName(): string {
            return this.value;
          }
        }

        it('should throw an error when trying to create a NameValueObject from undefined', () => {
          // Arrange

          // Act

          // Assert
          expect(() => NameValueObject.create(undefined)).toThrowError(
            'Invalid name',
          );
        });

        it('should throw an error when trying to create a NameValueObject from null', () => {
          // Arrange

          // Act

          // Assert
          expect(() => NameValueObject.create(null)).toThrowError(
            'Invalid name',
          );
        });

        it('should throw an error when trying to create a NameValueObject from an empty text', () => {
          // Arrange

          // Act

          // Assert
          expect(() => NameValueObject.create('')).toThrowError('Invalid name');
        });

        it('should create a NameValueObject instance and should store the value', () => {
          // Arrange

          // Act
          const name = 'John';
          const nameValueObject = NameValueObject.create(name);

          // Assert
          expect(nameValueObject.getName).toBe(name);
        });

        it('create two NameValueObject instances with different value and compare them using "equals" should return false', () => {
          // Arrange

          // Act
          const name_1 = 'John';
          const name_2 = 'Johnny';
          const nameValueObject_1 = NameValueObject.create(name_1);
          const nameValueObject_2 = NameValueObject.create(name_2);
          const result = nameValueObject_1.equals(nameValueObject_2);

          // Assert
          expect(result).toBe(false);
        });

        it('compare a NameValueObject instance with undefined using "equals" should return false', () => {
          // Arrange

          // Act
          const name = 'John';
          const nameValueObject = NameValueObject.create(name);
          const result = nameValueObject.equals(undefined);

          // Assert
          expect(result).toBe(false);
        });

        it('compare a NameValueObject instance with null using "equals" should return false', () => {
          // Arrange

          // Act
          const name = 'John';
          const nameValueObject = NameValueObject.create(name);
          const result = nameValueObject.equals(null);

          // Assert
          expect(result).toBe(false);
        });

        it('create two NameValueObject instances with the same value and compare them using "equals" should return true', () => {
          // Arrange

          // Act
          const name = 'John';
          const nameValueObject_1 = NameValueObject.create(name);
          const nameValueObject_2 = NameValueObject.create(name);
          const result = nameValueObject_1.equals(nameValueObject_2);

          // Assert
          expect(result).toBe(true);
        });
      });
    });
  });
});
