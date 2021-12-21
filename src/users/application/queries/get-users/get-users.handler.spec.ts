import { MockedObject } from 'ts-jest/dist/utils/testing';
import { GetUsersHandler, GetUsersQuery } from '..';
import { User } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';

const queries = [new GetUsersQuery()];

describe('users', () => {
  describe('application', () => {
    describe('queries', () => {
      describe('get-users', () => {
        test.each(queries)(
          'should return an empty users array',
          async (query: GetUsersQuery) => {
            // Arrange
            const userRepository = {
              getAll: jest.fn().mockReturnValue([]),
            } as MockedObject<UserRepository>;

            const handler = new GetUsersHandler(userRepository);

            // Act
            const outputUsers = await handler.execute(query);

            // Assert
            expect(outputUsers.length).toBe(0);
          },
        );

        test.each(queries)(
          'should return an array with one OutputUserDto',
          async (query: GetUsersQuery) => {
            // Arrange
            const user = {
              id: {
                getId: 'id-0',
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
            } as MockedObject<User>;

            const userRepository = {
              getAll: jest.fn().mockReturnValue([user]),
            } as MockedObject<UserRepository>;

            const handler = new GetUsersHandler(userRepository);

            // Act
            const outputUsers = await handler.execute(query);

            // Assert
            expect(outputUsers.length).toBe(1);
          },
        );
      });
    });
  });
});
