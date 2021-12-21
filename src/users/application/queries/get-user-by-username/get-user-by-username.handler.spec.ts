import { NotFoundException } from '@nestjs/common';
import { MockedObject } from 'ts-jest/dist/utils/testing';
import { GetUserByUsernameHandler, GetUserByUsernameQuery } from '..';
import { User } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';

const queries = [
  new GetUserByUsernameQuery('john_doe'),
  new GetUserByUsernameQuery('john-doe'),
  new GetUserByUsernameQuery('johndoe'),
];

describe('users', () => {
  describe('application', () => {
    describe('queries', () => {
      describe('get-user-by-username', () => {
        test.each(queries)(
          'should throw NotFoundException',
          (query: GetUserByUsernameQuery) => {
            // Arrange
            const userRepository = {
              getOneByUsername: jest.fn().mockReturnValue(null),
            } as unknown as MockedObject<UserRepository>;

            const handler = new GetUserByUsernameHandler(userRepository);

            // Act

            // Assert
            return expect(handler.execute(query)).rejects.toThrowError(
              NotFoundException,
            );
          },
        );

        test.each(queries)(
          'should return OutputUserDto',
          async (query: GetUserByUsernameQuery) => {
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
              getOneByUsername: jest.fn().mockReturnValue(user),
            } as unknown as MockedObject<UserRepository>;

            const handler = new GetUserByUsernameHandler(userRepository);

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
