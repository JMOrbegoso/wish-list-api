import { MockedObject } from 'ts-jest/dist/utils/testing';
import { mocked } from 'ts-jest/utils';
import {
  DeletedWishCannotBeUpdatedError,
  InvalidWishCategoriesError,
  InvalidWishImagesError,
  InvalidWishStagesError,
  InvalidWishUrlsError,
  InvalidWishWisherError,
  TooManyWishCategoriesError,
  TooManyWishImagesError,
  TooManyWishStagesError,
  TooManyWishUrlsError,
  Wish,
  WishIsAlreadyCompletedError,
  WishIsAlreadyUncompletedError,
  WishStage,
  Wisher,
} from '..';
import {
  InvalidMillisecondsDateError,
  InvalidUniqueIdError,
  MillisecondsDate,
  UniqueId,
  WebUrl,
} from '../../../../core/domain/value-objects';
import {
  CategoryName,
  InvalidWishDescriptionError,
  InvalidWishPrivacyLevelError,
  InvalidWishTitleError,
  PrivacyLevel,
  WishDescription,
  WishPrivacyLevel,
  WishTitle,
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
    null,
    mocked<MillisecondsDate>({
      getMilliseconds: 1,
    } as unknown as MillisecondsDate),
  ],
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
    null,
  ],
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
    null,
    null,
  ],
];

