import { NotFoundException } from '@nestjs/common';
import { MockedObject } from 'ts-jest/dist/utils/testing';
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
            const wishRepository = {
              getOneById: jest.fn().mockReturnValue(null),
            } as MockedObject<WishRepository>;

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
              getOneById: jest.fn().mockReturnValue(wish),
            } as MockedObject<WishRepository>;

            const handler = new GetWishByIdHandler(wishRepository);

            // Act
            const outputWish = await handler.execute(query);

            // Assert
            expect(outputWish.id).toBe(wish.id.value);
          },
        );
      });
    });
  });
});
