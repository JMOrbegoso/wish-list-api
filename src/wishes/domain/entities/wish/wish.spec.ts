import { mocked } from 'ts-jest/utils';
import { MockedObject } from 'ts-jest/dist/utils/testing';
import { Wish, Wisher, WishStage } from '..';
import {
  UniqueId,
  MillisecondsDate,
  WebUrl,
} from '../../../../core/domain/value-objects';
import {
  WishTitle,
  WishDescription,
  WishPrivacyLevel,
  PrivacyLevel,
  CategoryName,
} from '../../value-objects';

const validValues = [
  [
    mocked<UniqueId>({
      getId: 'id-0',
      equals: jest.fn(),
    } as unknown as UniqueId),
    mocked<WishTitle>({
      getTitle: 'title',
    } as unknown as WishTitle),
    mocked<WishDescription>({
      getDescription: 'description',
    } as unknown as WishDescription),
    mocked<WishPrivacyLevel>({
      getPrivacyLevel: PrivacyLevel.Public,
    } as unknown as WishPrivacyLevel),
    mocked<MillisecondsDate>({
      getMilliseconds: 1,
    } as unknown as MillisecondsDate),
    mocked<MillisecondsDate>({
      getMilliseconds: 1,
    } as unknown as MillisecondsDate),
    mocked<Wisher>({
      id: { getId: 'id-0' },
    } as unknown as Wisher),
    [
      mocked<WebUrl>({
        getUrl: 'https://www.example.com',
      } as unknown as WebUrl),
    ],
    [
      mocked<WebUrl>({
        getUrl: 'https://www.example.com/1.jpg',
      } as unknown as WebUrl),
    ],
    [
      mocked<CategoryName>({
        getName: 'category name',
      } as unknown as CategoryName),
    ],
    [
      mocked<WishStage>({
        id: { getId: 'id-0' },
      } as unknown as WishStage),
    ],
    mocked<MillisecondsDate>({
      getMilliseconds: 1,
    } as unknown as MillisecondsDate),
    mocked<MillisecondsDate>({
      getMilliseconds: 1,
    } as unknown as MillisecondsDate),
  ],
];

describe('wishes', () => {
  describe('domain', () => {
    describe('entities', () => {
      describe('wish', () => {
        test.each(validValues)(
          'should create a WishStage with [id: %p], [title: %p], [description: %p], [privacyLevel: %p], [createdAt: %p] and [updatedAt: %p], [wisher: %p], [urls: %p], [images: %p], [categories: %p], [stages: %p], [deletedAt: %p] and [completedAt: %p]',
          (
            uniqueId: MockedObject<UniqueId>,
            title: MockedObject<WishTitle>,
            description: MockedObject<WishDescription>,
            privacyLevel: MockedObject<WishPrivacyLevel>,
            createdAt: MockedObject<MillisecondsDate>,
            updatedAt: MockedObject<MillisecondsDate>,
            wisher: MockedObject<Wisher>,
            urls: MockedObject<WebUrl>[],
            images: MockedObject<WebUrl>[],
            categories: MockedObject<CategoryName>[],
            stages: MockedObject<WishStage>[],
            deletedAt: MockedObject<MillisecondsDate>,
            completedAt: MockedObject<MillisecondsDate>,
          ) => {
            // Arrange

            // Act
            const wish = Wish.create(
              uniqueId,
              title,
              description,
              privacyLevel,
              createdAt,
              updatedAt,
              wisher,
              urls,
              images,
              categories,
              stages,
              deletedAt,
              completedAt,
            );

            // Assert
            expect(wish.id.getId).toBe(uniqueId.getId);
            expect(wish.title.getTitle).toBe(title.getTitle);
            expect(wish.description.getDescription).toBe(
              description.getDescription,
            );
            expect(wish.privacyLevel.getPrivacyLevel).toBe(
              privacyLevel.getPrivacyLevel,
            );
            expect(wish.createdAt.getMilliseconds).toBe(
              createdAt.getMilliseconds,
            );
            expect(wish.updatedAt.getMilliseconds).toBe(
              updatedAt.getMilliseconds,
            );
            expect(wish.wisher.id.getId).toBe(wisher.id.getId);
            expect(wish.urls[0].getUrl).toBe(urls[0].getUrl);
            expect(wish.imageUrls[0].getUrl).toBe(images[0].getUrl);
            expect(wish.categories[0].getName).toBe(categories[0].getName);
            expect(wish.stages[0].id.getId).toBe(stages[0].id.getId);
            expect(wish.deletedAt.getMilliseconds).toBe(
              deletedAt.getMilliseconds,
            );
            expect(wish.completedAt.getMilliseconds).toBe(
              completedAt.getMilliseconds,
            );
          },
        );

        test.each(validValues)(
          'comparing two entities should call "equals" method from UniqueId',
          (
            uniqueId: MockedObject<UniqueId>,
            title: MockedObject<WishTitle>,
            description: MockedObject<WishDescription>,
            privacyLevel: MockedObject<WishPrivacyLevel>,
            createdAt: MockedObject<MillisecondsDate>,
            updatedAt: MockedObject<MillisecondsDate>,
            wisher: MockedObject<Wisher>,
            urls: MockedObject<WebUrl>[],
            images: MockedObject<WebUrl>[],
            categories: MockedObject<CategoryName>[],
            stages: MockedObject<WishStage>[],
            deletedAt: MockedObject<MillisecondsDate>,
            completedAt: MockedObject<MillisecondsDate>,
          ) => {
            // Arrange
            const wish = Wish.create(
              uniqueId,
              title,
              description,
              privacyLevel,
              createdAt,
              updatedAt,
              wisher,
              urls,
              images,
              categories,
              stages,
              deletedAt,
              completedAt,
            );

            // Act
            wish.equals(wish);

            // Assert
            expect(uniqueId.equals.mock.calls).toHaveLength(1);
          },
        );
      });
    });
  });
});
