import { mocked } from 'ts-jest/utils';
import { GetPublicWishesHandler, GetPublicWishesQuery } from '..';
import { Wish } from '../../../domain/entities';
import { WishRepository } from '../../../domain/repositories';
import { PrivacyLevel } from '../../../domain/value-objects';

describe('wishes', () => {
  describe('application', () => {
    describe('queries', () => {
      describe('get-public-wishes', () => {
        test('should return an empty wishes array', async () => {
          // Arrange
          const wishRepository = mocked<WishRepository>({
            getAllPublicWishes: jest.fn().mockReturnValue([]),
          } as unknown as WishRepository);

          const query = mocked<GetPublicWishesQuery>(
            {} as unknown as GetPublicWishesQuery,
          );

          const handler = new GetPublicWishesHandler(wishRepository);

          // Act
          const outputWishes = await handler.execute(query);

          // Assert
          expect(outputWishes.length).toBe(0);
        });

        test('should return an array with one OutputWishDto', async () => {
          // Arrange
          const wish = mocked<Wish>({
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
              getMilliseconds: 2,
            },
            updatedAt: {
              getMilliseconds: 2,
            },
            wisher: {
              id: {
                getId: 'wisher id 0',
              },
            },
            urls: [],
            imageUrls: [],
            categories: [],
            stages: [],
            deletedAt: {
              getMilliseconds: 2,
            },
            completedAt: {
              getMilliseconds: 2,
            },
          } as unknown as Wish);

          const wishRepository = mocked<WishRepository>({
            getAllPublicWishes: jest.fn().mockReturnValue([wish]),
          } as unknown as WishRepository);

          const query = mocked<GetPublicWishesQuery>(
            {} as unknown as GetPublicWishesQuery,
          );

          const handler = new GetPublicWishesHandler(wishRepository);

          // Act
          const outputWishes = await handler.execute(query);

          // Assert
          expect(outputWishes.length).toBe(1);
          expect(outputWishes[0].id).toBe(wish.id.getId);
        });
      });
    });
  });
});
