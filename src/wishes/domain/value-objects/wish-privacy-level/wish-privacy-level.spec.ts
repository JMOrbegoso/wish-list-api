import {
  InvalidWishPrivacyLevelError,
  PrivacyLevel,
  WishPrivacyLevel,
} from '..';

const validValues = [
  PrivacyLevel.Public,
  PrivacyLevel.JustFriends,
  PrivacyLevel.OnlyMe,
];

describe('wishes', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('wish-privacy-level', () => {
        test.each([undefined, null])(
          'should throw an error when trying to create a WishPrivacyLevel from %p',
          (invalid) => {
            // Arrange

            // Act

            // Assert
            expect(() => WishPrivacyLevel.create(invalid)).toThrowError(
              InvalidWishPrivacyLevelError,
            );
          },
        );

        test.each(validValues)(
          'should create a WishPrivacyLevel from %p',
          (valid) => {
            // Arrange

            // Act
            const wishPrivacyLevel = WishPrivacyLevel.create(valid);

            // Assert
            expect(wishPrivacyLevel.getPrivacyLevel).toBe(valid);
          },
        );

        it('should create a WishPrivacyLevel with public privacy level', () => {
          // Arrange

          // Act
          const publicWishPrivacyLevel = WishPrivacyLevel.public();

          // Assert
          expect(publicWishPrivacyLevel.getPrivacyLevel).toBe(
            PrivacyLevel.Public,
          );
        });

        it('should create a WishPrivacyLevel with justFriends privacy level', () => {
          // Arrange

          // Act
          const justFriendsWishPrivacyLevel = WishPrivacyLevel.justFriends();

          // Assert
          expect(justFriendsWishPrivacyLevel.getPrivacyLevel).toBe(
            PrivacyLevel.JustFriends,
          );
        });

        it('should create a WishPrivacyLevel with onlyMe privacy level', () => {
          // Arrange

          // Act
          const onlyMeWishPrivacyLevel = WishPrivacyLevel.onlyMe();

          // Assert
          expect(onlyMeWishPrivacyLevel.getPrivacyLevel).toBe(
            PrivacyLevel.OnlyMe,
          );
        });

        it('create two WishPrivacyLevel instances with different value and compare them using "equals" should return false', () => {
          // Arrange

          // Act
          const justFriendsWishPrivacyLevel = WishPrivacyLevel.justFriends();
          const onlyMeWishPrivacyLevel = WishPrivacyLevel.create(
            PrivacyLevel.OnlyMe,
          );
          const result = justFriendsWishPrivacyLevel.equals(
            onlyMeWishPrivacyLevel,
          );

          // Assert
          expect(result).toBe(false);
        });

        it('create two WishPrivacyLevel instances with the same value and compare them using "equals" should return true', () => {
          // Arrange

          // Act
          const publicWishPrivacyLevel_1 = WishPrivacyLevel.public();
          const publicWishPrivacyLevel_2 = WishPrivacyLevel.create(
            PrivacyLevel.Public,
          );
          const result = publicWishPrivacyLevel_1.equals(
            publicWishPrivacyLevel_2,
          );

          // Assert
          expect(result).toBe(true);
        });
      });
    });
  });
});
