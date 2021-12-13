import { ValueObject } from './value-object';

class Name extends ValueObject<string> {
  protected validate(value: string): void {
    if (!value) throw new Error('Invalid name.');
  }

  static create(value: string): Name {
    return new Name(value);
  }

  public get getName(): string {
    return this.value;
  }
}

const validValues = [
  'John',
  'Johnny',
  'Johnny_0',
  '1John1',
  '999-a-999',
  '999999',
];

describe('shared', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('value-object', () => {
        test.each([undefined, null, ''])(
          'should throw an error when trying to create a Name from %p',
          (invalid) => {
            // Arrange

            // Act

            // Assert
            expect(() => Name.create(invalid)).toThrowError('Invalid name.');
          },
        );

        test.each(validValues)('should create a Name from %p', (valid) => {
          // Arrange

          // Act
          const name = Name.create(valid);

          // Assert
          expect(name.getName).toBe(valid);
        });

        test.each([
          [validValues[0], validValues[1]],
          [validValues[1], validValues[0]],
          [validValues[0], validValues[2]],
          [validValues[2], validValues[0]],
          [validValues[0], validValues[3]],
        ])(
          'comparing two Name created from two different values (%p and %p) should return false',
          (text1, text2) => {
            // Arrange

            // Act
            const name_1 = Name.create(text1);
            const name_2 = Name.create(text2);
            const result = name_1.equals(name_2);

            // Assert
            expect(result).toBe(false);
          },
        );

        test.each(validValues)(
          'comparing a Name created from %p and undefined should return false',
          (text) => {
            // Arrange

            // Act
            const name = Name.create(text);
            const result = name.equals(undefined);

            // Assert
            expect(result).toBe(false);
          },
        );

        test.each(validValues)(
          'comparing a Name created from %p and an invalid Name should return false',
          (text) => {
            // Arrange

            // Act
            const name = Name.create(text);
            const result = name.equals({} as unknown as Name);

            // Assert
            expect(result).toBe(false);
          },
        );

        test.each(validValues)(
          'comparing two Name created from the same value (%p) should return true',
          (text) => {
            // Arrange

            // Act
            const name1 = Name.create(text);
            const name2 = Name.create(text);
            const result = name1.equals(name2);

            // Assert
            expect(result).toBe(true);
          },
        );
      });
    });
  });
});
