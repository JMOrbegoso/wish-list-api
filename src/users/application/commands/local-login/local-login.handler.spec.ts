import { mocked } from 'ts-jest/utils';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UnitOfWork } from '../../../../core/domain/repositories';
import { User } from '../../../domain/entities';
import { EncryptionService } from '../../services';
import { LocalLoginHandler, LocalLoginCommand } from '..';

describe('users', () => {
  describe('application', () => {
    describe('commands', () => {
      describe('local-login', () => {
        test('should throw NotFoundException', () => {
          // Arrange
          const unitOfWork = mocked<UnitOfWork>({
            userRepository: {
              getOneByUsername: jest.fn().mockReturnValue(null),
            },
          } as unknown as UnitOfWork);

          const encryptionService = mocked<EncryptionService>(
            {} as unknown as EncryptionService,
          );

          const command = mocked<LocalLoginCommand>({
            username: 'john_doe',
          } as unknown as LocalLoginCommand);

          const handler = new LocalLoginHandler(unitOfWork, encryptionService);

          // Act

          // Assert
          return expect(handler.execute(command)).rejects.toThrowError(
            NotFoundException,
          );
        });

        test('should throw UnauthorizedException because passwords do not match', () => {
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
            deletedAt: null,
          } as unknown as User);

          const unitOfWork = mocked<UnitOfWork>({
            userRepository: {
              getOneByUsername: jest.fn().mockReturnValue(user),
            },
          } as unknown as UnitOfWork);

          const encryptionService = mocked<EncryptionService>({
            passwordMatch: jest.fn().mockReturnValue(false),
          } as unknown as EncryptionService);

          const command = mocked<LocalLoginCommand>({
            username: 'john_doe',
          } as unknown as LocalLoginCommand);

          const handler = new LocalLoginHandler(unitOfWork, encryptionService);

          // Act

          // Assert
          return expect(handler.execute(command)).rejects.toThrowError(
            UnauthorizedException,
          );
        });

        test('should throw UnauthorizedException because the user is deleted', () => {
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

          const unitOfWork = mocked<UnitOfWork>({
            userRepository: {
              getOneByUsername: jest.fn().mockReturnValue(user),
            },
          } as unknown as UnitOfWork);

          const encryptionService = mocked<EncryptionService>({
            passwordMatch: jest.fn().mockReturnValue(true),
          } as unknown as EncryptionService);

          const command = mocked<LocalLoginCommand>({
            username: 'john_doe',
          } as unknown as LocalLoginCommand);

          const handler = new LocalLoginHandler(unitOfWork, encryptionService);

          // Act

          // Assert
          return expect(handler.execute(command)).rejects.toThrowError(
            UnauthorizedException,
          );
        });

        test('should throw UnauthorizedException because the user is blocked', () => {
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

          const unitOfWork = mocked<UnitOfWork>({
            userRepository: {
              getOneByUsername: jest.fn().mockReturnValue(user),
            },
          } as unknown as UnitOfWork);

          const encryptionService = mocked<EncryptionService>({
            passwordMatch: jest.fn().mockReturnValue(true),
          } as unknown as EncryptionService);

          const command = mocked<LocalLoginCommand>({
            username: 'john_doe',
          } as unknown as LocalLoginCommand);

          const handler = new LocalLoginHandler(unitOfWork, encryptionService);

          // Act

          // Assert
          return expect(handler.execute(command)).rejects.toThrowError(
            UnauthorizedException,
          );
        });

        test('should throw UnauthorizedException because the user is not verified', () => {
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

          const unitOfWork = mocked<UnitOfWork>({
            userRepository: {
              getOneByUsername: jest.fn().mockReturnValue(user),
            },
          } as unknown as UnitOfWork);

          const encryptionService = mocked<EncryptionService>({
            passwordMatch: jest.fn().mockReturnValue(true),
          } as unknown as EncryptionService);

          const command = mocked<LocalLoginCommand>({
            username: 'john_doe',
          } as unknown as LocalLoginCommand);

          const handler = new LocalLoginHandler(unitOfWork, encryptionService);

          // Act

          // Assert
          return expect(handler.execute(command)).rejects.toThrowError(
            UnauthorizedException,
          );
        });

        test('should return the user', async () => {
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
            deletedAt: null,
            isDeleted: false,
          } as unknown as User);

          const unitOfWork = mocked<UnitOfWork>({
            userRepository: {
              getOneByUsername: jest.fn().mockReturnValue(user),
            },
          } as unknown as UnitOfWork);

          const encryptionService = mocked<EncryptionService>({
            passwordMatch: jest.fn().mockReturnValue(true),
          } as unknown as EncryptionService);

          const command = mocked<LocalLoginCommand>({
            username: 'john_doe',
          } as unknown as LocalLoginCommand);

          const handler = new LocalLoginHandler(unitOfWork, encryptionService);

          // Act
          const outputUserDto = await handler.execute(command);

          // Assert
          expect(outputUserDto.id).toBe(user.id.getId);
        });
      });
    });
  });
});
