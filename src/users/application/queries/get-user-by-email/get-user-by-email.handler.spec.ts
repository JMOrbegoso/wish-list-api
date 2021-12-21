import { NotFoundException } from '@nestjs/common';
import { MockedObject } from 'ts-jest/dist/utils/testing';
import { GetUserByEmailHandler, GetUserByEmailQuery } from '..';
import { User } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';

const queries = [
  new GetUserByEmailQuery('john@doe.com'),
  new GetUserByEmailQuery('john@doe.com'),
  new GetUserByEmailQuery('john@doe.com'),
];

describe('users', () => {
  describe('application', () => {
    describe('queries', () => {
      describe('get-user-by-email', () => {
        test.each(queries)(
          'should throw NotFoundException',
          (query: GetUserByEmailQuery) => {
            // Arrange
            const userRepository = {
              getOneByEmail: jest.fn().mockReturnValue(null),
            } as unknown as MockedObject<UserRepository>;

            const handler = new GetUserByEmailHandler(userRepository);

            // Act

            // Assert
            return expect(handler.execute(query)).rejects.toThrowError(
              NotFoundException,
            );
          },
        );

        test.each(queries)(
          'should return OutputUserDto',
          async (query: GetUserByEmailQuery) => {
            // Arrange
            const user = {
              id: {
                getId: 'id-0',
              },
              email: {
                getEmail: 'john@doe.com',
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
                getMilliseconds: 1,
              },
              createdAt: {
                getMilliseconds: 2,
              },
              updatedAt: {
                getMilliseconds: 3,
              },
              biography: {
                getBiography: 'A nice person 0.',
              },
              profilePicture: {
                getUrl: 'https://www.example.com/0.jpg',
              },
              deletedAt: {
                getMilliseconds: 4,
              },
            } as unknown as MockedObject<User>;

            const userRepository = {
              getOneByEmail: jest.fn().mockReturnValue(user),
            } as unknown as MockedObject<UserRepository>;

            const handler = new GetUserByEmailHandler(userRepository);

            // Act
            const outputUserDto = await handler.execute(query);

            // Assert
            expect(outputUserDto.id).toBe(user.id.getId);
          },
        );
      });
    });
  });
});
