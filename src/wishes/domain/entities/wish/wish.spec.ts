import { MockedObject } from 'ts-jest/dist/utils/testing';
import {
  DeletedWishCannotBeUpdatedError,
  DuplicatedWishStageError,
  InvalidWishCategoriesError,
  InvalidWishImagesError,
  InvalidWishStagesError,
  InvalidWishUrlsError,
  InvalidWisherError,
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
    {
      getId: 'id-0',
      equals: jest.fn(),
    } as MockedObject<UniqueId>,
    {
      getTitle: 'title',
    } as MockedObject<WishTitle>,
    {
      getDescription: 'description',
    } as MockedObject<WishDescription>,
    {
      getPrivacyLevel: PrivacyLevel.Public,
    } as MockedObject<WishPrivacyLevel>,
    {
      getMilliseconds: 1,
    } as MockedObject<MillisecondsDate>,
    {
      getMilliseconds: 1,
    } as MockedObject<MillisecondsDate>,
    {
      id: { getId: 'id-0' },
    } as MockedObject<Wisher>,
    [
      {
        getUrl: 'https://www.example.com',
      } as MockedObject<WebUrl>,
    ],
    [
      {
        getUrl: 'https://www.example.com/1.jpg',
      } as MockedObject<WebUrl>,
    ],
    [
      {
        getName: 'category name',
      } as MockedObject<CategoryName>,
    ],
    [
      {
        id: { getId: 'id-0' },
      } as MockedObject<WishStage>,
    ],
    {
      getMilliseconds: 1,
    } as MockedObject<MillisecondsDate>,
    {
      getMilliseconds: 1,
    } as MockedObject<MillisecondsDate>,
  ],
  [
    {
      getId: 'id-0',
      equals: jest.fn(),
    } as MockedObject<UniqueId>,
    {
      getTitle: 'title',
    } as MockedObject<WishTitle>,
    {
      getDescription: 'description',
    } as MockedObject<WishDescription>,
    {
      getPrivacyLevel: PrivacyLevel.Public,
    } as MockedObject<WishPrivacyLevel>,
    {
      getMilliseconds: 1,
    } as MockedObject<MillisecondsDate>,
    {
      getMilliseconds: 1,
    } as MockedObject<MillisecondsDate>,
    {
      id: { getId: 'id-0' },
    } as MockedObject<Wisher>,
    [
      {
        getUrl: 'https://www.example.com',
      } as MockedObject<WebUrl>,
    ],
    [
      {
        getUrl: 'https://www.example.com/1.jpg',
      } as MockedObject<WebUrl>,
    ],
    [
      {
        getName: 'category name',
      } as MockedObject<CategoryName>,
    ],
    [
      {
        id: { getId: 'id-0' },
      } as MockedObject<WishStage>,
    ],
    null,
    {
      getMilliseconds: 1,
    } as MockedObject<MillisecondsDate>,
  ],
  [
    {
      getId: 'id-0',
      equals: jest.fn(),
    } as MockedObject<UniqueId>,
    {
      getTitle: 'title',
    } as MockedObject<WishTitle>,
    {
      getDescription: 'description',
    } as MockedObject<WishDescription>,
    {
      getPrivacyLevel: PrivacyLevel.Public,
    } as MockedObject<WishPrivacyLevel>,
    {
      getMilliseconds: 1,
    } as MockedObject<MillisecondsDate>,
    {
      getMilliseconds: 1,
    } as MockedObject<MillisecondsDate>,
    {
      id: { getId: 'id-0' },
    } as MockedObject<Wisher>,
    [
      {
        getUrl: 'https://www.example.com',
      } as MockedObject<WebUrl>,
    ],
    [
      {
        getUrl: 'https://www.example.com/1.jpg',
      } as MockedObject<WebUrl>,
    ],
    [
      {
        getName: 'category name',
      } as MockedObject<CategoryName>,
    ],
    [
      {
        id: { getId: 'id-0' },
      } as MockedObject<WishStage>,
    ],
    {
      getMilliseconds: 1,
    } as MockedObject<MillisecondsDate>,
    null,
  ],
  [
    {
      getId: 'id-0',
      equals: jest.fn(),
    } as MockedObject<UniqueId>,
    {
      getTitle: 'title',
    } as MockedObject<WishTitle>,
    {
      getDescription: 'description',
    } as MockedObject<WishDescription>,
    {
      getPrivacyLevel: PrivacyLevel.Public,
    } as MockedObject<WishPrivacyLevel>,
    {
      getMilliseconds: 1,
    } as MockedObject<MillisecondsDate>,
    {
      getMilliseconds: 1,
    } as MockedObject<MillisecondsDate>,
    {
      id: { getId: 'id-0' },
    } as MockedObject<Wisher>,
    [
      {
        getUrl: 'https://www.example.com',
      } as MockedObject<WebUrl>,
    ],
    [
      {
        getUrl: 'https://www.example.com/1.jpg',
      } as MockedObject<WebUrl>,
    ],
    [
      {
        getName: 'category name',
      } as MockedObject<CategoryName>,
    ],
    [
      {
        id: { getId: 'id-0' },
      } as MockedObject<WishStage>,
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
            ).toThrowError(InvalidWisherError);
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
            urls = Array(Wish.MaxUrls + 1).fill({
              getUrl: 'https://www.example.com',
            } as MockedObject<WebUrl>);

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
            images = Array(Wish.MaxImages + 1).fill({
              getUrl: 'https://www.example.com/1.jpg',
            } as MockedObject<WebUrl>);

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
            categories = Array(Wish.MaxCategories + 1).fill({
              getName: 'category',
            } as MockedObject<CategoryName>);

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
              {} as MockedObject<WishStage>,
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
          'do changes on urls array getter should make no changes on the original urls array',
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
            const urlsLocal = wish.urls;
            const newUrl = {
              getUrl: 'https://www.example.com',
            } as MockedObject<WebUrl>;
            urlsLocal.push(newUrl);

            // Assert
            expect(wish.urls).toHaveLength(urls.length);
            expect(urlsLocal).toHaveLength(urls.length + 1);

            for (let i = 0; i < urls.length; i++) {
              expect(wish.urls[i].getUrl).toBe(urls[i].getUrl);
            }
          },
        );

        test.each(validValues)(
          'do changes on images array getter should make no changes on the original images array',
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
            const imagesLocal = wish.imageUrls;
            const newImage = {
              getUrl: 'https://www.example.com/1.jpg',
            } as MockedObject<WebUrl>;
            imagesLocal.push(newImage);

            // Assert
            expect(wish.imageUrls).toHaveLength(images.length);
            expect(imagesLocal).toHaveLength(images.length + 1);

            for (let i = 0; i < images.length; i++) {
              expect(wish.imageUrls[i].getUrl).toBe(images[i].getUrl);
            }
          },
        );

        test.each(validValues)(
          'do changes on categories array getter should make no changes on the original categories array',
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
            const categoriesLocal = wish.categories;
            const newCategory = {
              getName: 'new-stage-id',
            } as MockedObject<CategoryName>;
            categoriesLocal.push(newCategory);

            // Assert
            expect(wish.categories).toHaveLength(categories.length);
            expect(categoriesLocal).toHaveLength(categories.length + 1);

            for (let i = 0; i < categories.length; i++) {
              expect(wish.categories[i].getName).toBe(categories[i].getName);
            }
          },
        );

        test.each(validValues)(
          'do changes on stages array getter should make no changes on the original stages array',
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
            const stagesLocal = wish.stages;
            const newStage = {
              id: { getId: 'new-stage-id' },
            } as MockedObject<WishStage>;
            stagesLocal.push(newStage);

            // Assert
            expect(wish.stages).toHaveLength(stages.length);
            expect(stagesLocal).toHaveLength(stages.length + 1);

            for (let i = 0; i < stages.length; i++) {
              expect(wish.stages[i].id).toBe(stages[i].id);
            }
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
            deletedAt = {
              getMilliseconds: 1,
            } as MockedObject<MillisecondsDate>;
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
            deletedAt = {
              getMilliseconds: 1,
            } as MockedObject<MillisecondsDate>;
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
            deletedAt = {
              getMilliseconds: 1,
            } as MockedObject<MillisecondsDate>;
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
            const completionDate = {
              getMilliseconds: 1,
            } as MockedObject<MillisecondsDate>;

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
            completedAt = {
              getMilliseconds: 1,
            } as MockedObject<MillisecondsDate>;
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
            const completionDate = {
              getMilliseconds: 1,
            } as MockedObject<MillisecondsDate>;

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
            const completionDate = {
              getMilliseconds: 1,
            } as MockedObject<MillisecondsDate>;
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
            deletedAt = {
              getMilliseconds: 1,
            } as MockedObject<MillisecondsDate>;
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
            completedAt = {
              getMilliseconds: 1,
            } as MockedObject<MillisecondsDate>;
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
            deletedAt = {
              getMilliseconds: 1,
            } as MockedObject<MillisecondsDate>;
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
            const newWishPrivacyLevel = {
              getPrivacyLevel: 'JustFriends',
            } as MockedObject<WishPrivacyLevel>;

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
            deletedAt = {
              getMilliseconds: 1,
            } as MockedObject<MillisecondsDate>;
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
            const newWishPrivacyLevel = {
              getPrivacyLevel: 'JustFriends',
            } as MockedObject<WishPrivacyLevel>;
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
            deletedAt = {
              getMilliseconds: 1,
            } as MockedObject<MillisecondsDate>;
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
            const newUrls = Array(Wish.MaxUrls + 1).fill({
              getUrl: 'https://www.example.com',
            } as MockedObject<WebUrl>);

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
            const newImages = Array(Wish.MaxImages + 1).fill({
              getUrl: 'https://www.example.com/1.jpg',
            } as MockedObject<WebUrl>);

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
            const newCategories = Array(Wish.MaxCategories + 1).fill({
              getName: 'category',
            } as MockedObject<CategoryName>);

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
            const newTitle = {
              getTitle: 'title',
            } as MockedObject<WishTitle>;
            const newDescription = {
              getDescription: 'description',
            } as MockedObject<WishDescription>;
            const newUrls = Array(Wish.MaxUrls).fill({
              getUrl: 'https://www.example.com/new/',
            } as MockedObject<WebUrl>);
            const newImages = Array(Wish.MaxImages).fill({
              getUrl: 'https://www.example.com/new.jpg',
            } as MockedObject<WebUrl>);
            const newCategories = Array(Wish.MaxCategories).fill({
              getName: 'new category',
            } as MockedObject<CategoryName>);
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
            deletedAt = {
              getMilliseconds: 1,
            } as MockedObject<MillisecondsDate>;
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
            stages = Array(Wish.MaxStages).fill({} as MockedObject<WishStage>);
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
            const newStage = {} as MockedObject<WishStage>;

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
              {
                equals: jest.fn().mockReturnValue(true),
              } as MockedObject<WishStage>,
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
            const newStage = {} as MockedObject<WishStage>;

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
            stages = Array(initialStagesLength).fill({
              equals: jest.fn().mockReturnValue(false),
            } as MockedObject<WishStage>);
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
            const newStage = {} as MockedObject<WishStage>;
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
            deletedAt = {
              getMilliseconds: 1,
            } as MockedObject<MillisecondsDate>;
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
              {
                equals: jest.fn().mockReturnValue(false),
              } as MockedObject<WishStage>,
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
            const stageToRemove = {} as MockedObject<WishStage>;

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
            stages = Array(initialStagesLength).fill({
              equals: jest.fn().mockReturnValue(true),
            } as MockedObject<WishStage>);
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
            const stageToRemove = {} as MockedObject<WishStage>;
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
