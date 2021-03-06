import { MockedObject } from 'ts-jest/dist/utils/testing';
import { WishStageEntity } from '../persistence/entities';
import { wishStageEntityToWishStage } from '.';

describe('wishes', () => {
  describe('infrastructure', () => {
    describe('mappings', () => {
      describe('WishStageEntity to WishStage', () => {
        const validValues = [
          {
            id: 'id-0',
            title: 'title 0',
            description: 'description 0',
            createdAt: new Date(1990, 5, 5),
            urls: [],
            imageUrls: [],
          } as MockedObject<WishStageEntity>,
          {
            id: 'id-1',
            title: 'title 1',
            description: 'description 1',
            createdAt: new Date(1995, 5, 5),
            urls: ['https://www.example.com', 'https://www.example.net'],
            imageUrls: [],
          } as MockedObject<WishStageEntity>,
          {
            id: 'id-1',
            title: 'title 1',
            description: 'description 1',
            createdAt: new Date(2000, 5, 5),
            urls: ['https://www.example.com', 'https://www.example.net'],
            imageUrls: [
              'https://www.example.com/1.jpg',
              'https://www.example.net/2.jpg',
            ],
          } as MockedObject<WishStageEntity>,
        ];

        test.each(validValues)(
          'should map WishStageEntity to WishStage keeping all the property values',
          (wishStageEntity: WishStageEntity) => {
            // Arrange

            // Act
            const wishStage = wishStageEntityToWishStage(wishStageEntity);

            // Assert
            expect(wishStage.id.value).toBe(wishStageEntity.id);
            expect(wishStage.title.getTitle).toBe(wishStageEntity.title);
            expect(wishStage.description.getDescription).toBe(
              wishStageEntity.description,
            );
            expect(wishStage.createdAt.getIso8601).toBe(
              wishStageEntity.createdAt.toISOString(),
            );
            for (let i = 0; i < wishStageEntity.urls.length; i++)
              expect(wishStageEntity.urls[i]).toBe(wishStage.urls[i].getUrl);
            for (let i = 0; i < wishStageEntity.imageUrls.length; i++)
              expect(wishStageEntity.imageUrls[i]).toBe(
                wishStage.imageUrls[i].getUrl,
              );
          },
        );
      });
    });
  });
});
