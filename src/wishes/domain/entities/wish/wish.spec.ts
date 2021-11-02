import { Wish } from '..';
import {
  UniqueId,
  WishDateMetadata,
} from '../../../../core/domain/value-objects';
import {
  WishTitle,
  WishDescription,
  PrivacyLevel,
  WishPrivacyLevel,
} from '../../value-objects';

describe('wishes', () => {
  describe('entities', () => {
    describe('wish', () => {
      it('should create a valid wish entity and should store the values', () => {
        // Arrange

        // Act
        const id = 'id';
        const uniqueId = UniqueId.create(id);
        const title = 'title';
        const wishTitle = WishTitle.create(title);
        const description = 'description';
        const wishDescription = WishDescription.create(description);
        const privacyLevel = PrivacyLevel.Public;
        const wishPrivacyLevel = WishPrivacyLevel.create(privacyLevel);
        const creationDateMilliseconds = Date.now();
        const creationDate = WishDateMetadata.create(creationDateMilliseconds);

        const wish = Wish.create(
          uniqueId,
          wishTitle,
          wishDescription,
          wishPrivacyLevel,
          creationDate,
          creationDate,
          null,
        );

        // Assert
        expect(wish.getId.value).toBe(id);
        expect(wish.getTitle.value).toBe(title);
        expect(wish.getDescription.value).toBe(description);
        expect(wish.getPrivacyLevel.value).toBe(privacyLevel);
        expect(wish.getCreatedAtDate.value).toBe(creationDateMilliseconds);
        expect(wish.getUpdatedAtDate.value).toBe(creationDateMilliseconds);
      });

      it('created wish entities should be different because both have different unique id', () => {
        // Arrange

        // Act
        const id_1 = 'id_1';
        const id_2 = 'id_2';
        const uniqueId_1 = UniqueId.create(id_1);
        const uniqueId_2 = UniqueId.create(id_2);
        const title = 'title';
        const wishTitle = WishTitle.create(title);
        const description = 'description';
        const wishDescription = WishDescription.create(description);
        const privacyLevel = PrivacyLevel.Public;
        const wishPrivacyLevel = WishPrivacyLevel.create(privacyLevel);
        const creationDateMilliseconds = Date.now();
        const creationDate = WishDateMetadata.create(creationDateMilliseconds);

        const wish_1 = Wish.create(
          uniqueId_1,
          wishTitle,
          wishDescription,
          wishPrivacyLevel,
          creationDate,
          creationDate,
          null,
        );
        const wish_2 = Wish.create(
          uniqueId_2,
          wishTitle,
          wishDescription,
          wishPrivacyLevel,
          creationDate,
          creationDate,
          null,
        );

        const result = wish_1.equals(wish_2);

        // Assert
        expect(result).toBe(false);
      });

      it('created wish entities should be equal because both have the same unique id', () => {
        // Arrange

        // Act
        const id = 'id';
        const uniqueId = UniqueId.create(id);
        const title_1 = 'title_1';
        const title_2 = 'title_2';
        const wishTitle_1 = WishTitle.create(title_1);
        const wishTitle_2 = WishTitle.create(title_2);
        const description = 'description';
        const wishDescription = WishDescription.create(description);
        const privacyLevel = PrivacyLevel.Public;
        const wishPrivacyLevel = WishPrivacyLevel.create(privacyLevel);
        const creationDateMilliseconds = Date.now();
        const creationDate = WishDateMetadata.create(creationDateMilliseconds);

        const wish_1 = Wish.create(
          uniqueId,
          wishTitle_1,
          wishDescription,
          wishPrivacyLevel,
          creationDate,
          creationDate,
          null,
        );
        const wish_2 = Wish.create(
          uniqueId,
          wishTitle_2,
          wishDescription,
          wishPrivacyLevel,
          creationDate,
          creationDate,
          null,
        );

        const result = wish_1.equals(wish_2);

        // Assert
        expect(result).toBe(true);
      });
    });
  });
});
