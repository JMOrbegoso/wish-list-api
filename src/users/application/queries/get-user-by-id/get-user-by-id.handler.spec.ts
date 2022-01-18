import { NotFoundException } from '@nestjs/common';
import { MockedObject } from 'ts-jest/dist/utils/testing';
import { GetUserByIdHandler, GetUserByIdQuery } from '..';
import { User } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';

const queries = [
  new GetUserByIdQuery('id-0'),
  new GetUserByIdQuery('id-1'),
  new GetUserByIdQuery('id-2'),
];

describe('users', () => {
  describe('application', () => {
    describe('queries', () => {
      describe('get-user-by-id', () => {
        test.each(queries)(
          'should throw NotFoundException',
          (query: GetUserByIdQuery) => {
            // Arrange
            const userRepository = {
              getOneById: jest.fn().mockReturnValue(null),
            } as MockedObject<UserRepository>;

            const handler = new GetUserByIdHandler(userRepository);

            // Act

            // Assert
            return expect(handler.execute(query)).rejects.toThrowError(
              NotFoundException,
            );
          },
        );

        test.each(queries)(
          'should return OutputUserDto',
          async (query: GetUserByIdQuery) => {
            // Arrange
            const user = {
              id: {
                value: 'id-0',
              },
              email: {
                getEmail: 'email0@email.com',
              },
              username: {
                getUsername: 'John_Doe_0',
              },
              passwordHash: {
                getPasswordHash: 'hash0',
              },
              isVerified: true,
              isBlocked: false,
              firstName: {
                getFirstName: 'FirstName0',
              },
              lastName: {
                getLastName: 'LastName0',
              },
              birthday: {
                getIso8601: '1',
              },
              createdAt: {
                getIso8601: '2',
              },
              updatedAt: {
                getIso8601: '3',
              },
              biography: {
                getBiography: 'A nice person 0.',
              },
              profilePicture: {
                getUrl: 'https://www.example.com/0.jpg',
              },
              deletedAt: {
                getIso8601: '4',
              },
            } as MockedObject<User>;

            const userRepository = {
              getOneById: jest.fn().mockReturnValue(user),
            } as MockedObject<UserRepository>;

            const handler = new GetUserByIdHandler(userRepository);

            // Act
            const outputUserDto = await handler.execute(query);

            // Assert
            expect(outputUserDto.id).toBe(user.id.value);
          },
        );
      });
    });
  });
});
