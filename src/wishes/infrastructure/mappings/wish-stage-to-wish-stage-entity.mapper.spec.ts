import { MockedObject } from 'ts-jest/dist/utils/testing';
import { WebUrl } from '../../../shared/domain/value-objects';
import { WishStage } from '../../domain/entities';
import { wishStageToWishStageEntity } from '.';

const validValues = [
  [
    {
      id: { getId: 'id-0' },
      title: { getTitle: 'title 0' },
      description: { getDescription: 'description 0' },
      createdAt: { getDate: new Date(1995, 5, 5) },
      urls: [],
      imageUrls: [],
    } as MockedObject<WishStage>,
  ],
  [
    {
      id: { getId: 'id-0' },
      title: { getTitle: 'title 0' },
      description: { getDescription: 'description 0' },
      createdAt: { getDate: new Date(2005, 5, 5) },
      urls: [
        {
          getUrl: 'https://www.example.com',
        } as MockedObject<WebUrl>,
        {
          getUrl: 'https://www.example.net',
        } as MockedObject<WebUrl>,
      ] as MockedObject<WebUrl[]>,
      imageUrls: [],
    } as MockedObject<WishStage>,
  ],
  [
    {
      id: { getId: 'id-0' },
      title: { getTitle: 'title 0' },
      description: { getDescription: 'description 0' },
      createdAt: { getDate: new Date(1990, 5, 5) },
      urls: [
        {
          getUrl: 'https://www.example.com',
        } as MockedObject<WebUrl>,
        {
          getUrl: 'https://www.example.net',
        } as MockedObject<WebUrl>,
      ] as MockedObject<WebUrl[]>,
      imageUrls: [
        {
          getUrl: 'https://www.example.com/1.jpg',
        } as MockedObject<WebUrl>,
        {
          getUrl: 'https://www.example.net/2.jpg',
        } as MockedObject<WebUrl>,
      ] as MockedObject<WebUrl[]>,
    } as MockedObject<WishStage>,
  ],
];

describe('wishes', () => {
  describe('infrastructure', () => {
    describe('mappings', () => {
      describe('wish-stage-to-wish-stage-entity', () => {
        test.each(validValues)(
          'should map WishStage to WishStageEntity keeping all the property values',
          (wishStage: WishStage) => {
            // Arrange

            // Act
            const wishStageEntity = wishStageToWishStageEntity(wishStage);

            // Assert
            expect(wishStageEntity.id).toBe(wishStage.id.getId);
            expect(wishStageEntity.title).toBe(wishStage.title.getTitle);
            expect(wishStageEntity.description).toBe(
              wishStage.description.getDescription,
            );
            expect(wishStageEntity.createdAt.getTime()).toBe(
              wishStage.createdAt.getDate.getTime(),
            );
            for (let i = 0; i < wishStage.urls.length; i++)
              expect(wishStageEntity.urls[i]).toBe(wishStage.urls[i].getUrl);
            for (let i = 0; i < wishStage.imageUrls.length; i++)
              expect(wishStageEntity.imageUrls[i]).toBe(
                wishStage.imageUrls[i].getUrl,
              );
          },
        );
      });
    });
  });
});
