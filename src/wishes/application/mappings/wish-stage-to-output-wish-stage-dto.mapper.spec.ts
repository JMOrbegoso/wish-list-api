import { mocked } from 'ts-jest/utils';
import { WebUrl } from '../../../core/domain/value-objects';
import { WishStage } from '../../domain/entities';
import { wishStageToOutputWishStageDto } from '.';

const validValues = [
  [
    mocked<WishStage>({
      id: {
        getId: 'id 0',
      },
      title: {
        getTitle: 'title 0',
      },
      description: {
        getDescription: 'description 0',
      },
      createdAt: {
        getMilliseconds: 2,
      },
      urls: [],
      imageUrls: [],
    } as unknown as WishStage),
  ],
  [
    mocked<WishStage>({
      id: {
        getId: 'id 1',
      },
      title: {
        getTitle: 'title 1',
      },
      description: {
        getDescription: 'description 1',
      },
      createdAt: {
        getMilliseconds: 2,
      },
      urls: [
        mocked<WebUrl>({ getUrl: 'url 1' } as unknown as WebUrl),
        mocked<WebUrl>({ getUrl: 'url 1 (1)' } as unknown as WebUrl),
      ],
      imageUrls: [
        mocked<WebUrl>({ getUrl: 'image url 1' } as unknown as WebUrl),
        mocked<WebUrl>({ getUrl: 'image url 1 (1)' } as unknown as WebUrl),
      ],
    } as unknown as WishStage),
  ],
];

describe('wishes', () => {
  describe('application', () => {
    describe('mappings', () => {
      describe('WishStage to OutputWishStageDto', () => {
        test.each(validValues)(
          'should map WishStage to OutputWishStageDto keeping all the property values',
          (wishStage: WishStage) => {
            // Arrange

            // Act
            const dto = wishStageToOutputWishStageDto(wishStage);

            // Assert
            expect(dto.id).toBe(wishStage.id.getId);
            expect(dto.title).toBe(wishStage.title.getTitle);
            expect(dto.description).toBe(wishStage.description.getDescription);
            expect(dto.createdAt).toBe(wishStage.createdAt.getMilliseconds);
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
