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

        it('should throw error on validation', () => {
          // Arrange

          // Act

          // Assert
          expect(() => NameValueObject.create('')).toThrowError('Invalid name');
        });

        it('created value object should store the value', () => {
          // Arrange

          // Act
          const name = 'John';
          const nameValueObject = NameValueObject.create(name);

          // Assert
          expect(nameValueObject.getName).toBe(name);
        });

        it('both value objects should be different', () => {
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

        it('both value objects should be different', () => {
          // Arrange

          // Act
          const name = 'John';
          const nameValueObject = NameValueObject.create(name);
          const result = nameValueObject.equals(undefined);

          // Assert
          expect(result).toBe(false);
        });

        it('both value objects should be different', () => {
          // Arrange

          // Act
          const name = 'John';
          const nameValueObject = NameValueObject.create(name);
          const result = nameValueObject.equals(null);

          // Assert
          expect(result).toBe(false);
        });

        it('both value objects should be equal', () => {
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
