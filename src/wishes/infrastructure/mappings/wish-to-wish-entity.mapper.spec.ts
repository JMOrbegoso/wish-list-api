import { mocked } from 'ts-jest/utils';
import { WebUrl } from '../../../core/domain/value-objects';
import { Wish, WishStage } from '../../domain/entities';
import { CategoryName, PrivacyLevel } from '../../domain/value-objects';
import { wishToWishEntity } from '.';

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
      getDate: new Date(1990, 5, 4),
    },
    updatedAt: {
      getDate: new Date(1990, 5, 4),
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
          getDate: new Date(1995, 5, 4),
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
          getDate: new Date(1995, 5, 4),
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
      getDate: new Date(1980, 5, 4),
    },
    updatedAt: {
      getDate: new Date(1980, 5, 4),
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
      getDate: new Date(1994, 5, 4),
    },
    completedAt: {
      getDate: new Date(1994, 5, 4),
    },
  } as unknown as Wish),
];

describe('wishes', () => {
  describe('infrastructure', () => {
    describe('mappings', () => {
      describe('wish-to-wish-entity', () => {
        test.each(validValues)(
          'should map Wish to WishEntity keeping all the property values',
          (wish: Wish) => {
            // Arrange

            // Act
            const wishEntity = wishToWishEntity(wish);

            // Assert
            expect(wishEntity.id).toBe(wish.id.getId);
            expect(wishEntity.title).toBe(wish.title.getTitle);
            expect(wishEntity.description).toBe(
              wish.description.getDescription,
            );
            expect(wishEntity.privacyLevel).toBe(
              wish.privacyLevel.getPrivacyLevel,
            );
            expect(wishEntity.createdAt.getTime()).toBe(
              wish.createdAt.getDate.getTime(),
            );
            expect(wishEntity.updatedAt.getTime()).toBe(
              wish.updatedAt.getDate.getTime(),
            );
            expect(wishEntity.wisher.id).toBe(wish.wisher.id.getId);
            for (let i = 0; i < wish.urls.length; i++)
              expect(wishEntity.urls[i]).toBe(wish.urls[i].getUrl);
            for (let i = 0; i < wish.imageUrls.length; i++)
              expect(wishEntity.imageUrls[i]).toBe(wish.imageUrls[i].getUrl);
            for (let i = 0; i < wish.categories.length; i++)
              expect(wishEntity.categories[i]).toBe(wish.categories[i].getName);
            for (let i = 0; i < wish.stages.length; i++)
              expect(wishEntity.stages[i].id).toBe(wish.stages[i].id.getId);
            if (wish.deletedAt)
              expect(wishEntity.deletedAt.getTime()).toBe(
                wish.deletedAt.getDate.getTime(),
              );
            else expect(wishEntity.deletedAt).toBeNull();
            if (wish.completedAt)
              expect(wishEntity.completedAt.getTime()).toBe(
                wish.completedAt.getDate.getTime(),
              );
            else expect(wishEntity.completedAt).toBeNull();
          },
        );
      });
    });
  });
});