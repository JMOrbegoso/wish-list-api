import { mocked } from 'ts-jest/utils';
import { NotFoundException } from '@nestjs/common';
import { UnitOfWork } from '../../../../core/domain/repositories';
import { User } from '../../../../users/domain/entities';
import { GetUserByIdHandler, GetUserByIdQuery } from '..';

describe('users', () => {
  describe('application', () => {
    describe('queries', () => {
      describe('get-user-by-id', () => {
        test('should throw NotFoundException', () => {
          // Arrange
          const unitOfWork = mocked<UnitOfWork>({
            userRepository: {
              getOne: jest.fn().mockReturnValue(null),
            },
          } as unknown as UnitOfWork);

          const query = mocked<GetUserByIdQuery>({
            id: 1,
          } as unknown as GetUserByIdQuery);

          const handler = new GetUserByIdHandler(unitOfWork);

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
              getEmail: 'email0@email.com',
            },
            userName: {
              getUsername: 'UserName0',
            },
            passwordHash: {
              getPasswordHash: 'hash0',
            },
            isVerified: {
              getStatus: true,
            },
            isBlocked: {
              getStatus: false,
            },
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
              getOne: jest.fn().mockReturnValue(user),
            },
          } as unknown as UnitOfWork);

          const query = mocked<GetUserByIdQuery>({
            id: 1,
          } as unknown as GetUserByIdQuery);

          const handler = new GetUserByIdHandler(unitOfWork);

          // Act
          const outputUserDto = await handler.execute(query);

          // Assert
          expect(outputUserDto.id).toBe(user.id.getId);
        });
      });
    });
  });
});
