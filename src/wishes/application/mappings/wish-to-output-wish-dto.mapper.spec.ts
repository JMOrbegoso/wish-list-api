import { MockedObject } from 'ts-jest/dist/utils/testing';
import { WebUrl } from '../../../shared/domain/value-objects';
import { Wish, WishStage } from '../../domain/entities';
import { CategoryName, PrivacyLevel } from '../../domain/value-objects';
import { wishToOutputWishDto } from '.';

const validValues = [
  {
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
      { getUrl: 'url 0' } as MockedObject<WebUrl>,
      { getUrl: 'url 0 (1)' } as MockedObject<WebUrl>,
    ] as MockedObject<WebUrl[]>,
    imageUrls: [
      { getUrl: 'image url 0' } as MockedObject<WebUrl>,
      { getUrl: 'image url 0 (1)' } as MockedObject<WebUrl>,
    ] as MockedObject<WebUrl[]>,
    categories: [
      {
        getName: 'category 0',
      } as MockedObject<CategoryName>,
      {
        getName: 'category 0 (1)',
      } as MockedObject<CategoryName>,
    ] as MockedObject<CategoryName[]>,
    stages: [
      {
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
      } as MockedObject<WishStage>,
      {
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
      } as MockedObject<WishStage>,
    ] as MockedObject<WishStage[]>,
    deletedAt: null,
    startedAt: null,
    completedAt: null,
  } as MockedObject<Wish>,
  {
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
    startedAt: {
      getMilliseconds: 2,
    },
    completedAt: {
      getMilliseconds: 2,
    },
  } as MockedObject<Wish>,
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

            if (wish.startedAt)
              expect(dto.startedAt).toBe(wish.startedAt.getMilliseconds);
            else expect(dto.startedAt).toBeNull();

            if (wish.completedAt)
              expect(dto.completedAt).toBe(wish.completedAt.getMilliseconds);
            else expect(dto.completedAt).toBeNull();
          },
        );
      });
    });
  });
});
