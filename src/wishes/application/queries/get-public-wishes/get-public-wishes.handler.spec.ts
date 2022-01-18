import { MockedObject } from 'ts-jest/dist/utils/testing';
import { GetPublicWishesHandler, GetPublicWishesQuery } from '..';
import { Wish } from '../../../domain/entities';
import { WishRepository } from '../../../domain/repositories';
import { PrivacyLevel } from '../../../domain/value-objects';

const queries = [new GetPublicWishesQuery()];

describe('wishes', () => {
  describe('application', () => {
    describe('queries', () => {
      describe('get-public-wishes', () => {
        test.each(queries)(
          'should return an empty wishes array',
          async (query: GetPublicWishesQuery) => {
            // Arrange
            const wishRepository = {
              getAllPublicWishes: jest.fn().mockReturnValue([]),
            } as MockedObject<WishRepository>;

            const handler = new GetPublicWishesHandler(wishRepository);

            // Act
            const outputWishes = await handler.execute(query);

            // Assert
            expect(outputWishes.length).toBe(0);
          },
        );

        test.each(queries)(
          'should return an array with one OutputWishDto',
          async (query: GetPublicWishesQuery) => {
            // Arrange
            const wish = {
              id: {
                value: 'id 0',
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
                getIso8601: '2',
              },
              updatedAt: {
                getIso8601: '2',
              },
              wisher: {
                id: {
                  value: 'wisher id 0',
                },
              },
              urls: [],
              imageUrls: [],
              categories: [],
              stages: [],
              deletedAt: {
                getIso8601: '2',
              },
              completedAt: {
                getIso8601: '2',
              },
            } as MockedObject<Wish>;

            const wishRepository = {
              getAllPublicWishes: jest.fn().mockReturnValue([wish]),
            } as MockedObject<WishRepository>;

            const handler = new GetPublicWishesHandler(wishRepository);

            // Act
            const outputWishes = await handler.execute(query);

            // Assert
            expect(outputWishes.length).toBe(1);
            expect(outputWishes[0].id).toBe(wish.id.value);
          },
        );
      });
    });
  });
});
