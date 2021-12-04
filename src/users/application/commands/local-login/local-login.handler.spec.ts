import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { mocked } from 'ts-jest/utils';
import { LocalLoginCommand, LocalLoginHandler } from '..';
import { UnitOfWork } from '../../../../core/domain/repositories';
import { UniqueId } from '../../../../core/domain/value-objects';
import { User } from '../../../domain/entities';
import {
  RefreshTokenRepository,
  UserRepository,
} from '../../../domain/repositories';
import { InvalidIpAddressError } from '../../../domain/value-objects';
import {
  EncryptionService,
  TokenService,
  UniqueIdGeneratorService,
} from '../../services';

describe('users', () => {
  describe('application', () => {
    describe('commands', () => {
      describe('local-login', () => {
        test('should throw NotFoundException', () => {
          // Arrange
          const userRepository = mocked<UserRepository>({
            getOneByUsername: jest.fn().mockReturnValue(null),
          } as unknown as UserRepository);

          const refreshTokenRepository = mocked<RefreshTokenRepository>(
            {} as unknown as RefreshTokenRepository,
          );

          const unitOfWork = mocked<UnitOfWork>({} as unknown as UnitOfWork);

          const encryptionService = mocked<EncryptionService>(
            {} as unknown as EncryptionService,
          );

          const tokenService = mocked<TokenService>(
            {} as unknown as TokenService,
          );

          const uniqueIdGeneratorService = mocked<UniqueIdGeneratorService>(
            {} as unknown as UniqueIdGeneratorService,
          );

          const command = mocked<LocalLoginCommand>({
            username: 'john_doe',
          } as unknown as LocalLoginCommand);

          const handler = new LocalLoginHandler(
            userRepository,
            refreshTokenRepository,
            unitOfWork,
            encryptionService,
            tokenService,
            uniqueIdGeneratorService,
          );

          // Act

          // Assert
          return expect(handler.execute(command)).rejects.toThrowError(
            InvalidIpAddressError,
          );
        });

        test('should throw NotFoundException', () => {
          // Arrange
          const userRepository = mocked<UserRepository>({
            getOneByUsername: jest.fn().mockReturnValue(null),
          } as unknown as UserRepository);

          const refreshTokenRepository = mocked<RefreshTokenRepository>(
            {} as unknown as RefreshTokenRepository,
          );

          const unitOfWork = mocked<UnitOfWork>({} as unknown as UnitOfWork);

          const encryptionService = mocked<EncryptionService>(
            {} as unknown as EncryptionService,
          );

          const tokenService = mocked<TokenService>(
            {} as unknown as TokenService,
          );

          const uniqueIdGeneratorService = mocked<UniqueIdGeneratorService>(
            {} as unknown as UniqueIdGeneratorService,
          );

          const command = mocked<LocalLoginCommand>({
            username: 'john_doe',
            ipAddress: '192.168.1.1',
          } as unknown as LocalLoginCommand);

          const handler = new LocalLoginHandler(
            userRepository,
            refreshTokenRepository,
            unitOfWork,
            encryptionService,
            tokenService,
            uniqueIdGeneratorService,
          );

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

          const userRepository = mocked<UserRepository>({
            getOneByUsername: jest.fn().mockReturnValue(user),
          } as unknown as UserRepository);

          const refreshTokenRepository = mocked<RefreshTokenRepository>(
            {} as unknown as RefreshTokenRepository,
          );

          const unitOfWork = mocked<UnitOfWork>({} as unknown as UnitOfWork);

          const encryptionService = mocked<EncryptionService>({
            passwordMatch: jest.fn().mockReturnValue(false),
          } as unknown as EncryptionService);

          const tokenService = mocked<TokenService>(
            {} as unknown as TokenService,
          );

          const uniqueIdGeneratorService = mocked<UniqueIdGeneratorService>(
            {} as unknown as UniqueIdGeneratorService,
          );

          const command = mocked<LocalLoginCommand>({
            username: 'john_doe',
            ipAddress: '192.168.1.1',
          } as unknown as LocalLoginCommand);

          const handler = new LocalLoginHandler(
            userRepository,
            refreshTokenRepository,
            unitOfWork,
            encryptionService,
            tokenService,
            uniqueIdGeneratorService,
          );

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

          const userRepository = mocked<UserRepository>({
            getOneByUsername: jest.fn().mockReturnValue(user),
          } as unknown as UserRepository);

          const refreshTokenRepository = mocked<RefreshTokenRepository>(
            {} as unknown as RefreshTokenRepository,
          );

          const unitOfWork = mocked<UnitOfWork>({} as unknown as UnitOfWork);

          const encryptionService = mocked<EncryptionService>({
            passwordMatch: jest.fn().mockReturnValue(true),
          } as unknown as EncryptionService);

          const tokenService = mocked<TokenService>(
            {} as unknown as TokenService,
          );

          const uniqueIdGeneratorService = mocked<UniqueIdGeneratorService>(
            {} as unknown as UniqueIdGeneratorService,
          );

          const command = mocked<LocalLoginCommand>({
            username: 'john_doe',
            ipAddress: '192.168.1.1',
          } as unknown as LocalLoginCommand);

          const handler = new LocalLoginHandler(
            userRepository,
            refreshTokenRepository,
            unitOfWork,
            encryptionService,
            tokenService,
            uniqueIdGeneratorService,
          );

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

          const userRepository = mocked<UserRepository>({
            getOneByUsername: jest.fn().mockReturnValue(user),
          } as unknown as UserRepository);

          const refreshTokenRepository = mocked<RefreshTokenRepository>(
            {} as unknown as RefreshTokenRepository,
          );

          const unitOfWork = mocked<UnitOfWork>({} as unknown as UnitOfWork);

          const encryptionService = mocked<EncryptionService>({
            passwordMatch: jest.fn().mockReturnValue(true),
          } as unknown as EncryptionService);

          const tokenService = mocked<TokenService>(
            {} as unknown as TokenService,
          );

          const uniqueIdGeneratorService = mocked<UniqueIdGeneratorService>(
            {} as unknown as UniqueIdGeneratorService,
          );

          const command = mocked<LocalLoginCommand>({
            username: 'john_doe',
            ipAddress: '192.168.1.1',
          } as unknown as LocalLoginCommand);

          const handler = new LocalLoginHandler(
            userRepository,
            refreshTokenRepository,
            unitOfWork,
            encryptionService,
            tokenService,
            uniqueIdGeneratorService,
          );

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

          const userRepository = mocked<UserRepository>({
            getOneByUsername: jest.fn().mockReturnValue(user),
          } as unknown as UserRepository);

          const refreshTokenRepository = mocked<RefreshTokenRepository>(
            {} as unknown as RefreshTokenRepository,
          );

          const unitOfWork = mocked<UnitOfWork>({} as unknown as UnitOfWork);

          const encryptionService = mocked<EncryptionService>({
            passwordMatch: jest.fn().mockReturnValue(true),
          } as unknown as EncryptionService);

          const tokenService = mocked<TokenService>(
            {} as unknown as TokenService,
          );

          const uniqueIdGeneratorService = mocked<UniqueIdGeneratorService>(
            {} as unknown as UniqueIdGeneratorService,
          );

          const command = mocked<LocalLoginCommand>({
            username: 'john_doe',
            ipAddress: '192.168.1.1',
          } as unknown as LocalLoginCommand);

          const handler = new LocalLoginHandler(
            userRepository,
            refreshTokenRepository,
            unitOfWork,
            encryptionService,
            tokenService,
            uniqueIdGeneratorService,
          );

          // Act

          // Assert
          return expect(handler.execute(command)).rejects.toThrowError(
            UnauthorizedException,
          );
        });

        test('should return the auth tokens', async () => {
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

          const userRepository = mocked<UserRepository>({
            getOneByUsername: jest.fn().mockReturnValue(user),
          } as unknown as UserRepository);

          const refreshTokenRepository = mocked<RefreshTokenRepository>({
            add: jest.fn(),
          } as unknown as RefreshTokenRepository);

          const unitOfWork = mocked<UnitOfWork>({
            commitChanges: jest.fn(),
          } as unknown as UnitOfWork);

          const encryptionService = mocked<EncryptionService>({
            passwordMatch: jest.fn().mockReturnValue(true),
          } as unknown as EncryptionService);

          const tokenService = mocked<TokenService>({
            signPayload: jest.fn().mockReturnValue('access-token'),
          } as unknown as TokenService);

          const uniqueId = mocked<UniqueId>({
            getId: 'id-0',
          } as unknown as UniqueId);

          const uniqueIdGeneratorService = mocked<UniqueIdGeneratorService>({
            generateId: jest.fn().mockRejectedValue(uniqueId),
          } as unknown as UniqueIdGeneratorService);

          const command = mocked<LocalLoginCommand>({
            username: 'john_doe',
            ipAddress: '192.168.1.1',
          } as unknown as LocalLoginCommand);

          const handler = new LocalLoginHandler(
            userRepository,
            refreshTokenRepository,
            unitOfWork,
            encryptionService,
            tokenService,
            uniqueIdGeneratorService,
          );

          // Act
          const authTokens = await handler.execute(command);

          // Assert
          expect(tokenService.signPayload.mock.calls).toHaveLength(1);
          expect(uniqueIdGeneratorService.generateId.mock.calls).toHaveLength(
            1,
          );
          expect(refreshTokenRepository.add.mock.calls).toHaveLength(1);
          expect(unitOfWork.commitChanges.mock.calls).toHaveLength(1);

          expect(authTokens.access_token).toBe('access-token');
          expect(authTokens.refresh_token).not.toBeNull();
        });
      });
    });
  });
});
