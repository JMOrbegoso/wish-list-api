import { BadRequestException, NotFoundException } from '@nestjs/common';
import { mocked } from 'ts-jest/utils';
import { UpdateUserPasswordCommand, UpdateUserPasswordHandler } from '..';
import { UnitOfWork } from '../../../../core/domain/repositories';
import { User } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';
import { EncryptionService } from '../../services';

describe('users', () => {
  describe('application', () => {
    describe('commands', () => {
      describe('update-user-password', () => {
        test('should throw NotFoundException', () => {
          // Arrange
          const userRepository = mocked<UserRepository>({
            getOne: jest.fn().mockReturnValue(null),
          } as unknown as UserRepository);

          const unitOfWork = mocked<UnitOfWork>({
            userRepository: userRepository,
          } as unknown as UnitOfWork);

          const encryptionService = mocked<EncryptionService>(
            {} as unknown as EncryptionService,
          );

          const command = mocked<UpdateUserPasswordCommand>({
            id: 'id-0',
          } as unknown as UpdateUserPasswordCommand);

          const handler = new UpdateUserPasswordHandler(
            unitOfWork,
            userRepository,
            encryptionService,
          );

          // Act

          // Assert
          return expect(handler.execute(command)).rejects.toThrowError(
            NotFoundException,
          );
        });

        test('should throw BadRequestException because the user is deleted', () => {
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
            isDeleted: true,
          } as unknown as User);

          const userRepository = mocked<UserRepository>({
            getOne: jest.fn().mockReturnValue(user),
          } as unknown as UserRepository);

          const unitOfWork = mocked<UnitOfWork>({
            userRepository: userRepository,
          } as unknown as UnitOfWork);

          const encryptionService = mocked<EncryptionService>(
            {} as unknown as EncryptionService,
          );

          const command = mocked<UpdateUserPasswordCommand>({
            id: 'id-0',
          } as unknown as UpdateUserPasswordCommand);

          const handler = new UpdateUserPasswordHandler(
            unitOfWork,
            userRepository,
            encryptionService,
          );

          // Act

          // Assert
          return expect(handler.execute(command)).rejects.toThrowError(
            BadRequestException,
          );
        });

        test('should throw BadRequestException because the user is blocked', () => {
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
            isBlocked: true,
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

          const userRepository = mocked<UserRepository>({
            getOne: jest.fn().mockReturnValue(user),
          } as unknown as UserRepository);

          const unitOfWork = mocked<UnitOfWork>({
            userRepository: userRepository,
          } as unknown as UnitOfWork);

          const encryptionService = mocked<EncryptionService>(
            {} as unknown as EncryptionService,
          );

          const command = mocked<UpdateUserPasswordCommand>({
            id: 'id-0',
          } as unknown as UpdateUserPasswordCommand);

          const handler = new UpdateUserPasswordHandler(
            unitOfWork,
            userRepository,
            encryptionService,
          );

          // Act

          // Assert
          return expect(handler.execute(command)).rejects.toThrowError(
            BadRequestException,
          );
        });

        test('should throw BadRequestException because the user is not verified', () => {
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
            isVerified: false,
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
            deletedAt: null,
            isDeleted: false,
          } as unknown as User);

          const userRepository = mocked<UserRepository>({
            getOne: jest.fn().mockReturnValue(user),
          } as unknown as UserRepository);

          const unitOfWork = mocked<UnitOfWork>({
            userRepository: userRepository,
          } as unknown as UnitOfWork);

          const encryptionService = mocked<EncryptionService>(
            {} as unknown as EncryptionService,
          );

          const command = mocked<UpdateUserPasswordCommand>({
            id: 'id-0',
          } as unknown as UpdateUserPasswordCommand);

          const handler = new UpdateUserPasswordHandler(
            unitOfWork,
            userRepository,
            encryptionService,
          );

          // Act

          // Assert
          return expect(handler.execute(command)).rejects.toThrowError(
            BadRequestException,
          );
        });

        test('should call the method updatePasswordHash of the User, call the method hashPassword of the EncryptionService, call the update method of the UserRepository and the commitChanges method of the UnitOfWork', async () => {
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
            updatePasswordHash: jest.fn(),
          } as unknown as User);

          const userRepository = mocked<UserRepository>({
            getOne: jest.fn().mockReturnValue(user),
            update: jest.fn(),
          } as unknown as UserRepository);

          const unitOfWork = mocked<UnitOfWork>({
            userRepository: userRepository,
            commitChanges: jest.fn(),
          } as unknown as UnitOfWork);

          const encryptionService = mocked<EncryptionService>({
            hashPassword: jest.fn().mockReturnValue('password hashed'),
          } as unknown as EncryptionService);

          const command = mocked<UpdateUserPasswordCommand>({
            id: 'id-0',
            firstName: 'FirstName0',
            lastName: 'LastName0',
            birthday: 1,
            biography: 'A nice person 0.',
            profilePicture: 'https://www.example.com/0.jpg',
          } as unknown as UpdateUserPasswordCommand);

          const handler = new UpdateUserPasswordHandler(
            unitOfWork,
            userRepository,
            encryptionService,
          );

          // Act
          await handler.execute(command);

          // Assert
          expect(user.updatePasswordHash.mock.calls).toHaveLength(1);
          expect(encryptionService.hashPassword.mock.calls).toHaveLength(1);
          expect(userRepository.update.mock.calls).toHaveLength(1);
          expect(unitOfWork.commitChanges.mock.calls).toHaveLength(1);
        });
      });
    });
  });
});
