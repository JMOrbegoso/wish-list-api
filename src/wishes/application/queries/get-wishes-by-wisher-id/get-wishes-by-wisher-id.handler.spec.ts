import { MockedObject } from 'ts-jest/dist/utils/testing';
import { GetWishesByWisherIdHandler, GetWishesByWisherIdQuery } from '..';
import { Wish } from '../../../domain/entities';
import { WishRepository } from '../../../domain/repositories';
import { PrivacyLevel } from '../../../domain/value-objects';

const queries = [
  new GetWishesByWisherIdQuery('id-0'),
  new GetWishesByWisherIdQuery('id-1'),
  new GetWishesByWisherIdQuery('id-2'),
];

describe('wishes', () => {
  describe('application', () => {
    describe('queries', () => {
      describe('get-wishes-by-wisher-id', () => {
        test.each(queries)(
          'should return an empty wishes array',
          async (query: GetWishesByWisherIdQuery) => {
            // Arrange
            const wishRepository = {
              getAllWishesByWisher: jest.fn().mockReturnValue([]),
            } as MockedObject<WishRepository>;

            const handler = new GetWishesByWisherIdHandler(wishRepository);

            // Act
            const outputWishes = await handler.execute(query);

            // Assert
            expect(outputWishes.length).toBe(0);
          },
        );

        test.each(queries)(
          'should return an array with one OutputWishDto',
          async (query: GetWishesByWisherIdQuery) => {
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
            } as MockedObject<Wish>;

            const wishRepository = {
              getAllWishesByWisher: jest.fn().mockReturnValue([wish]),
            } as MockedObject<WishRepository>;

            const handler = new GetWishesByWisherIdHandler(wishRepository);

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
