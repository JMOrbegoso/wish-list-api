import { WishStage } from '..';
import { UniqueId } from '../../../../core/domain/value-objects';
import {
  WebUrl,
  WishDateMetadata,
  WishDescription,
  WishTitle,
} from '../../value-objects';

describe('wishes', () => {
  describe('entities', () => {
    describe('wish-stage', () => {
      it('should create a valid wish-stage entity and should store the values', () => {
        // Arrange

        // Act
        const id = 'id';
        const uniqueId = UniqueId.create(id);
        const title = 'title';
        const wishTitle = WishTitle.create(title);
        const description = 'description';
        const wishDescription = WishDescription.create(description);
        const creationDateMilliseconds = Date.now();
        const creationDate = WishDateMetadata.create(creationDateMilliseconds);
        const urls = ['https://www.example.com', 'https://wwww.example.net'];
        const wishUrls = urls.map((url) => WebUrl.create(url));
        const imageUrls = [
          'https://www.example.com',
          'https://wwww.example.net',
        ];
        const wishImageUrls = imageUrls.map((url) => WebUrl.create(url));
        const wishStage = WishStage.create(
          uniqueId,
          wishTitle,
          wishDescription,
          creationDate,
          wishUrls,
          wishImageUrls,
        );

        // Assert
        expect(wishStage.getId.value).toBe(id);
        expect(wishStage.getTitle.value).toBe(title);
        expect(wishStage.getDescription.value).toBe(description);
        expect(wishStage.getCreatedAtDate.value).toBe(creationDateMilliseconds);
        expect(wishStage.getUrls[0].value).toBe(urls[0]);
        expect(wishStage.getUrls[1].value).toBe(urls[1]);
        expect(wishStage.getImageUrls[0].value).toBe(imageUrls[0]);
        expect(wishStage.getImageUrls[1].value).toBe(imageUrls[1]);
      });

      it('created wish-stage entities should be different because both have different unique id', () => {
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
        const milliseconds = Date.now();
        const creationDate = WishDateMetadata.create(milliseconds);

        const wishStage_1 = WishStage.create(
          uniqueId_1,
          wishTitle,
          wishDescription,
          creationDate,
        );

        const wishStage_2 = WishStage.create(
          uniqueId_2,
          wishTitle,
          wishDescription,
          creationDate,
        );

        const result = wishStage_1.equals(wishStage_2);

        // Assert
        expect(result).toBe(false);
      });

      it('created wish-stage entities should be equal because both have the same unique id', () => {
        // Arrange

        // Act
        const id = 'id';
        const uniqueId = UniqueId.create(id);
        const title_1 = 'title';
        const title_2 = 'title';
        const wishTitle_1 = WishTitle.create(title_1);
        const wishTitle_2 = WishTitle.create(title_2);
        const description = 'description';
        const wishDescription = WishDescription.create(description);
        const milliseconds = Date.now();
        const creationDate = WishDateMetadata.create(milliseconds);

        const wishStage_1 = WishStage.create(
          uniqueId,
          wishTitle_1,
          wishDescription,
          creationDate,
        );

        const wishStage_2 = WishStage.create(
          uniqueId,
          wishTitle_2,
          wishDescription,
          creationDate,
        );

        const result = wishStage_1.equals(wishStage_2);

        // Assert
        expect(result).toBe(true);
      });
    });
  });
});
