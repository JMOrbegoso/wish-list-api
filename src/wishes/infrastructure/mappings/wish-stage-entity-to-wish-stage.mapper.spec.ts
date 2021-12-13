import { mocked } from 'ts-jest/utils';
import { WishStageEntity } from '../persistence/entities';
import { wishStageEntityToWishStage } from '.';

const validValues = [
  [
    mocked<WishStageEntity>({
      id: 'id-0',
      title: 'title 0',
      description: 'description 0',
      createdAt: new Date(1990, 5, 5),
      urls: [],
      imageUrls: [],
    } as unknown as WishStageEntity),
  ],
  [
    mocked<WishStageEntity>({
      id: 'id-1',
      title: 'title 1',
      description: 'description 1',
      createdAt: new Date(1995, 5, 5),
      urls: ['https://www.example.com', 'https://www.example.net'],
      imageUrls: [],
    } as unknown as WishStageEntity),
  ],
  [
    mocked<WishStageEntity>({
      id: 'id-1',
      title: 'title 1',
      description: 'description 1',
      createdAt: new Date(2000, 5, 5),
      urls: ['https://www.example.com', 'https://www.example.net'],
      imageUrls: [
        'https://www.example.com/1.jpg',
        'https://www.example.net/2.jpg',
      ],
    } as unknown as WishStageEntity),
  ],
];

describe('wishes', () => {
  describe('infrastructure', () => {
    describe('mappings', () => {
      describe('WishStageEntity to WishStage', () => {
        test.each(validValues)(
          'should map WishStageEntity to WishStage keeping all the property values',
          (wishStageEntity: WishStageEntity) => {
            // Arrange

            // Act
            const wishStage = wishStageEntityToWishStage(wishStageEntity);

            // Assert
            expect(wishStage.id.getId).toBe(wishStageEntity.id);
            expect(wishStage.title.getTitle).toBe(wishStageEntity.title);
            expect(wishStage.description.getDescription).toBe(
              wishStageEntity.description,
            );
            expect(wishStage.createdAt.getDate.getTime()).toBe(
              wishStageEntity.createdAt.getTime(),
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
