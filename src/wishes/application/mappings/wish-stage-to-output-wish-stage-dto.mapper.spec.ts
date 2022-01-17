import { MockedObject } from 'ts-jest/dist/utils/testing';
import { WebUrl } from '../../../shared/domain/value-objects';
import { WishStage } from '../../domain/entities';
import { wishStageToOutputWishStageDto } from '.';

describe('wishes', () => {
  describe('application', () => {
    describe('mappings', () => {
      describe('WishStage to OutputWishStageDto', () => {
        const validValues = [
          {
            id: {
              value: 'id 0',
            },
            title: {
              getTitle: 'title 0',
            },
            description: {
              getDescription: 'description 0',
            },
            createdAt: {
              getIso8601: '2022-01-17T12:23:12.000Z',
            },
            urls: [],
            imageUrls: [],
          } as MockedObject<WishStage>,
          {
            id: {
              value: 'id 1',
            },
            title: {
              getTitle: 'title 1',
            },
            description: {
              getDescription: 'description 1',
            },
            createdAt: {
              getIso8601: '2022-01-17T12:23:12.000Z',
            },
            urls: [
              { getUrl: 'url 1' } as MockedObject<WebUrl>,
              { getUrl: 'url 1 (1)' } as MockedObject<WebUrl>,
            ] as MockedObject<WebUrl[]>,
            imageUrls: [
              { getUrl: 'image url 1' } as MockedObject<WebUrl>,
              { getUrl: 'image url 1 (1)' } as MockedObject<WebUrl>,
            ] as MockedObject<WebUrl[]>,
          } as MockedObject<WishStage>,
        ];

        test.each(validValues)(
          'should map WishStage to OutputWishStageDto keeping all the property values',
          (wishStage: WishStage) => {
            // Arrange

            // Act
            const dto = wishStageToOutputWishStageDto(wishStage);

            // Assert
            expect(dto.id).toBe(wishStage.id.value);
            expect(dto.title).toBe(wishStage.title.getTitle);
            expect(dto.description).toBe(wishStage.description.getDescription);
            expect(dto.createdAt).toBe(wishStage.createdAt.getIso8601);
            for (let i = 0; i < wishStage.urls.length; i++) {
              expect(dto.urls[i]).toBe(wishStage.urls[i].getUrl);
            }
            for (let i = 0; i < wishStage.imageUrls.length; i++) {
              expect(dto.imageUrls[i]).toBe(wishStage.imageUrls[i].getUrl);
            }
          },
        );
      });
    });
  });
});
