import { MockedObject } from 'ts-jest/dist/utils/testing';
import { WebUrl } from '../../../shared/domain/value-objects';
import { Wish, WishStage } from '../../domain/entities';
import { CategoryName, PrivacyLevel } from '../../domain/value-objects';
import { WishStageEntity, WisherEntity } from '../persistence/entities';
import { wishToWishEntity } from '.';

const validValues = [
  [
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
      stages: [],
      deletedAt: null,
      completedAt: null,
    } as MockedObject<Wish>,
    {
      id: 'wisher id 0',
    } as MockedObject<WisherEntity>,
    [],
  ],
  [
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
        getDate: new Date(1980, 5, 4),
      },
      updatedAt: {
        getDate: new Date(1980, 5, 4),
      },
      wisher: {
        id: {
          getId: 'wisher id 1',
        },
      },
      urls: [],
      imageUrls: [],
      categories: [],
      stages: [
        {
          id: {
            getId: 'wish-stage-id-0',
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
        } as MockedObject<WishStage>,
        {
          id: {
            getId: 'wish-stage-id-1',
          },
          title: {
            getTitle: 'title 1',
          },
          description: {
            getDescription: 'description 1',
          },
          createdAt: {
            getDate: new Date(1995, 5, 4),
          },
          urls: [],
          imageUrls: [],
        } as MockedObject<WishStage>,
      ] as MockedObject<WishStage[]>,
      deletedAt: {
        getDate: new Date(1994, 5, 4),
      },
      completedAt: {
        getDate: new Date(1994, 5, 4),
      },
    } as MockedObject<Wish>,
    {
      id: 'wisher id 1',
    } as MockedObject<WisherEntity>,
    [
      {
        id: 'wish-stage-id-0',
        title: 'title 0',
      } as MockedObject<WishStageEntity>,
      {
        id: 'wish-stage-id-1',
        title: 'title 1',
      } as MockedObject<WishStageEntity>,
    ],
  ],
];

describe('wishes', () => {
  describe('infrastructure', () => {
    describe('mappings', () => {
      describe('wish-to-wish-entity', () => {
        test.each(validValues)(
          'should map Wish to WishEntity keeping all the property values',
          (
            wish: MockedObject<Wish>,
            wisherEntity: MockedObject<WisherEntity>,
            wishStagesEntities: MockedObject<WishStageEntity[]>,
          ) => {
            // Arrange

            // Act
            const wishEntity = wishToWishEntity(
              wish,
              wisherEntity,
              wishStagesEntities,
            );

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
            for (let i = 0; i < wish.stages.length; i++) {
              expect(wishEntity.stages[i].id).toBe(wish.stages[i].id.getId);
              expect(wishEntity.stages[i].title).toBe(
                wish.stages[i].title.getTitle,
              );
            }
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
