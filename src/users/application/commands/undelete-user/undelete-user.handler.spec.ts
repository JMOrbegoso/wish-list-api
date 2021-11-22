import { mocked } from 'ts-jest/utils';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UnitOfWork } from '../../../../core/domain/repositories';
import { UserRepository } from '../../../../users/domain/repositories';
import { User } from '../../../../users/domain/entities';
import { UndeleteUserHandler, UndeleteUserCommand } from '..';

describe('users', () => {
  describe('application', () => {
    describe('commands', () => {
      describe('undelete-user', () => {
        test('should throw NotFoundException', () => {
          // Arrange
          const unitOfWork = mocked<UnitOfWork>({
            userRepository: {
              getOne: jest.fn().mockReturnValue(null),
            },
          } as unknown as UnitOfWork);

          const command = mocked<UndeleteUserCommand>({
            id: 'id-0',
          } as unknown as UndeleteUserCommand);

          const handler = new UndeleteUserHandler(unitOfWork);

          // Act

          // Assert
          return expect(handler.execute(command)).rejects.toThrowError(
            NotFoundException,
          );
        });

        test('should throw BadRequestException', () => {
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
            isBlocked: {
              getStatus: true,
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
            deletedAt: null,
            isDeleted: false,
          } as unknown as User);

          const unitOfWork = mocked<UnitOfWork>({
            userRepository: {
              getOne: jest.fn().mockReturnValue(user),
            },
          } as unknown as UnitOfWork);

          const command = mocked<UndeleteUserCommand>({
            id: 'id-0',
          } as unknown as UndeleteUserCommand);

          const handler = new UndeleteUserHandler(unitOfWork);

          // Act

          // Assert
          return expect(handler.execute(command)).rejects.toThrowError(
            BadRequestException,
          );
        });

        test('should call the method delete of the User, call the update method of the UserRepository and the commitChanges method of the UnitOfWork', async () => {
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
            isDeleted: true,
            undelete: jest.fn(),
          } as unknown as User);

          const userRepository = mocked<UserRepository>({
            getOne: jest.fn().mockReturnValue(user),
            update: jest.fn(),
          } as unknown as UserRepository);

          const unitOfWork = mocked<UnitOfWork>({
            userRepository: userRepository,
            commitChanges: jest.fn(),
          } as unknown as UnitOfWork);

          const command = mocked<UndeleteUserCommand>({
            id: 'id-0',
          } as unknown as UndeleteUserCommand);

          const handler = new UndeleteUserHandler(unitOfWork);

          // Act
          await handler.execute(command);

          // Assert
          expect(user.undelete.mock.calls).toHaveLength(1);
          expect(userRepository.update.mock.calls).toHaveLength(1);
          expect(unitOfWork.commitChanges.mock.calls).toHaveLength(1);
        });
      });
    });
  });
});
