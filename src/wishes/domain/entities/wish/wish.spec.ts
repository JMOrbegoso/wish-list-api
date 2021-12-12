import { MockedObject } from 'ts-jest/dist/utils/testing';
import { mocked } from 'ts-jest/utils';
import {
  DeletedWishCannotBeUpdatedError,
  DuplicatedWishStageError,
  InvalidWishCategoriesError,
  InvalidWishImagesError,
  InvalidWishStagesError,
  InvalidWishUrlsError,
  InvalidWishWisherError,
  NonExistentWishStageError,
  TooManyWishCategoriesError,
  TooManyWishImagesError,
  TooManyWishStagesError,
  TooManyWishUrlsError,
  Wish,
  WishIsAlreadyCompletedError,
  WishIsAlreadyDeletedError,
  WishIsAlreadyUncompletedError,
  WishIsNotDeletedError,
  WishStage,
  Wisher,
} from '..';
import {
  InvalidMillisecondsDateError,
  InvalidUniqueIdError,
  MillisecondsDate,
  UniqueId,
  WebUrl,
} from '../../../../shared/domain/value-objects';
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
          'create a Wish with invalid urls (more than the limit) should throw error',
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
          'create a Wish with invalid images (more than the limit) should throw error',
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
          'create a Wish with invalid categories (more than the limit) should throw error',
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
          'delete a deleted Wish should throw error',
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
            expect(() => wish.delete()).toThrowError(WishIsAlreadyDeletedError);
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
          'undelete a not deleted Wish should throw error',
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
            expect(() => wish.undelete()).toThrowError(WishIsNotDeletedError);
          },
        );

        test.each(validValues)(
          'undelete a deleted Wish should change the property value',
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
              completedAt,
            );

            // Act
            wish.undelete();

            // Assert
            expect(wish.deletedAt).toBeNull();
            expect(wish.isDeleted).toBeFalsy();
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
          'complete a Wish using null should throw error',
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
            expect(() => wish.complete(null)).toThrowError(
              InvalidMillisecondsDateError,
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

        test.each(validValues)(
          'update privacyLevel of a deleted Wish should throw error',
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
              completedAt,
            );

            // Act
            const newWishPrivacyLevel = mocked<WishPrivacyLevel>({
              getPrivacyLevel: 1,
            } as unknown as WishPrivacyLevel);

            // Assert
            expect(() =>
              wish.changePrivacyLevel(newWishPrivacyLevel),
            ).toThrowError(DeletedWishCannotBeUpdatedError);
          },
        );

        test.each(validValues)(
          'update privacyLevel of a Wish with a null value should throw error',
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
              null,
              completedAt,
            );

            // Act

            // Assert
            expect(() => wish.changePrivacyLevel(null)).toThrowError(
              InvalidWishPrivacyLevelError,
            );
          },
        );

        test.each(validValues)(
          'change privacyLevel of a Wish should change the property values',
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
            const newWishPrivacyLevel = mocked<WishPrivacyLevel>({
              getPrivacyLevel: 1,
            } as unknown as WishPrivacyLevel);
            wish.changePrivacyLevel(newWishPrivacyLevel);

            // Assert
            expect(wish.privacyLevel.getPrivacyLevel).toBe(
              newWishPrivacyLevel.getPrivacyLevel,
            );
          },
        );

        test.each(validValues)(
          'update a deleted Wish should throw error',
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
              completedAt,
            );

            // Act

            // Assert
            expect(() =>
              wish.update(title, description, urls, images, categories),
            ).toThrowError(DeletedWishCannotBeUpdatedError);
          },
        );

        test.each(validValues)(
          'update a Wish using invalid title should throw error',
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
              null,
              completedAt,
            );

            // Assert
            expect(() =>
              wish.update(null, description, urls, images, categories),
            ).toThrowError(InvalidWishTitleError);
          },
        );

        test.each(validValues)(
          'update a Wish using invalid description should throw error',
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
              null,
              completedAt,
            );

            // Assert
            expect(() =>
              wish.update(title, null, urls, images, categories),
            ).toThrowError(InvalidWishDescriptionError);
          },
        );

        test.each(validValues)(
          'update a Wish using invalid urls should throw error',
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
              null,
              completedAt,
            );

            // Assert
            expect(() =>
              wish.update(title, description, null, images, categories),
            ).toThrowError(InvalidWishUrlsError);
          },
        );

        test.each(validValues)(
          'update a Wish using invalid urls (more than the limit) should throw error',
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
              null,
              completedAt,
            );
            const newUrls = Array(Wish.MaxUrls + 1).fill(
              mocked<WebUrl>({
                getUrl: 'https://www.example.com',
              } as unknown as WebUrl),
            );

            // Assert
            expect(() =>
              wish.update(title, description, newUrls, images, categories),
            ).toThrowError(TooManyWishUrlsError);
          },
        );

        test.each(validValues)(
          'update a Wish using invalid image urls should throw error',
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
              null,
              completedAt,
            );

            // Assert
            expect(() =>
              wish.update(title, description, urls, null, categories),
            ).toThrowError(InvalidWishImagesError);
          },
        );

        test.each(validValues)(
          'create a Wish with invalid images (more than the limit) should throw error',
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
              null,
              completedAt,
            );
            const newImages = Array(Wish.MaxImages + 1).fill(
              mocked<WebUrl>({
                getUrl: 'https://www.example.com/1.jpg',
              } as unknown as WebUrl),
            );

            // Assert
            expect(() =>
              wish.update(title, description, urls, newImages, categories),
            ).toThrowError(TooManyWishImagesError);
          },
        );

        test.each(validValues)(
          'update a Wish using invalid categories should throw error',
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
              null,
              completedAt,
            );

            // Assert
            expect(() =>
              wish.update(title, description, urls, images, null),
            ).toThrowError(InvalidWishCategoriesError);
          },
        );

        test.each(validValues)(
          'create a Wish with invalid categories (more than the limit) should throw error',
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
              null,
              completedAt,
            );
            const newCategories = Array(Wish.MaxCategories + 1).fill(
              mocked<CategoryName>({
                getName: 'category',
              } as unknown as CategoryName),
            );

            // Assert
            expect(() =>
              wish.update(title, description, urls, images, newCategories),
            ).toThrowError(TooManyWishCategoriesError);
          },
        );

        test.each(validValues)(
          'update a Wish should change the property values',
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
              null,
              completedAt,
            );
            const newTitle = mocked<WishTitle>({
              getTitle: 'title',
            } as unknown as WishTitle);
            const newDescription = mocked<WishDescription>({
              getDescription: 'description',
            } as unknown as WishDescription);
            const newUrls = Array(Wish.MaxUrls).fill(
              mocked<WebUrl>({
                getUrl: 'https://www.example.com/new/',
              } as unknown as WebUrl),
            );
            const newImages = Array(Wish.MaxImages).fill(
              mocked<WebUrl>({
                getUrl: 'https://www.example.com/new.jpg',
              } as unknown as WebUrl),
            );
            const newCategories = Array(Wish.MaxCategories).fill(
              mocked<CategoryName>({
                getName: 'new category',
              } as unknown as CategoryName),
            );
            wish.update(
              newTitle,
              newDescription,
              newUrls,
              newImages,
              newCategories,
            );

            // Assert
            expect(wish.title.getTitle).toBe(newTitle.getTitle);
            expect(wish.description.getDescription).toBe(
              newDescription.getDescription,
            );
            for (let i = 0; i < newUrls.length; i++)
              expect(wish.urls[i].getUrl).toBe(newUrls[i].getUrl);
            for (let i = 0; i < newImages.length; i++)
              expect(wish.imageUrls[i].getUrl).toBe(newImages[i].getUrl);
            for (let i = 0; i < newCategories.length; i++)
              expect(wish.categories[i].getName).toBe(newCategories[i].getName);
            expect(wish.updatedAt.getMilliseconds).not.toBe(
              updatedAt.getMilliseconds,
            );
          },
        );

        test.each(validValues)(
          'add a stage to a deleted Wish should throw error',
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
              completedAt,
            );

            // Act

            // Assert
            expect(() => wish.addStage(null)).toThrowError(
              DeletedWishCannotBeUpdatedError,
            );
          },
        );

        test.each(validValues)(
          'add an invalid stage to a Wish should throw error',
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

            // Assert
            expect(() => wish.addStage(null)).toThrowError(
              InvalidWishStagesError,
            );
          },
        );

        test.each(validValues)(
          'add an stage to a Wish with the limit of stages should throw error',
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
            stages = Array(Wish.MaxStages).fill(
              mocked<WishStage>({} as unknown as WishStage),
            );
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
            const newStage = mocked<WishStage>({} as unknown as WishStage);

            // Assert
            expect(() => wish.addStage(newStage)).toThrowError(
              TooManyWishStagesError,
            );
          },
        );

        test.each(validValues)(
          'add an stage to a Wish with already that stage should throw error',
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
            stages = [
              mocked<WishStage>({
                equals: jest.fn().mockReturnValue(true),
              } as unknown as WishStage),
            ];
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
            const newStage = mocked<WishStage>({} as unknown as WishStage);

            // Assert
            expect(() => wish.addStage(newStage)).toThrowError(
              DuplicatedWishStageError,
            );
          },
        );

        test.each(validValues)(
          'add an stage to a Wish should change the property values',
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
            const initialStagesLength = Wish.MaxStages - 1;
            const finalStagesLength = initialStagesLength + 1;
            stages = Array(initialStagesLength).fill(
              mocked<WishStage>({
                equals: jest.fn().mockReturnValue(false),
              } as unknown as WishStage),
            );
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
            const newStage = mocked<WishStage>({} as unknown as WishStage);
            wish.addStage(newStage);

            // Assert
            expect(wish.stages.length).toBe(finalStagesLength);
            expect(wish.updatedAt.getMilliseconds).not.toBe(
              updatedAt.getMilliseconds,
            );
          },
        );

        test.each(validValues)(
          'remove an stage from a deleted Wish should throw error',
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
              completedAt,
            );

            // Act

            // Assert
            expect(() => wish.removeStage(null)).toThrowError(
              DeletedWishCannotBeUpdatedError,
            );
          },
        );

        test.each(validValues)(
          'remove an stage from a deleted Wish should throw error',
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

            // Assert
            expect(() => wish.removeStage(null)).toThrowError(
              InvalidWishStagesError,
            );
          },
        );

        test.each(validValues)(
          'remove an stage from a Wish without that stage should throw error',
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
            stages = [
              mocked<WishStage>({
                equals: jest.fn().mockReturnValue(false),
              } as unknown as WishStage),
            ];
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
            const stageToRemove = mocked<WishStage>({} as unknown as WishStage);

            // Assert
            expect(() => wish.removeStage(stageToRemove)).toThrowError(
              NonExistentWishStageError,
            );
          },
        );

        test.each(validValues)(
          'remove an stage from a Wish should change the property values',
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
            const initialStagesLength = 1;
            const finalStagesLength = 0;
            stages = Array(initialStagesLength).fill(
              mocked<WishStage>({
                equals: jest.fn().mockReturnValue(true),
              } as unknown as WishStage),
            );
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
            const stageToRemove = mocked<WishStage>({} as unknown as WishStage);
            wish.removeStage(stageToRemove);

            // Assert
            expect(wish.stages.length).toBe(finalStagesLength);
            expect(wish.updatedAt.getMilliseconds).not.toBe(
              updatedAt.getMilliseconds,
            );
          },
        );
      });
    });
  });
});
