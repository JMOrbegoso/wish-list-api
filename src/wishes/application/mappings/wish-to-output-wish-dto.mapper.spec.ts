import { MockedObject } from 'ts-jest/dist/utils/testing';
import { WebUrl } from '../../../shared/domain/value-objects';
import { Wish, WishStage } from '../../domain/entities';
import { CategoryName, PrivacyLevel } from '../../domain/value-objects';
import { wishToOutputWishDto } from '.';

describe('wishes', () => {
  describe('application', () => {
    describe('mappings', () => {
      describe('Wish to OutputWishDto', () => {
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
            privacyLevel: {
              getPrivacyLevel: PrivacyLevel.Public,
            },
            createdAt: {
              getIso8601: '2022-01-17T12:23:12.000Z',
            },
            updatedAt: {
              getIso8601: '2022-01-17T12:23:12.000Z',
            },
            wisher: {
              id: {
                value: 'wisher id 0',
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
            ] as MockedObject<WishStage[]>,
            deletedAt: null,
            startedAt: null,
            completedAt: null,
          } as MockedObject<Wish>,
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
            privacyLevel: {
              getPrivacyLevel: PrivacyLevel.Public,
            },
            createdAt: {
              getIso8601: '2022-01-17T12:23:12.000Z',
            },
            updatedAt: {
              getIso8601: '2022-01-17T12:23:12.000Z',
            },
            wisher: {
              id: {
                value: 'wisher id 0',
              },
            },
            urls: [],
            imageUrls: [],
            categories: [],
            stages: [],
            deletedAt: {
              getIso8601: '2022-01-17T12:23:12.000Z',
            },
            startedAt: {
              getIso8601: '2022-01-17T12:23:12.000Z',
            },
            completedAt: {
              getIso8601: '2022-01-17T12:23:12.000Z',
            },
          } as MockedObject<Wish>,
        ];

        test.each(validValues)(
          'should map Wish to OutputWishDto keeping all the property values',
          (wish: Wish) => {
            // Arrange

            // Act
            const dto = wishToOutputWishDto(wish);

            // Assert
            expect(dto.id).toBe(wish.id.value);
            expect(dto.title).toBe(wish.title.getTitle);
            expect(dto.description).toBe(wish.description.getDescription);
            expect(dto.privacyLevel).toBe(wish.privacyLevel.getPrivacyLevel);
            expect(dto.createdAt).toBe(wish.createdAt.getIso8601);
            expect(dto.updatedAt).toBe(wish.updatedAt.getIso8601);
            expect(dto.wisherId).toBe(wish.wisher.id.value);
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
              expect(dto.stages[i].id).toBe(wish.stages[i].id.value);
            }

            if (wish.deletedAt)
              expect(dto.deletedAt).toBe(wish.deletedAt.getIso8601);
            else expect(dto.deletedAt).toBeNull();

            if (wish.startedAt)
              expect(dto.startedAt).toBe(wish.startedAt.getIso8601);
            else expect(dto.startedAt).toBeNull();

            if (wish.completedAt)
              expect(dto.completedAt).toBe(wish.completedAt.getIso8601);
            else expect(dto.completedAt).toBeNull();
          },
        );
      });
    });
  });
});
