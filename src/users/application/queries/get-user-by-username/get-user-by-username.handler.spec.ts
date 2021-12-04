import { NotFoundException } from '@nestjs/common';
import { mocked } from 'ts-jest/utils';
import { GetUserByUsernameHandler, GetUserByUsernameQuery } from '..';
import { User } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';

describe('users', () => {
  describe('application', () => {
    describe('queries', () => {
      describe('get-user-by-username', () => {
        test('should throw NotFoundException', () => {
          // Arrange
          const userRepository = mocked<UserRepository>({
            getOneByUsername: jest.fn().mockReturnValue(null),
          } as unknown as UserRepository);

          const query = mocked<GetUserByUsernameQuery>({
            username: 'JohnDoe',
          } as unknown as GetUserByUsernameQuery);

          const handler = new GetUserByUsernameHandler(userRepository);

          // Act

          // Assert
          return expect(handler.execute(query)).rejects.toThrowError(
            NotFoundException,
          );
        });

        test('should return OutputUserDto', async () => {
          // Arrange
          const user = mocked<User>({
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
          } as unknown as User);

          const userRepository = mocked<UserRepository>({
            getOneByUsername: jest.fn().mockReturnValue(user),
          } as unknown as UserRepository);

          const query = mocked<GetUserByUsernameQuery>({
            username: 'JohnDoe',
          } as unknown as GetUserByUsernameQuery);

          const handler = new GetUserByUsernameHandler(userRepository);

          // Act
          const outputUserDto = await handler.execute(query);

          // Assert
          expect(outputUserDto.id).toBe(user.id.getId);
        });
      });
    });
  });
});
