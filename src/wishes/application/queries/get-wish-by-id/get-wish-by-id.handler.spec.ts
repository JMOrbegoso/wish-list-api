import { NotFoundException } from '@nestjs/common';
import { mocked } from 'ts-jest/utils';
import { GetWishByIdHandler, GetWishByIdQuery } from '..';
import { Wish } from '../../../domain/entities';
import { WishRepository } from '../../../domain/repositories';
import { PrivacyLevel } from '../../../domain/value-objects';

describe('wishes', () => {
  describe('application', () => {
    describe('queries', () => {
      describe('get-wish-by-id', () => {
        test('should throw NotFoundException', async () => {
          // Arrange
          const wishRepository = mocked<WishRepository>({
            getOne: jest.fn().mockReturnValue(null),
          } as unknown as WishRepository);

          const query = mocked<GetWishByIdQuery>({
            id: 1,
          } as unknown as GetWishByIdQuery);

          const handler = new GetWishByIdHandler(wishRepository);

          // Act

          // Assert
          return expect(handler.execute(query)).rejects.toThrowError(
            NotFoundException,
          );
        });

        test('should return a single OutputWishDto', async () => {
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
            getOne: jest.fn().mockReturnValue(wish),
          } as unknown as WishRepository);

          const query = mocked<GetWishByIdQuery>({
            id: 1,
          } as unknown as GetWishByIdQuery);

          const handler = new GetWishByIdHandler(wishRepository);

          // Act
          const outputWish = await handler.execute(query);

          // Assert
          expect(outputWish.id).toBe(wish.id.getId);
        });
      });
    });
  });
});
