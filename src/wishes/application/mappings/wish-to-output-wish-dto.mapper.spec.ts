import { mocked } from 'ts-jest/utils';
import { WebUrl } from '../../../shared/domain/value-objects';
import { Wish, WishStage } from '../../domain/entities';
import { CategoryName, PrivacyLevel } from '../../domain/value-objects';
import { wishToOutputWishDto } from '.';

const validValues = [
  mocked<Wish>({
    id: {
      getId: 'id 0',
    },
    title: {
      getTitle: 'title 0',
    },
    description: {
      getDescription: 'description 0',
    },
    privacyLevel: {
      getPrivacyLevel: PrivacyLevel.Public,
    },
    createdAt: {
      getMilliseconds: 2,
    },
    updatedAt: {
      getMilliseconds: 2,
    },
    wisher: {
      id: {
        getId: 'wisher id 0',
      },
    },
    urls: [
      mocked<WebUrl>({ getUrl: 'url 0' } as unknown as WebUrl),
      mocked<WebUrl>({ getUrl: 'url 0 (1)' } as unknown as WebUrl),
    ],
    imageUrls: [
      mocked<WebUrl>({ getUrl: 'image url 0' } as unknown as WebUrl),
      mocked<WebUrl>({ getUrl: 'image url 0 (1)' } as unknown as WebUrl),
    ],
    categories: [
      mocked<CategoryName>({
        getName: 'category 0',
      } as unknown as CategoryName),
      mocked<CategoryName>({
        getName: 'category 0 (1)',
      } as unknown as CategoryName),
    ],
    stages: [
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
    deletedAt: null,
    completedAt: null,
  } as unknown as Wish),
  mocked<Wish>({
    id: {
      getId: 'id 0',
    },
    title: {
      getTitle: 'title 0',
    },
    description: {
      getDescription: 'description 0',
    },
    privacyLevel: {
      getPrivacyLevel: PrivacyLevel.Public,
    },
    createdAt: {
      getMilliseconds: 2,
    },
    updatedAt: {
      getMilliseconds: 2,
    },
    wisher: {
      id: {
        getId: 'wisher id 0',
      },
    },
    urls: [],
    imageUrls: [],
    categories: [],
    stages: [],
    deletedAt: {
      getMilliseconds: 2,
    },
    completedAt: {
      getMilliseconds: 2,
    },
  } as unknown as Wish),
];

describe('wishes', () => {
  describe('application', () => {
    describe('mappings', () => {
      describe('Wish to OutputWishDto', () => {
        test.each(validValues)(
          'should map Wish to OutputWishDto keeping all the property values',
          (wish: Wish) => {
            // Arrange

            // Act
            const dto = wishToOutputWishDto(wish);

            // Assert
            expect(dto.id).toBe(wish.id.getId);
            expect(dto.title).toBe(wish.title.getTitle);
            expect(dto.description).toBe(wish.description.getDescription);
            expect(dto.privacyLevel).toBe(wish.privacyLevel.getPrivacyLevel);
            expect(dto.createdAt).toBe(wish.createdAt.getMilliseconds);
            expect(dto.updatedAt).toBe(wish.updatedAt.getMilliseconds);
            expect(dto.wisherId).toBe(wish.wisher.id.getId);
            for (let i = 0; i < wish.urls.length; i++) {
              expect(dto.urls[i]).toBe(wish.urls[i].getUrl);
            }
            for (let i = 0; i < wish.imageUrls.length; i++) {
              expect(dto.imageUrls[i]).toBe(wish.imageUrls[i].getUrl);
            }
            for (let i = 0; i < wish.categories.length; i++) {
              expect(dto.categories[i]).toBe(wish.categories[i].getName);
            }
            for (let i = 0; i < wish.stages.length; i++) {
              expect(dto.stages[i].id).toBe(wish.stages[i].id.getId);
            }
            if (wish.deletedAt)
              expect(dto.deletedAt).toBe(wish.deletedAt.getMilliseconds);
            else expect(dto.deletedAt).toBeNull();
            if (wish.completedAt)
              expect(dto.completedAt).toBe(wish.completedAt.getMilliseconds);
            else expect(dto.completedAt).toBeNull();
          },
        );
      });
    });
  });
});
