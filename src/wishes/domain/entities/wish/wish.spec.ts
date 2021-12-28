import { MockedObject } from 'ts-jest/dist/utils/testing';
import { Wish, WishStage, Wisher } from '..';
import {
  InvalidUniqueIdError,
  MillisecondsDate,
  UniqueId,
  WebUrl,
} from '../../../../shared/domain/value-objects';
import {
  CategoryName,
  PrivacyLevel,
  WishDescription,
  WishPrivacyLevel,
  WishTitle,
} from '../../value-objects';
import {
  DeletedWishCannotBeUpdatedError,
  DuplicatedWishStageError,
  InvalidWishCategoriesError,
  InvalidWishCategoryNameError,
  InvalidWishCompletedAtError,
  InvalidWishCreatedAtError,
  InvalidWishDescriptionError,
  InvalidWishImageError,
  InvalidWishImagesError,
  InvalidWishPrivacyLevelError,
  InvalidWishStageError,
  InvalidWishStagesError,
  InvalidWishTitleError,
  InvalidWishUpdatedAtError,
  InvalidWishUrlError,
  InvalidWishUrlsError,
  InvalidWishWisherError,
  NonExistentWishStageError,
  TooManyWishCategoriesError,
  TooManyWishImagesError,
  TooManyWishStagesError,
  TooManyWishUrlsError,
  WishIsAlreadyCompletedError,
  WishIsAlreadyDeletedError,
  WishIsAlreadyUncompletedError,
  WishIsNotDeletedError,
} from './exceptions';

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
        title: {},
        description: {},
        createdAt: {},
        urls: [],
        imageUrls: [],
      } as MockedObject<WishStage>,
    ],
    {
      getMilliseconds: 1,
    } as MockedObject<MillisecondsDate>,
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
        title: {},
        description: {},
        createdAt: {},
        urls: [],
        imageUrls: [],
      } as MockedObject<WishStage>,
      {
        id: { getId: 'id-1' },
        title: {},
        description: {},
        createdAt: {},
        urls: [],
        imageUrls: [],
      } as MockedObject<WishStage>,
    ],
    null,
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
    [],
    {
      getMilliseconds: 1,
    } as MockedObject<MillisecondsDate>,
    null,
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
    [],
    null,
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
            startedAt: MockedObject<MillisecondsDate>,
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
                startedAt,
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
            startedAt: MockedObject<MillisecondsDate>,
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
                startedAt,
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
            startedAt: MockedObject<MillisecondsDate>,
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
                startedAt,
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
            startedAt: MockedObject<MillisecondsDate>,
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
                startedAt,
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
            startedAt: MockedObject<MillisecondsDate>,
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
                startedAt,
                completedAt,
              ),
            ).toThrowError(InvalidWishCreatedAtError);
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
            startedAt: MockedObject<MillisecondsDate>,
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
                startedAt,
                completedAt,
              ),
            ).toThrowError(InvalidWishUpdatedAtError);
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
            startedAt: MockedObject<MillisecondsDate>,
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
                startedAt,
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
            startedAt: MockedObject<MillisecondsDate>,
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
                startedAt,
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
            startedAt: MockedObject<MillisecondsDate>,
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
                startedAt,
                completedAt,
              ),
            ).toThrowError(TooManyWishUrlsError);
          },
        );

        test.each(validValues)(
          'create a Wish with a invalid url inside a valid urls array should throw error',
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
            startedAt: MockedObject<MillisecondsDate>,
            completedAt: MockedObject<MillisecondsDate>,
          ) => {
            // Arrange

            // Act
            urls = [{} as MockedObject<WebUrl>, null];

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
                startedAt,
                completedAt,
              ),
            ).toThrowError(InvalidWishUrlError);
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
            startedAt: MockedObject<MillisecondsDate>,
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
                startedAt,
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
            startedAt: MockedObject<MillisecondsDate>,
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
                startedAt,
                completedAt,
              ),
            ).toThrowError(TooManyWishImagesError);
          },
        );

        test.each(validValues)(
          'create a Wish with a invalid image url inside a valid image urls array should throw error',
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
            startedAt: MockedObject<MillisecondsDate>,
            completedAt: MockedObject<MillisecondsDate>,
          ) => {
            // Arrange

            // Act
            images = [{} as MockedObject<WebUrl>, null];

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
                startedAt,
                completedAt,
              ),
            ).toThrowError(InvalidWishImageError);
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
            startedAt: MockedObject<MillisecondsDate>,
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
                startedAt,
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
            startedAt: MockedObject<MillisecondsDate>,
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
                startedAt,
                completedAt,
              ),
            ).toThrowError(TooManyWishCategoriesError);
          },
        );

        test.each(validValues)(
          'create a Wish with a invalid category inside a valid categories array should throw error',
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
            startedAt: MockedObject<MillisecondsDate>,
            completedAt: MockedObject<MillisecondsDate>,
          ) => {
            // Arrange

            // Act
            categories = [{} as MockedObject<CategoryName>, null];

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
                startedAt,
                completedAt,
              ),
            ).toThrowError(InvalidWishCategoryNameError);
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
            startedAt: MockedObject<MillisecondsDate>,
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
                startedAt,
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
            startedAt: MockedObject<MillisecondsDate>,
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
                startedAt,
                completedAt,
              ),
            ).toThrowError(TooManyWishStagesError);
          },
        );

        test.each(validValues)(
          'create a Wish with a invalid stage inside a valid stages array should throw error',
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
            startedAt: MockedObject<MillisecondsDate>,
            completedAt: MockedObject<MillisecondsDate>,
          ) => {
            // Arrange

            // Act
            stages = [{} as MockedObject<WishStage>, null];

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
                startedAt,
                completedAt,
              ),
            ).toThrowError(InvalidWishStageError);
          },
        );

        test.each(validValues)(
          'should create a Wish with [id: %p], [title: %p], [description: %p], [privacyLevel: %p], [createdAt: %p], [updatedAt: %p], [wisher: %p]',
          (
            uniqueId: MockedObject<UniqueId>,
            title: MockedObject<WishTitle>,
            description: MockedObject<WishDescription>,
            privacyLevel: MockedObject<WishPrivacyLevel>,
            createdAt: MockedObject<MillisecondsDate>,
            updatedAt: MockedObject<MillisecondsDate>,
            wisher: MockedObject<Wisher>,
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

            expect(wish.urlsLength).toBe(0);
            expect(wish.imageUrlsLength).toBe(0);
            expect(wish.categoriesLength).toBe(0);
            expect(wish.stagesLength).toBe(0);
            expect(wish.deletedAt).toBeNull();
            expect(wish.completedAt).toBeNull();
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
            startedAt: MockedObject<MillisecondsDate>,
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
              startedAt,
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

            expect(wish.urlsLength).toBe(urls.length);
            for (let i = 0; i < urls.length; i++)
              expect(wish.urls[i].getUrl).toBe(urls[i].getUrl);
            expect(wish.imageUrlsLength).toBe(images.length);
            for (let i = 0; i < images.length; i++)
              expect(wish.imageUrls[i].getUrl).toBe(images[i].getUrl);
            expect(wish.categoriesLength).toBe(categories.length);
            for (let i = 0; i < categories.length; i++)
              expect(wish.categories[i].getName).toBe(categories[i].getName);
            expect(wish.stagesLength).toBe(stages.length);
            for (let i = 0; i < stages.length; i++)
              expect(wish.stages[i].id.getId).toBe(stages[i].id.getId);

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
          'make changes on urls array getter should make no changes on the original urls array',
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
            startedAt: MockedObject<MillisecondsDate>,
            completedAt: MockedObject<MillisecondsDate>,
          ) => {
            // Arrange
            const originalUrl = 'https://www.example.com/original';
            urls = [
              {
                getUrl: originalUrl,
              } as MockedObject<WebUrl>,
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
              deletedAt,
              startedAt,
              completedAt,
            );

            // Act
            wish.urls.push({
              getUrl: 'https://www.example.com/new/1',
            } as MockedObject<WebUrl>);
            wish.urls[0] = {
              getUrl: 'https://www.example.com/new/2',
            } as MockedObject<WebUrl>;

            // Assert
            expect(wish.urlsLength).toBe(1);
            expect(wish.urls[0].getUrl).toBe(originalUrl);
          },
        );

        test.each(validValues)(
          'make changes on images array getter should make no changes on the original images array',
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
            startedAt: MockedObject<MillisecondsDate>,
            completedAt: MockedObject<MillisecondsDate>,
          ) => {
            // Arrange
            const originalImageUrl = 'https://www.example.com/original.jpg';
            images = [
              {
                getUrl: originalImageUrl,
              } as MockedObject<WebUrl>,
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
              deletedAt,
              startedAt,
              completedAt,
            );

            // Act
            wish.imageUrls.push({
              getUrl: 'https://www.example.com/new/1.jpg',
            } as MockedObject<WebUrl>);
            wish.imageUrls[0] = {
              getUrl: 'https://www.example.com/new/2.jpg',
            } as MockedObject<WebUrl>;

            // Assert
            expect(wish.imageUrlsLength).toBe(1);
            expect(wish.imageUrls[0].getUrl).toBe(originalImageUrl);
          },
        );

        test.each(validValues)(
          'make changes on categories array getter should make no changes on the original categories array',
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
            startedAt: MockedObject<MillisecondsDate>,
            completedAt: MockedObject<MillisecondsDate>,
          ) => {
            // Arrange
            const originalCategoryName = 'original category';
            categories = [
              {
                getName: originalCategoryName,
              } as MockedObject<CategoryName>,
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
              deletedAt,
              startedAt,
              completedAt,
            );

            // Act
            wish.categories.push({
              getName: 'new category 1',
            } as MockedObject<CategoryName>);
            wish.categories[0] = {
              getName: 'new category 2',
            } as MockedObject<CategoryName>;

            // Assert
            expect(wish.categoriesLength).toBe(1);
            expect(wish.categories[0].getName).toBe(originalCategoryName);
          },
        );

        test.each(validValues)(
          'make changes on stages array getter should make no changes on the original stages array',
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
            startedAt: MockedObject<MillisecondsDate>,
            completedAt: MockedObject<MillisecondsDate>,
          ) => {
            // Arrange
            const wishStageOriginalId = 'wish-stage-original-id';
            const wishStageOriginalUrl = 'https://www.example.com/original';
            const wishStageOriginalImage =
              'https://www.example.com/original.jpg';
            stages = [
              {
                id: { getId: wishStageOriginalId },
                title: {},
                description: {},
                createdAt: {},
                urls: [{ getUrl: wishStageOriginalUrl } as WebUrl],
                imageUrls: [{ getUrl: wishStageOriginalImage } as WebUrl],
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
              deletedAt,
              startedAt,
              completedAt,
            );

            // Act
            wish.stages.push({
              id: { getId: 'new-wish-stage-1' },
              urls: [
                { getUrl: 'https://www.example.com/new/stage/1' } as WebUrl,
              ],
              imageUrls: [
                { getUrl: 'https://www.example.com/new/stage/1.jpg' } as WebUrl,
              ],
            } as MockedObject<WishStage>);
            wish.stages[0] = {
              id: { getId: 'new-wish-stage-2' },
              urls: [
                { getUrl: 'https://www.example.com/new/stage/2' } as WebUrl,
              ],
              imageUrls: [
                { getUrl: 'https://www.example.com/new/stage/2.jpg' } as WebUrl,
              ],
            } as MockedObject<WishStage>;
            wish.stages[0].urls.push({
              getUrl: 'https://www.example.com/new/stage/3',
            } as WebUrl);
            wish.stages[0].imageUrls.push({
              getUrl: 'https://www.example.com/new/stage/3.jpg',
            } as WebUrl);
            wish.stages[0].urls[0] = {
              getUrl: 'https://www.example.com/new/stage/4',
            } as WebUrl;
            wish.stages[0].imageUrls[0] = {
              getUrl: 'https://www.example.com/new/stage/4.jpg',
            } as WebUrl;

            // Assert
            expect(wish.stagesLength).toBe(1);
            expect(wish.stages[0].urlsLength).toBe(1);
            expect(wish.stages[0].imageUrlsLength).toBe(1);

            expect(wish.stages[0].id.getId).toBe(wishStageOriginalId);
            expect(wish.stages[0].urls[0].getUrl).toBe(wishStageOriginalUrl);
            expect(wish.stages[0].imageUrls[0].getUrl).toBe(
              wishStageOriginalImage,
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
            startedAt: MockedObject<MillisecondsDate>,
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
              startedAt,
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
            startedAt: MockedObject<MillisecondsDate>,
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
              startedAt,
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
            startedAt: MockedObject<MillisecondsDate>,
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
            startedAt: MockedObject<MillisecondsDate>,
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
              startedAt,
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
            startedAt: MockedObject<MillisecondsDate>,
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
              startedAt,
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
            startedAt: MockedObject<MillisecondsDate>,
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
              startedAt,
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
              InvalidWishCompletedAtError,
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
          'uncomplete a deleted Wish should throw error',
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
            );

            // Act

            // Assert
            expect(() => wish.uncomplete()).toThrowError(
              DeletedWishCannotBeUpdatedError,
            );
          },
        );

        test.each(validValues)(
          'uncomplete an already uncomplete Wish should throw error',
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
            startedAt: MockedObject<MillisecondsDate>,
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
              startedAt,
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
            startedAt: MockedObject<MillisecondsDate>,
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
              startedAt,
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
            startedAt: MockedObject<MillisecondsDate>,
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
            startedAt: MockedObject<MillisecondsDate>,
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
            startedAt: MockedObject<MillisecondsDate>,
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
              startedAt,
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
            startedAt: MockedObject<MillisecondsDate>,
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
            startedAt: MockedObject<MillisecondsDate>,
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
            startedAt: MockedObject<MillisecondsDate>,
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
            startedAt: MockedObject<MillisecondsDate>,
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
            startedAt: MockedObject<MillisecondsDate>,
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
            startedAt: MockedObject<MillisecondsDate>,
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
            startedAt: MockedObject<MillisecondsDate>,
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
            startedAt: MockedObject<MillisecondsDate>,
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
            startedAt: MockedObject<MillisecondsDate>,
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
            const newTitle = {
              getTitle: 'title',
            } as MockedObject<WishTitle>;
            const newDescription = {
              getDescription: 'description',
            } as MockedObject<WishDescription>;

            // Act
            wish.update(newTitle, newDescription);

            // Assert
            expect(wish.title.getTitle).toBe(newTitle.getTitle);
            expect(wish.description.getDescription).toBe(
              newDescription.getDescription,
            );
            expect(wish.urlsLength).toBe(0);
            expect(wish.imageUrlsLength).toBe(0);
            expect(wish.categoriesLength).toBe(0);
            expect(wish.stagesLength).toBe(stages.length);

            expect(wish.updatedAt.getMilliseconds).not.toBe(
              updatedAt.getMilliseconds,
            );
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
            startedAt: MockedObject<MillisecondsDate>,
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
            expect(wish.urlsLength).toBe(newUrls.length);
            for (let i = 0; i < newUrls.length; i++)
              expect(wish.urls[i].getUrl).toBe(newUrls[i].getUrl);
            expect(wish.imageUrlsLength).toBe(newImages.length);
            for (let i = 0; i < newImages.length; i++)
              expect(wish.imageUrls[i].getUrl).toBe(newImages[i].getUrl);
            expect(wish.categoriesLength).toBe(newCategories.length);
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
            startedAt: MockedObject<MillisecondsDate>,
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
              startedAt,
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
            startedAt: MockedObject<MillisecondsDate>,
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
            startedAt: MockedObject<MillisecondsDate>,
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
            startedAt: MockedObject<MillisecondsDate>,
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
            startedAt: MockedObject<MillisecondsDate>,
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
            expect(wish.stagesLength).toBe(finalStagesLength);
            expect(wish.updatedAt.getMilliseconds).not.toBe(
              updatedAt.getMilliseconds,
            );
          },
        );

        test.each(validValues)(
          'update an stage from a deleted Wish should throw error',
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
            startedAt: MockedObject<MillisecondsDate>,
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
              startedAt,
              completedAt,
            );

            // Act

            // Assert
            expect(() => wish.updateStage(null, null, null)).toThrowError(
              DeletedWishCannotBeUpdatedError,
            );
          },
        );

        test.each(validValues)(
          'update an stage from a Wish without that stage should throw error',
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
            startedAt: MockedObject<MillisecondsDate>,
            completedAt: MockedObject<MillisecondsDate>,
          ) => {
            // Arrange
            const id = {
              equals: jest.fn().mockReturnValue(false),
            } as MockedObject<UniqueId>;
            const stage = {
              id: id as UniqueId,
              update: jest.fn(),
            } as MockedObject<WishStage>;
            stages = [stage];
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
            expect(() => wish.updateStage(null, null, null)).toThrowError(
              NonExistentWishStageError,
            );
          },
        );

        test.each(validValues)(
          'update an stage from a Wish should change the property values',
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
            startedAt: MockedObject<MillisecondsDate>,
            completedAt: MockedObject<MillisecondsDate>,
          ) => {
            // Arrange
            const id = {
              equals: jest.fn().mockReturnValue(true),
            } as MockedObject<UniqueId>;
            const stage = {
              id: id as UniqueId,
              update: jest.fn(),
            } as MockedObject<WishStage>;
            stages = [stage];
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
            wish.updateStage(null, null, null);

            // Assert
            expect(stage.update.mock.calls).toHaveLength(1);
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
            startedAt: MockedObject<MillisecondsDate>,
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
              startedAt,
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
            startedAt: MockedObject<MillisecondsDate>,
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
              InvalidWishStageError,
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
            startedAt: MockedObject<MillisecondsDate>,
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
            startedAt: MockedObject<MillisecondsDate>,
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
            expect(wish.stagesLength).toBe(finalStagesLength);
            expect(wish.updatedAt.getMilliseconds).not.toBe(
              updatedAt.getMilliseconds,
            );
          },
        );
      });
    });
  });
});
