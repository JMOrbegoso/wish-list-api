import { MockedObject } from 'ts-jest/dist/utils/testing';
import { GetWishesHandler, GetWishesQuery } from '..';
import { Wish } from '../../../domain/entities';
import { WishRepository } from '../../../domain/repositories';
import { PrivacyLevel } from '../../../domain/value-objects';

const queries = [new GetWishesQuery()];

describe('wishes', () => {
  describe('application', () => {
    describe('queries', () => {
      describe('get-wishes', () => {
        test.each(queries)(
          'should return an empty wishes array',
          async (query: GetWishesQuery) => {
            // Arrange
            const wishRepository = {
              getAll: jest.fn().mockReturnValue([]),
            } as unknown as MockedObject<WishRepository>;

            const handler = new GetWishesHandler(wishRepository);

            // Act
            const outputWishes = await handler.execute(query);

            // Assert
            expect(outputWishes.length).toBe(0);
          },
        );

        test.each(queries)(
          'should return an array with one OutputWishDto',
          async (query: GetWishesQuery) => {
            // Arrange
            const wish = {
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
            } as unknown as MockedObject<Wish>;

            const wishRepository = {
              getAll: jest.fn().mockReturnValue([wish]),
            } as unknown as MockedObject<WishRepository>;

            const handler = new GetWishesHandler(wishRepository);

            // Act
            const outputWishes = await handler.execute(query);

            // Assert
            expect(outputWishes.length).toBe(1);
            expect(outputWishes[0].id).toBe(wish.id.getId);
          },
        );
      });
    });
  });
});
