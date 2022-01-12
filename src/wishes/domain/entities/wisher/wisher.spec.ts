import { MockedObject } from 'ts-jest/dist/utils/testing';
import { Wisher, WisherId } from '..';
import { InvalidEntityIdError } from '../../../../shared/domain/entities';

describe('wishes', () => {
  describe('domain', () => {
    describe('entities', () => {
      describe('wisher', () => {
        it('create a Wisher with invalid id should throw error', () => {
          // Arrange

          // Act

          // Assert
          expect(() => Wisher.create(null)).toThrowError(InvalidEntityIdError);
        });

        it('should create a Wisher', () => {
          // Arrange
          const wisherId = { value: 'id-0' } as MockedObject<WisherId>;

          // Act
          const wisher = Wisher.create(wisherId);

          // Assert
          expect(wisher.id.value).toBe(wisherId.value);
        });

        it('comparing two entities should call "equals" method from WisherId', () => {
          // Arrange
          const wisherId = {
            value: 'id-0',
            equals: jest.fn(),
          } as MockedObject<WisherId>;
          const wisher = Wisher.create(wisherId);

          // Act
          wisher.equals(wisher);

          // Assert
          expect(wisherId.equals.mock.calls).toHaveLength(1);
        });
      });
    });
  });
});
