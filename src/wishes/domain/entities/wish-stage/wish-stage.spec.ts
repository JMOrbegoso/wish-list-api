import { MockedObject } from 'ts-jest/dist/utils/testing';
import { WishStage } from '..';
import {
  InvalidUniqueIdError,
  MillisecondsDate,
  UniqueId,
  WebUrl,
} from '../../../../shared/domain/value-objects';
import { WishDescription, WishTitle } from '../../value-objects';
import {
  InvalidWishStageCreatedAtError,
  InvalidWishStageDescriptionError,
  InvalidWishStageImageError,
  InvalidWishStageImagesError,
  InvalidWishStageTitleError,
  InvalidWishStageUrlError,
  InvalidWishStageUrlsError,
  TooManyWishStageImagesError,
  TooManyWishStageUrlsError,
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
      getMilliseconds: 1,
    } as MockedObject<MillisecondsDate>,
    [
      {
        getUrl: 'https://www.example.com',
      } as MockedObject<WebUrl>,
      {
        getUrl: 'https://www.example.net',
      } as MockedObject<WebUrl>,
    ],
    [
      {
        getUrl: 'https://www.example.com/1.jpg',
      } as MockedObject<WebUrl>,
      {
        getUrl: 'https://www.example.com/2.jpg',
      } as MockedObject<WebUrl>,
      {
        getUrl: 'https://www.example.com/3.jpg',
      } as MockedObject<WebUrl>,
    ],
  ],
  [
    {
      getId: 'id-1',
      equals: jest.fn(),
    } as MockedObject<UniqueId>,
    {
      getTitle: 'title',
    } as MockedObject<WishTitle>,
    {
      getDescription: 'description',
    } as MockedObject<WishDescription>,
    {
      getMilliseconds: 1,
    } as MockedObject<MillisecondsDate>,
    [],
    [
      {
        getUrl: 'https://www.example.com/1.jpg',
      } as MockedObject<WebUrl>,
    ],
  ],
  [
    {
      getId: 'id-2',
      equals: jest.fn(),
    } as MockedObject<UniqueId>,
    {
      getTitle: 'title',
    } as MockedObject<WishTitle>,
    {
      getDescription: 'description',
    } as MockedObject<WishDescription>,
    {
      getMilliseconds: 1,
    } as MockedObject<MillisecondsDate>,
    [
      {
        getUrl: 'https://www.example.com',
      } as MockedObject<WebUrl>,
    ],
    [],
  ],
  [
    {
      getId: 'id-3',
      equals: jest.fn(),
    } as MockedObject<UniqueId>,
    {
      getTitle: 'title',
    } as MockedObject<WishTitle>,
    {
      getDescription: 'description',
    } as MockedObject<WishDescription>,
    {
      getMilliseconds: 1,
    } as MockedObject<MillisecondsDate>,
    [],
    [],
  ],
];