describe('wishes', () => {
  describe('domain', () => {
    describe('entities', () => {
      describe('wish', () => {
        test.each(validValues)(
          'create a Wish with invalid id should throw error',
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

            // Assert
            expect(() =>
              Wish.create(
                null,
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
              ),
            ).toThrowError(InvalidUniqueIdError);
          },
        );

        test.each(validValues)(
          'create a Wish with invalid title should throw error',
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

            // Assert
            expect(() =>
              Wish.create(
                uniqueId,
                null,
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
              ),
            ).toThrowError(InvalidWishTitleError);
          },
        );

        test.each(validValues)(
          'create a Wish with invalid description should throw error',
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

            // Assert
            expect(() =>
              Wish.create(
                uniqueId,
                title,
                null,
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
              ),
            ).toThrowError(InvalidWishDescriptionError);
          },
        );

        test.each(validValues)(
          'create a Wish with invalid privacyLevel should throw error',
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

            // Assert
            expect(() =>
              Wish.create(
                uniqueId,
                title,
                description,
                null,
                createdAt,
                updatedAt,
                wisher,
                urls,
                images,
                categories,
                stages,
                deletedAt,
                completedAt,
              ),
            ).toThrowError(InvalidWishPrivacyLevelError);
          },
        );

        test.each(validValues)(
          'create a Wish with invalid createdAt should throw error',
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

            // Assert
            expect(() =>
              Wish.create(
                uniqueId,
                title,
                description,
                privacyLevel,
                null,
                updatedAt,
                wisher,
                urls,
                images,
                categories,
                stages,
                deletedAt,
                completedAt,
              ),
            ).toThrowError(InvalidMillisecondsDateError);
          },
        );

        test.each(validValues)(
          'create a Wish with invalid updatedAt should throw error',
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

            // Assert
            expect(() =>
              Wish.create(
                uniqueId,
                title,
                description,
                privacyLevel,
                createdAt,
                null,
                wisher,
                urls,
                images,
                categories,
                stages,
                deletedAt,
                completedAt,
              ),
            ).toThrowError(InvalidMillisecondsDateError);
          },
        );

        test.each(validValues)(
          'create a Wish with invalid wisher should throw error',
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

            // Assert
            expect(() =>
              Wish.create(
                uniqueId,
                title,
                description,
                privacyLevel,
                createdAt,
                updatedAt,
                null,
                urls,
                images,
                categories,
                stages,
                deletedAt,
                completedAt,
              ),
            ).toThrowError(InvalidWishWisherError);
          },
        );

        test.each(validValues)(
          'create a Wish with invalid urls should throw error',
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

            // Assert
            expect(() =>
              Wish.create(
                uniqueId,
                title,
                description,
                privacyLevel,
                createdAt,
                updatedAt,
                wisher,
                null,
                images,
                categories,
                stages,
                deletedAt,
                completedAt,
              ),
            ).toThrowError(InvalidWishUrlsError);
          },
        );

        test.each(validValues)(
          'create a Wish with invalid urls should throw error',
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
            urls = Array(Wish.MaxUrls + 1).fill(
              mocked<WebUrl>({
                getUrl: 'https://www.example.com',
              } as unknown as WebUrl),
            );

            // Assert
            expect(() =>
              Wish.create(
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
              ),
            ).toThrowError(TooManyWishUrlsError);
          },
        );

        test.each(validValues)(
          'create a Wish with invalid images should throw error',
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

            // Assert
            expect(() =>
              Wish.create(
                uniqueId,
                title,
                description,
                privacyLevel,
                createdAt,
                updatedAt,
                wisher,
                urls,
                null,
                categories,
                stages,
                deletedAt,
                completedAt,
              ),
            ).toThrowError(InvalidWishImagesError);
          },
        );

        test.each(validValues)(
          'create a Wish with invalid images should throw error',
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
            images = Array(Wish.MaxImages + 1).fill(
              mocked<WebUrl>({
                getUrl: 'https://www.example.com/1.jpg',
              } as unknown as WebUrl),
            );

            // Assert
            expect(() =>
              Wish.create(
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
              ),
            ).toThrowError(TooManyWishImagesError);
          },
        );

        test.each(validValues)(
          'create a Wish with invalid categories should throw error',
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

            // Assert
            expect(() =>
              Wish.create(
                uniqueId,
                title,
                description,
                privacyLevel,
                createdAt,
                updatedAt,
                wisher,
                urls,
                images,
                null,
                stages,
                deletedAt,
                completedAt,
              ),
            ).toThrowError(InvalidWishCategoriesError);
          },
        );

        test.each(validValues)(
          'create a Wish with invalid categories should throw error',
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
            categories = Array(Wish.MaxCategories + 1).fill(
              mocked<CategoryName>({
                getName: 'category',
              } as unknown as CategoryName),
            );

            // Assert
            expect(() =>
              Wish.create(
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
              ),
            ).toThrowError(TooManyWishCategoriesError);
          },
        );

        test.each(validValues)(
          'create a Wish with invalid stages should throw error',
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

            // Assert
            expect(() =>
              Wish.create(
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
                null,
                deletedAt,
                completedAt,
              ),
            ).toThrowError(InvalidWishStagesError);
          },
        );

        test.each(validValues)(
          'create a Wish with invalid stages should throw error',
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
            stages = Array(Wish.MaxStages + 1).fill(
              mocked<WishStage>({} as unknown as WishStage),
            );

            // Assert
            expect(() =>
              Wish.create(
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
              ),
            ).toThrowError(TooManyWishStagesError);
          },
        );

        test.each(validValues)(
          'should create a Wish with [id: %p], [title: %p], [description: %p], [privacyLevel: %p], [createdAt: %p], [updatedAt: %p], [wisher: %p], [urls: %p], [images: %p], [categories: %p], [stages: %p], [deletedAt: %p] and [completedAt: %p]',
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

            if (deletedAt)
              expect(wish.deletedAt.getMilliseconds).toBe(
                deletedAt.getMilliseconds,
              );
            else expect(wish.deletedAt).toBeNull();

            if (completedAt)
              expect(wish.completedAt.getMilliseconds).toBe(
                completedAt.getMilliseconds,
              );
            else expect(wish.completedAt).toBeNull();
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

        test.each(validValues)(
          'delete Wish should change the property value',
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
              null,
              completedAt,
            );

            // Act
            wish.delete();

            // Assert
            expect(wish.deletedAt).not.toBeNull();
            expect(wish.isDeleted).toBeTruthy();
          },
        );

        test.each(validValues)(
          'complete a deleted Wish should throw error',
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
            deletedAt = mocked<MillisecondsDate>({
              getMilliseconds: 1,
            } as unknown as MillisecondsDate);
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
              null,
            );

            // Act
            const completionDate = mocked<MillisecondsDate>({
              getMilliseconds: 1,
            } as unknown as MillisecondsDate);

            // Assert
            expect(() => wish.complete(completionDate)).toThrowError(
              DeletedWishCannotBeUpdatedError,
            );
          },
        );

        test.each(validValues)(
          'complete a completed Wish should throw error',
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
            completedAt = mocked<MillisecondsDate>({
              getMilliseconds: 1,
            } as unknown as MillisecondsDate);
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
              null,
              completedAt,
            );

            // Act
            const completionDate = mocked<MillisecondsDate>({
              getMilliseconds: 1,
            } as unknown as MillisecondsDate);

            // Assert
            expect(() => wish.complete(completionDate)).toThrowError(
              WishIsAlreadyCompletedError,
            );
          },
        );

        test.each(validValues)(
          'complete a Wish using null should change the property values',
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
              null,
              null,
            );

            // Act
            wish.complete();

            // Assert
            expect(wish.completedAt.getMilliseconds).not.toBeNull();
            expect(wish.isCompleted).toBeTruthy();
            expect(wish.updatedAt.getMilliseconds).not.toBe(
              updatedAt.getMilliseconds,
            );
          },
        );

        test.each(validValues)(
          'complete Wish should change the property values',
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
              null,
              null,
            );

            // Act
            const completionDate = mocked<MillisecondsDate>({
              getMilliseconds: 1,
            } as unknown as MillisecondsDate);
            wish.complete(completionDate);

            // Assert
            expect(wish.completedAt.getMilliseconds).toBe(
              completionDate.getMilliseconds,
            );
            expect(wish.isCompleted).toBeTruthy();
            expect(wish.updatedAt.getMilliseconds).not.toBe(
              updatedAt.getMilliseconds,
            );
          },
        );

        test.each(validValues)(
          'uncomplete Wish should change the property values',
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
            deletedAt = mocked<MillisecondsDate>({
              getMilliseconds: 1,
            } as unknown as MillisecondsDate);
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
              null,
            );

            // Act

            // Assert
            expect(() => wish.uncomplete()).toThrowError(
              DeletedWishCannotBeUpdatedError,
            );
          },
        );

        test.each(validValues)(
          'uncomplete Wish should change the property values',
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
              null,
              null,
            );

            // Act

            // Assert
            expect(() => wish.uncomplete()).toThrowError(
              WishIsAlreadyUncompletedError,
            );
          },
        );

        test.each(validValues)(
          'uncomplete Wish should change the property values',
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
            completedAt = mocked<MillisecondsDate>({
              getMilliseconds: 1,
            } as unknown as MillisecondsDate);
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
              null,
              completedAt,
            );

            // Act
            wish.uncomplete();

            // Assert
            expect(wish.completedAt).toBeNull();
            expect(wish.isCompleted).toBeFalsy();
            expect(wish.updatedAt.getMilliseconds).not.toBe(
              updatedAt.getMilliseconds,
            );
          },
        );
      });
    });
  });
});
