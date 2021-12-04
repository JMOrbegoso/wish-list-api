import { MockedObject } from 'ts-jest/dist/utils/testing';
import { mocked } from 'ts-jest/utils';
import {
  InvalidWishStageImagesError,
  InvalidWishStageUrlsError,
  TooManyWishStageImagesError,
  TooManyWishStageUrlsError,
  WishStage,
} from '..';
import {
  InvalidMillisecondsDateError,
  InvalidUniqueIdError,
  MillisecondsDate,
  UniqueId,
  WebUrl,
} from '../../../../core/domain/value-objects';
import {
  InvalidWishDescriptionError,
  InvalidWishTitleError,
  WishDescription,
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
    mocked<MillisecondsDate>({
      getMilliseconds: 1,
    } as unknown as MillisecondsDate),
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
            ).toThrowError(InvalidWishTitleError);
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
            ).toThrowError(InvalidWishDescriptionError);
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
            ).toThrowError(InvalidMillisecondsDateError);
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
            urls = Array(WishStage.MaxUrls + 1).fill(
              mocked<WebUrl>({
                getUrl: 'https://www.example.com',
              } as unknown as WebUrl),
            );

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
            images = Array(WishStage.MaxImages + 1).fill(
              mocked<WebUrl>({
                getUrl: 'https://www.example.com/1.jpg',
              } as unknown as WebUrl),
            );

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
            expect(wishStage.urls[0].getUrl).toBe(urls[0].getUrl);
            expect(wishStage.imageUrls[0].getUrl).toBe(images[0].getUrl);
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
      });
    });
  });
});
