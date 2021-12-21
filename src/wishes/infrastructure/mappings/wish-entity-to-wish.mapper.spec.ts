import { MockedObject } from 'ts-jest/dist/utils/testing';
import { PrivacyLevel } from '../../domain/value-objects';
import {
  WishEntity,
  WishStageEntity,
  WisherEntity,
} from '../persistence/entities';
import { wishEntityToWish } from '.';

const validValues = [
  {
    id: 'id 0',
    title: 'title 0',
    description: 'description 0',
    privacyLevel: PrivacyLevel.Public,
    createdAt: new Date(1990, 5, 4),
    updatedAt: new Date(1990, 5, 4),
    wisher: {
      id: 'wisher id 0',
    } as MockedObject<WisherEntity>,
    urls: ['https://www.example.com', 'https://www.example.net'],
    imageUrls: [
      'https://www.example.com/1.jpg',
      'https://www.example.net/1.jpg',
    ],
    categories: ['category 0', 'category 0 (1)'],
    stages: {
      toArray: jest.fn().mockReturnValue([
        {
          id: 'id 0',
          title: 'title 0',
          description: 'description 0',
          createdAt: new Date(1995, 5, 4),
          urls: [],
          imageUrls: [],
        },
        {
          id: 'id 0',
          title: 'title 0',
          description: 'description 0',
          createdAt: new Date(1995, 5, 4),
          urls: [],
          imageUrls: [],
        },
      ] as MockedObject<WishStageEntity[]>),
    } as unknown,
    deletedAt: null,
    completedAt: null,
  } as MockedObject<WishEntity>,
  {
    id: 'id 0',
    title: 'title 0',
    description: 'description 0',
    privacyLevel: PrivacyLevel.Public,
    createdAt: new Date(1980, 5, 4),
    updatedAt: new Date(1980, 5, 4),
    wisher: {
      id: 'wisher id 0',
    } as MockedObject<WisherEntity>,
    urls: [] as string[],
    imageUrls: [] as string[],
    categories: [] as string[],
    stages: {
      toArray: jest.fn().mockReturnValue([] as MockedObject<WishStageEntity[]>),
    } as unknown,
    deletedAt: new Date(1994, 5, 4),
    completedAt: new Date(1994, 5, 4),
  } as MockedObject<WishEntity>,
];

describe('wishes', () => {
  describe('infrastructure', () => {
    describe('mappings', () => {
      describe('WishEntity to Wish', () => {
        test.each(validValues)(
          'should map WishEntity to Wish keeping all the property values',
          (wishEntity: WishEntity) => {
            // Arrange

            // Act
            const wish = wishEntityToWish(wishEntity);

            // Assert
            expect(wish.id.getId).toBe(wishEntity.id);
            expect(wish.title.getTitle).toBe(wishEntity.title);
            expect(wish.description.getDescription).toBe(
              wishEntity.description,
            );
            expect(wish.privacyLevel.getPrivacyLevel).toBe(
              wishEntity.privacyLevel,
            );
            expect(wish.createdAt.getDate.getTime()).toBe(
              wishEntity.createdAt.getTime(),
            );
            expect(wish.updatedAt.getDate.getTime()).toBe(
              wishEntity.updatedAt.getTime(),
            );
            expect(wish.wisher.id.getId).toBe(wishEntity.wisher.id);
            for (let i = 0; i < wishEntity.urls.length; i++)
              expect(wishEntity.urls[i]).toBe(wish.urls[i].getUrl);
            for (let i = 0; i < wishEntity.imageUrls.length; i++)
              expect(wishEntity.imageUrls[i]).toBe(wish.imageUrls[i].getUrl);
            for (let i = 0; i < wishEntity.categories.length; i++)
              expect(wishEntity.categories[i]).toBe(wish.categories[i].getName);
            for (let i = 0; i < wishEntity.stages.length; i++)
              expect(wishEntity.stages[i].id).toBe(wish.stages[i].id.getId);
            if (wishEntity.deletedAt)
              expect(wish.deletedAt.getMilliseconds).toBe(
                new Date(wishEntity.deletedAt).getTime(),
              );
            else expect(wish.deletedAt).toBeNull();
            if (wishEntity.completedAt)
              expect(wish.completedAt.getMilliseconds).toBe(
                new Date(wishEntity.completedAt).getTime(),
              );
            else expect(wish.completedAt).toBeNull();
          },
        );
      });
    });
  });
});