describe('wishes', () => {
  describe('domain', () => {
    describe('entities', () => {
      describe('wish-stage', () => {
        test.each(validValues)(
          'create a WishStage with invalid id should throw error',
          (
            uniqueId: MockedObject<UniqueId>,
            title: MockedObject<WishTitle>,
            description: MockedObject<WishDescription>,
            createdAt: MockedObject<MillisecondsDate>,
            urls: MockedObject<WebUrl>[],
            images: MockedObject<WebUrl>[],
          ) => {
            // Arrange

            // Act

            // Assert
            expect(() =>
              WishStage.create(
                null,
                title,
                description,
                createdAt,
                urls,
                images,
              ),
            ).toThrowError(InvalidUniqueIdError);
          },
        );

        test.each(validValues)(
          'create a WishStage with invalid title should throw error',
          (
            uniqueId: MockedObject<UniqueId>,
            title: MockedObject<WishTitle>,
            description: MockedObject<WishDescription>,
            createdAt: MockedObject<MillisecondsDate>,
            urls: MockedObject<WebUrl>[],
            images: MockedObject<WebUrl>[],
          ) => {
            // Arrange

            // Act

            // Assert
            expect(() =>
              WishStage.create(
                uniqueId,
                null,
                description,
                createdAt,
                urls,
                images,
              ),
            ).toThrowError(InvalidWishStageTitleError);
          },
        );

        test.each(validValues)(
          'create a WishStage with invalid description should throw error',
          (
            uniqueId: MockedObject<UniqueId>,
            title: MockedObject<WishTitle>,
            description: MockedObject<WishDescription>,
            createdAt: MockedObject<MillisecondsDate>,
            urls: MockedObject<WebUrl>[],
            images: MockedObject<WebUrl>[],
          ) => {
            // Arrange

            // Act

            // Assert
            expect(() =>
              WishStage.create(uniqueId, title, null, createdAt, urls, images),
            ).toThrowError(InvalidWishStageDescriptionError);
          },
        );

        test.each(validValues)(
          'create a WishStage with invalid createdAt should throw error',
          (
            uniqueId: MockedObject<UniqueId>,
            title: MockedObject<WishTitle>,
            description: MockedObject<WishDescription>,
            createdAt: MockedObject<MillisecondsDate>,
            urls: MockedObject<WebUrl>[],
            images: MockedObject<WebUrl>[],
          ) => {
            // Arrange

            // Act

            // Assert
            expect(() =>
              WishStage.create(
                uniqueId,
                title,
                description,
                null,
                urls,
                images,
              ),
            ).toThrowError(InvalidWishStageCreatedAtError);
          },
        );

        test.each(validValues)(
          'create a WishStage with invalid urls array should throw error',
          (
            uniqueId: MockedObject<UniqueId>,
            title: MockedObject<WishTitle>,
            description: MockedObject<WishDescription>,
            createdAt: MockedObject<MillisecondsDate>,
            urls: MockedObject<WebUrl>[],
            images: MockedObject<WebUrl>[],
          ) => {
            // Arrange

            // Act

            // Assert
            expect(() =>
              WishStage.create(
                uniqueId,
                title,
                description,
                createdAt,
                null,
                images,
              ),
            ).toThrowError(InvalidWishStageUrlsError);
          },
        );

        test.each(validValues)(
          'create a WishStage with invalid urls array should throw error',
          (
            uniqueId: MockedObject<UniqueId>,
            title: MockedObject<WishTitle>,
            description: MockedObject<WishDescription>,
            createdAt: MockedObject<MillisecondsDate>,
            urls: MockedObject<WebUrl>[],
            images: MockedObject<WebUrl>[],
          ) => {
            // Arrange

            // Act
            urls = Array(WishStage.MaxUrls + 1).fill({
              getUrl: 'https://www.example.com',
            } as MockedObject<WebUrl>);

            // Assert
            expect(() =>
              WishStage.create(
                uniqueId,
                title,
                description,
                createdAt,
                urls,
                images,
              ),
            ).toThrowError(TooManyWishStageUrlsError);
          },
        );

        test.each(validValues)(
          'create a WishStage with a invalid url inside a valid urls array should throw error',
          (
            uniqueId: MockedObject<UniqueId>,
            title: MockedObject<WishTitle>,
            description: MockedObject<WishDescription>,
            createdAt: MockedObject<MillisecondsDate>,
            urls: MockedObject<WebUrl>[],
            images: MockedObject<WebUrl>[],
          ) => {
            // Arrange

            // Act
            urls = [{} as MockedObject<WebUrl>, null];

            // Assert
            expect(() =>
              WishStage.create(
                uniqueId,
                title,
                description,
                createdAt,
                urls,
                images,
              ),
            ).toThrowError(InvalidWishStageUrlError);
          },
        );

        test.each(validValues)(
          'create a WishStage with invalid images array should throw error',
          (
            uniqueId: MockedObject<UniqueId>,
            title: MockedObject<WishTitle>,
            description: MockedObject<WishDescription>,
            createdAt: MockedObject<MillisecondsDate>,
            urls: MockedObject<WebUrl>[],
          ) => {
            // Arrange

            // Act

            // Assert
            expect(() =>
              WishStage.create(
                uniqueId,
                title,
                description,
                createdAt,
                urls,
                null,
              ),
            ).toThrowError(InvalidWishStageImagesError);
          },
        );

        test.each(validValues)(
          'create a WishStage with invalid images array should throw error',
          (
            uniqueId: MockedObject<UniqueId>,
            title: MockedObject<WishTitle>,
            description: MockedObject<WishDescription>,
            createdAt: MockedObject<MillisecondsDate>,
            urls: MockedObject<WebUrl>[],
            images: MockedObject<WebUrl>[],
          ) => {
            // Arrange

            // Act
            images = Array(WishStage.MaxImages + 1).fill({
              getUrl: 'https://www.example.com/1.jpg',
            } as MockedObject<WebUrl>);

            // Assert
            expect(() =>
              WishStage.create(
                uniqueId,
                title,
                description,
                createdAt,
                urls,
                images,
              ),
            ).toThrowError(TooManyWishStageImagesError);
          },
        );

        test.each(validValues)(
          'create a WishStage with a invalid image inside a valid images array should throw error',
          (
            uniqueId: MockedObject<UniqueId>,
            title: MockedObject<WishTitle>,
            description: MockedObject<WishDescription>,
            createdAt: MockedObject<MillisecondsDate>,
            urls: MockedObject<WebUrl>[],
            images: MockedObject<WebUrl>[],
          ) => {
            // Arrange

            // Act
            images = [{} as MockedObject<WebUrl>, null];

            // Assert
            expect(() =>
              WishStage.create(
                uniqueId,
                title,
                description,
                createdAt,
                urls,
                images,
              ),
            ).toThrowError(InvalidWishStageImageError);
          },
        );

        test.each(validValues)(
          'should create a WishStage with [id: %p], [title: %p], [description: %p], [createdAt: %p]',
          (
            uniqueId: MockedObject<UniqueId>,
            title: MockedObject<WishTitle>,
            description: MockedObject<WishDescription>,
            createdAt: MockedObject<MillisecondsDate>,
          ) => {
            // Arrange

            // Act
            const wishStage = WishStage.create(
              uniqueId,
              title,
              description,
              createdAt,
            );

            // Assert
            expect(wishStage.id.getId).toBe(uniqueId.getId);
            expect(wishStage.title.getTitle).toBe(title.getTitle);
            expect(wishStage.description.getDescription).toBe(
              description.getDescription,
            );
            expect(wishStage.createdAt.getMilliseconds).toBe(
              createdAt.getMilliseconds,
            );
            expect(wishStage.urlsLength).toBe(0);
            expect(wishStage.imageUrlsLength).toBe(0);
          },
        );

        test.each(validValues)(
          'should create a WishStage with [id: %p], [title: %p], [description: %p], [createdAt: %p], [urls: %p] and [images: %p]',
          (
            uniqueId: MockedObject<UniqueId>,
            title: MockedObject<WishTitle>,
            description: MockedObject<WishDescription>,
            createdAt: MockedObject<MillisecondsDate>,
            urls: MockedObject<WebUrl>[],
            images: MockedObject<WebUrl>[],
          ) => {
            // Arrange

            // Act
            const wishStage = WishStage.create(
              uniqueId,
              title,
              description,
              createdAt,
              urls,
              images,
            );

            // Assert
            expect(wishStage.id.getId).toBe(uniqueId.getId);
            expect(wishStage.title.getTitle).toBe(title.getTitle);
            expect(wishStage.description.getDescription).toBe(
              description.getDescription,
            );
            expect(wishStage.createdAt.getMilliseconds).toBe(
              createdAt.getMilliseconds,
            );
            expect(wishStage.urlsLength).toBe(urls.length);
            for (let i = 0; i < urls.length; i++)
              expect(wishStage.urls[i].getUrl).toBe(urls[i].getUrl);
            expect(wishStage.imageUrlsLength).toBe(images.length);
            for (let i = 0; i < images.length; i++)
              expect(wishStage.imageUrls[i].getUrl).toBe(images[i].getUrl);
          },
        );

        test.each(validValues)(
          'make changes on urls array getter should make no changes on the original urls array',
          (
            uniqueId: MockedObject<UniqueId>,
            title: MockedObject<WishTitle>,
            description: MockedObject<WishDescription>,
            createdAt: MockedObject<MillisecondsDate>,
            urls: MockedObject<WebUrl>[],
            images: MockedObject<WebUrl>[],
          ) => {
            // Arrange
            const originalUrl = 'https://www.example.com/original';
            urls = [
              {
                getUrl: originalUrl,
              } as MockedObject<WebUrl>,
            ];
            const wishStage = WishStage.create(
              uniqueId,
              title,
              description,
              createdAt,
              urls,
              images,
            );

            // Act
            wishStage.urls.push({
              getUrl: 'https://www.example.com/new/1',
            } as MockedObject<WebUrl>);
            wishStage.urls[0] = {
              getUrl: 'https://www.example.com/new/2',
            } as MockedObject<WebUrl>;

            // Assert
            expect(wishStage.urlsLength).toBe(1);
            expect(wishStage.urls[0].getUrl).toBe(originalUrl);
          },
        );

        test.each(validValues)(
          'make changes on images array getter should make no changes on the original images array',
          (
            uniqueId: MockedObject<UniqueId>,
            title: MockedObject<WishTitle>,
            description: MockedObject<WishDescription>,
            createdAt: MockedObject<MillisecondsDate>,
            urls: MockedObject<WebUrl>[],
            images: MockedObject<WebUrl>[],
          ) => {
            // Arrange
            const originalImageUrl = 'https://www.example.com/original.jpg';
            images = [
              {
                getUrl: originalImageUrl,
              } as MockedObject<WebUrl>,
            ];
            const wishStage = WishStage.create(
              uniqueId,
              title,
              description,
              createdAt,
              urls,
              images,
            );

            // Act
            wishStage.imageUrls.push({
              getUrl: 'https://www.example.com/new/1.jpg',
            } as MockedObject<WebUrl>);
            wishStage.imageUrls[0] = {
              getUrl: 'https://www.example.com/new/2.jpg',
            } as MockedObject<WebUrl>;

            // Assert
            expect(wishStage.imageUrlsLength).toBe(1);
            expect(wishStage.imageUrls[0].getUrl).toBe(originalImageUrl);
          },
        );

        test.each(validValues)(
          'comparing two entities should call "equals" method from UniqueId',
          (
            uniqueId: MockedObject<UniqueId>,
            title: MockedObject<WishTitle>,
            description: MockedObject<WishDescription>,
            createdAt: MockedObject<MillisecondsDate>,
            urls: MockedObject<WebUrl>[],
            images: MockedObject<WebUrl>[],
          ) => {
            // Arrange
            const wishStage = WishStage.create(
              uniqueId,
              title,
              description,
              createdAt,
              urls,
              images,
            );

            // Act
            wishStage.equals(wishStage);

            // Assert
            expect(uniqueId.equals.mock.calls).toHaveLength(1);
          },
        );

        test.each(validValues)(
          'update WishStage with null title should throw error',
          (
            uniqueId: MockedObject<UniqueId>,
            title: MockedObject<WishTitle>,
            description: MockedObject<WishDescription>,
            createdAt: MockedObject<MillisecondsDate>,
            urls: MockedObject<WebUrl>[],
            images: MockedObject<WebUrl>[],
          ) => {
            // Arrange
            const wishStage = WishStage.create(
              uniqueId,
              title,
              description,
              createdAt,
              urls,
              images,
            );

            // Act
            const newDescription = {
              getDescription: 'description',
            } as MockedObject<WishDescription>;

            // Assert
            expect(() => wishStage.update(null, newDescription)).toThrowError(
              InvalidWishStageTitleError,
            );
          },
        );

        test.each(validValues)(
          'update WishStage with null description should throw error',
          (
            uniqueId: MockedObject<UniqueId>,
            title: MockedObject<WishTitle>,
            description: MockedObject<WishDescription>,
            createdAt: MockedObject<MillisecondsDate>,
            urls: MockedObject<WebUrl>[],
            images: MockedObject<WebUrl>[],
          ) => {
            // Arrange
            const wishStage = WishStage.create(
              uniqueId,
              title,
              description,
              createdAt,
              urls,
              images,
            );

            // Act
            const newTitle = {
              getTitle: 'title',
            } as MockedObject<WishTitle>;

            // Assert
            expect(() => wishStage.update(newTitle, null)).toThrowError(
              InvalidWishStageDescriptionError,
            );
          },
        );

        test.each(validValues)(
          'update WishStage with invalid urls should throw error',
          (
            uniqueId: MockedObject<UniqueId>,
            title: MockedObject<WishTitle>,
            description: MockedObject<WishDescription>,
            createdAt: MockedObject<MillisecondsDate>,
            urls: MockedObject<WebUrl>[],
            images: MockedObject<WebUrl>[],
          ) => {
            // Arrange
            const wishStage = WishStage.create(
              uniqueId,
              title,
              description,
              createdAt,
              urls,
              images,
            );

            // Act

            // Assert
            expect(() =>
              wishStage.update(title, description, null, images),
            ).toThrowError(InvalidWishStageUrlsError);
          },
        );

        test.each(validValues)(
          'update WishStage with more urls than the limit should throw error',
          (
            uniqueId: MockedObject<UniqueId>,
            title: MockedObject<WishTitle>,
            description: MockedObject<WishDescription>,
            createdAt: MockedObject<MillisecondsDate>,
            urls: MockedObject<WebUrl>[],
            images: MockedObject<WebUrl>[],
          ) => {
            // Arrange
            const wishStage = WishStage.create(
              uniqueId,
              title,
              description,
              createdAt,
              urls,
              images,
            );

            // Act
            const newUrls = Array(WishStage.MaxUrls + 1).fill({
              getUrl: 'https://www.example.com',
            } as MockedObject<WebUrl>);

            // Assert
            expect(() =>
              wishStage.update(title, description, newUrls, images),
            ).toThrowError(TooManyWishStageUrlsError);
          },
        );

        test.each(validValues)(
          'update WishStage with invalid images should throw error',
          (
            uniqueId: MockedObject<UniqueId>,
            title: MockedObject<WishTitle>,
            description: MockedObject<WishDescription>,
            createdAt: MockedObject<MillisecondsDate>,
            urls: MockedObject<WebUrl>[],
            images: MockedObject<WebUrl>[],
          ) => {
            // Arrange
            const wishStage = WishStage.create(
              uniqueId,
              title,
              description,
              createdAt,
              urls,
              images,
            );

            // Act

            // Assert
            expect(() =>
              wishStage.update(title, description, urls, null),
            ).toThrowError(InvalidWishStageImagesError);
          },
        );

        test.each(validValues)(
          'update WishStage with more images than the limit should throw error',
          (
            uniqueId: MockedObject<UniqueId>,
            title: MockedObject<WishTitle>,
            description: MockedObject<WishDescription>,
            createdAt: MockedObject<MillisecondsDate>,
            urls: MockedObject<WebUrl>[],
            images: MockedObject<WebUrl>[],
          ) => {
            // Arrange
            const wishStage = WishStage.create(
              uniqueId,
              title,
              description,
              createdAt,
              urls,
              images,
            );

            // Act
            const newImages = Array(WishStage.MaxImages + 1).fill({
              getUrl: 'https://www.example.com/1.jpg',
            } as MockedObject<WebUrl>);

            // Assert
            expect(() =>
              wishStage.update(title, description, urls, newImages),
            ).toThrowError(TooManyWishStageImagesError);
          },
        );

        test.each(validValues)(
          'update WishStage with valid values (default urls and images) should change the entity properties',
          (
            uniqueId: MockedObject<UniqueId>,
            title: MockedObject<WishTitle>,
            description: MockedObject<WishDescription>,
            createdAt: MockedObject<MillisecondsDate>,
            urls: MockedObject<WebUrl>[],
            images: MockedObject<WebUrl>[],
          ) => {
            // Arrange
            const wishStage = WishStage.create(
              uniqueId,
              title,
              description,
              createdAt,
              urls,
              images,
            );

            // Act
            const newTitle = {
              getTitle: 'title',
            } as MockedObject<WishTitle>;
            const newDescription = {
              getDescription: 'description',
            } as MockedObject<WishDescription>;

            wishStage.update(newTitle, newDescription);

            // Assert
            expect(wishStage.title.getTitle).toBe(newTitle.getTitle);
            expect(wishStage.description.getDescription).toBe(
              newDescription.getDescription,
            );
            expect(wishStage.urlsLength).toBe(0);
            expect(wishStage.imageUrlsLength).toBe(0);
          },
        );

        test.each(validValues)(
          'update WishStage with valid values should change the entity properties',
          (
            uniqueId: MockedObject<UniqueId>,
            title: MockedObject<WishTitle>,
            description: MockedObject<WishDescription>,
            createdAt: MockedObject<MillisecondsDate>,
            urls: MockedObject<WebUrl>[],
            images: MockedObject<WebUrl>[],
          ) => {
            // Arrange
            const wishStage = WishStage.create(
              uniqueId,
              title,
              description,
              createdAt,
              urls,
              images,
            );

            // Act
            const newTitle = {
              getTitle: 'title',
            } as MockedObject<WishTitle>;
            const newDescription = {
              getDescription: 'description',
            } as MockedObject<WishDescription>;
            const newUrls = [
              {
                getUrl: 'https://www.example.com',
              } as MockedObject<WebUrl>,
            ];
            const newImages = [
              {
                getUrl: 'https://www.example.com/1.jpg',
              } as MockedObject<WebUrl>,
            ];

            wishStage.update(newTitle, newDescription, newUrls, newImages);

            // Assert
            expect(wishStage.title.getTitle).toBe(newTitle.getTitle);
            expect(wishStage.description.getDescription).toBe(
              newDescription.getDescription,
            );
            expect(wishStage.urlsLength).toBe(newUrls.length);
            for (let i = 0; i < newUrls.length; i++)
              expect(wishStage.urls[i].getUrl).toBe(newUrls[i].getUrl);
            expect(wishStage.imageUrlsLength).toBe(newImages.length);
            for (let i = 0; i < newImages.length; i++)
              expect(wishStage.imageUrls[i].getUrl).toBe(newImages[i].getUrl);
          },
        );
      });
    });
  });
});
