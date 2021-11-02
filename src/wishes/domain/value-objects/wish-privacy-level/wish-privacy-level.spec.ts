import { WishPrivacyLevel, PrivacyLevel } from '..';

describe('wishes', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('wish-privacy-level', () => {
        it('should throw error on validation', () => {
          // Arrange

          // Act

          // Assert
          expect(() => WishPrivacyLevel.create(undefined)).toThrowError(
            'Invalid wish privacy level.',
          );
        });

        it('should throw error on validation', () => {
          // Arrange

          // Act

          // Assert
          expect(() => WishPrivacyLevel.create(null)).toThrowError(
            'Invalid wish privacy level.',
          );
        });

        it('should throw error on validation', () => {
          // Arrange

          // Act

          // Assert
          expect(() => WishPrivacyLevel.create(10)).toThrowError(
            'Invalid wish privacy level.',
          );
        });

        it('should create a public privacy level', () => {
          // Arrange

          // Act
          const publicWishPrivacyLevel = WishPrivacyLevel.public();

          // Assert
          expect(publicWishPrivacyLevel.getPrivacyLevel).toBe(
            PrivacyLevel.Public,
          );
        });

        it('should create a justFriends privacy level', () => {
          // Arrange

          // Act
          const justFriendsWishPrivacyLevel = WishPrivacyLevel.justFriends();

          // Assert
          expect(justFriendsWishPrivacyLevel.getPrivacyLevel).toBe(
            PrivacyLevel.JustFriends,
          );
        });

        it('should create a onlyMe privacy level', () => {
          // Arrange

          // Act
          const onlyMeWishPrivacyLevel = WishPrivacyLevel.onlyMe();

          // Assert
          expect(onlyMeWishPrivacyLevel.getPrivacyLevel).toBe(
            PrivacyLevel.OnlyMe,
          );
        });

        it('should create a public privacy level using the function create', () => {
          // Arrange

          // Act
          const publicWishPrivacyLevel = WishPrivacyLevel.create(
            PrivacyLevel.Public,
          );

          // Assert
          expect(publicWishPrivacyLevel.getPrivacyLevel).toBe(
            PrivacyLevel.Public,
          );
        });

        it('should create a justFriends privacy level using the function create', () => {
          // Arrange

          // Act
          const justFriendsWishPrivacyLevel = WishPrivacyLevel.create(
            PrivacyLevel.JustFriends,
          );

          // Assert
          expect(justFriendsWishPrivacyLevel.getPrivacyLevel).toBe(
            PrivacyLevel.JustFriends,
          );
        });

        it('should create a onlyMe privacy level using the function create', () => {
          // Arrange

          // Act
          const onlyMeWishPrivacyLevel = WishPrivacyLevel.create(
            PrivacyLevel.OnlyMe,
          );

          // Assert
          expect(onlyMeWishPrivacyLevel.getPrivacyLevel).toBe(
            PrivacyLevel.OnlyMe,
          );
        });
      });
    });
  });
});
