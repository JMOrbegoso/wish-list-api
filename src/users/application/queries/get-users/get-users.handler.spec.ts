import { mocked } from 'ts-jest/utils';
import { UnitOfWork } from '../../../../core/domain/repositories';
import { User } from '../../../../users/domain/entities';
import { GetUsersHandler, GetUsersQuery } from '..';

describe('users', () => {
  describe('application', () => {
    describe('queries', () => {
      describe('get-users', () => {
        test('should return an empty users array', async () => {
          // Arrange
          const unitOfWork = mocked<UnitOfWork>({
            userRepository: {
              getAll: jest.fn().mockReturnValue([]),
            },
          } as unknown as UnitOfWork);

          const query = mocked<GetUsersQuery>({
            id: 1,
          } as unknown as GetUsersQuery);

          const handler = new GetUsersHandler(unitOfWork);

          // Act
          const outputUsers = await handler.execute(query);

          // Assert
          expect(outputUsers.length).toBe(0);
        });

        test('should return an array with one OutputUserDto', async () => {
          // Arrange
          const user = mocked<User>({
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
          } as unknown as User);

          const unitOfWork = mocked<UnitOfWork>({
            userRepository: {
              getAll: jest.fn().mockReturnValue([user]),
            },
          } as unknown as UnitOfWork);

          const query = mocked<GetUsersQuery>({
            id: 1,
          } as unknown as GetUsersQuery);

          const handler = new GetUsersHandler(unitOfWork);

          // Act
          const outputUsers = await handler.execute(query);

          // Assert
          expect(outputUsers.length).toBe(1);
        });
      });
    });
  });
});
