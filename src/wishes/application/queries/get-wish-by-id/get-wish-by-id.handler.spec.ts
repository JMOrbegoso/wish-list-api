import { NotFoundException } from '@nestjs/common';
import { mocked } from 'ts-jest/utils';
import { GetWishByIdHandler, GetWishByIdQuery } from '..';
import { Wish } from '../../../domain/entities';
import { WishRepository } from '../../../domain/repositories';
import { PrivacyLevel } from '../../../domain/value-objects';

const queries = [
  new GetWishByIdQuery('id-0'),
  new GetWishByIdQuery('id-1'),
  new GetWishByIdQuery('id-2'),
];

describe('wishes', () => {
  describe('application', () => {
    describe('queries', () => {
      describe('get-wish-by-id', () => {
        test.each(queries)(
          'should throw NotFoundException',
          async (query: GetWishByIdQuery) => {
            // Arrange
            const wishRepository = mocked<WishRepository>({
              getOne: jest.fn().mockReturnValue(null),
            } as unknown as WishRepository);

            const handler = new GetWishByIdHandler(wishRepository);

            // Act

            // Assert
            return expect(handler.execute(query)).rejects.toThrowError(
              NotFoundException,
            );
          },
        );

        test.each(queries)(
          'should return a single OutputWishDto',
          async (query: GetWishByIdQuery) => {
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

            const handler = new GetWishByIdHandler(wishRepository);

            // Act
            const outputWish = await handler.execute(query);

            // Assert
            expect(outputWish.id).toBe(wish.id.getId);
          },
        );
      });
    });
  });
});
