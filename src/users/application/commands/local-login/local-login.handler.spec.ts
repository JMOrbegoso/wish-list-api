import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { MockedObject } from 'ts-jest/dist/utils/testing';
import { LocalLoginCommand, LocalLoginHandler } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import { User } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';
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
        const command = new LocalLoginCommand(
          'john_doe',
          'password',
          '192.168.1.1',
        );

        it('should throw InvalidIpAddressError', () => {
          // Arrange
          const command = new LocalLoginCommand('john_doe', 'password', null);

          const userRepository = {
            getOneByUsername: jest.fn().mockReturnValue(null),
          } as MockedObject<UserRepository>;

          const unitOfWork = {} as MockedObject<UnitOfWork>;

          const encryptionService = {} as MockedObject<EncryptionService>;
          const tokenService = {} as MockedObject<TokenService>;
          const uniqueIdGeneratorService =
            {} as MockedObject<UniqueIdGeneratorService>;
          const handler = new LocalLoginHandler(
            userRepository,
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

        it('should throw NotFoundException', () => {
          // Arrange
          const userRepository = {
            getOneByUsername: jest.fn().mockReturnValue(null),
          } as MockedObject<UserRepository>;

          const unitOfWork = {} as MockedObject<UnitOfWork>;

          const encryptionService = {} as MockedObject<EncryptionService>;
          const tokenService = {} as MockedObject<TokenService>;
          const uniqueIdGeneratorService =
            {} as MockedObject<UniqueIdGeneratorService>;
          const handler = new LocalLoginHandler(
            userRepository,
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

        it('should throw UnauthorizedException because passwords do not match', () => {
          // Arrange
          const user = {
            passwordHash: {
              getPasswordHash: 'password-hash',
            },
          } as MockedObject<User>;

          const userRepository = {
            getOneByUsername: jest.fn().mockReturnValue(user),
          } as MockedObject<UserRepository>;

          const unitOfWork = {} as MockedObject<UnitOfWork>;

          const encryptionService = {
            passwordMatch: jest.fn().mockReturnValue(false),
          } as MockedObject<EncryptionService>;

          const tokenService = {} as MockedObject<TokenService>;
          const uniqueIdGeneratorService =
            {} as MockedObject<UniqueIdGeneratorService>;
          const handler = new LocalLoginHandler(
            userRepository,
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

        it('should throw UnauthorizedException because the user is deleted', () => {
          // Arrange
          const user = {
            isDeleted: true,
            passwordHash: {
              getPasswordHash: 'password-hash',
            },
          } as MockedObject<User>;

          const userRepository = {
            getOneByUsername: jest.fn().mockReturnValue(user),
          } as MockedObject<UserRepository>;

          const unitOfWork = {} as MockedObject<UnitOfWork>;

          const encryptionService = {
            passwordMatch: jest.fn().mockReturnValue(true),
          } as MockedObject<EncryptionService>;

          const tokenService = {} as MockedObject<TokenService>;
          const uniqueIdGeneratorService =
            {} as MockedObject<UniqueIdGeneratorService>;
          const handler = new LocalLoginHandler(
            userRepository,
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

        it('should throw UnauthorizedException because the user is blocked', () => {
          // Arrange
          const user = {
            isDeleted: false,
            isBlocked: true,
            passwordHash: {
              getPasswordHash: 'password-hash',
            },
          } as MockedObject<User>;

          const userRepository = {
            getOneByUsername: jest.fn().mockReturnValue(user),
          } as MockedObject<UserRepository>;

          const unitOfWork = {} as MockedObject<UnitOfWork>;

          const encryptionService = {
            passwordMatch: jest.fn().mockReturnValue(true),
          } as MockedObject<EncryptionService>;

          const tokenService = {} as MockedObject<TokenService>;
          const uniqueIdGeneratorService =
            {} as MockedObject<UniqueIdGeneratorService>;
          const handler = new LocalLoginHandler(
            userRepository,
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

        it('should throw UnauthorizedException because the user is not verified', () => {
          // Arrange
          const user = {
            isDeleted: false,
            isBlocked: false,
            isVerified: false,
            passwordHash: {
              getPasswordHash: 'password-hash',
            },
          } as MockedObject<User>;

          const userRepository = {
            getOneByUsername: jest.fn().mockReturnValue(user),
          } as MockedObject<UserRepository>;

          const unitOfWork = {} as MockedObject<UnitOfWork>;

          const encryptionService = {
            passwordMatch: jest.fn().mockReturnValue(true),
          } as MockedObject<EncryptionService>;

          const tokenService = {} as MockedObject<TokenService>;
          const uniqueIdGeneratorService =
            {} as MockedObject<UniqueIdGeneratorService>;
          const handler = new LocalLoginHandler(
            userRepository,
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

        it('should return the auth tokens', async () => {
          // Arrange
          const user = {
            isDeleted: false,
            isBlocked: false,
            isVerified: true,
            passwordHash: {
              getPasswordHash: 'password-hash',
            },
            id: {
              value: 'id-0',
            },
            email: {
              getEmail: 'email0@email.com',
            },
            username: {
              getUsername: 'John_Doe_0',
            },
            firstName: {
              getFirstName: 'FirstName0',
            },
            lastName: {
              getLastName: 'LastName0',
            },
            birthday: {
              getIso8601: '1',
            },
            createdAt: {
              getIso8601: '2',
            },
            updatedAt: {
              getIso8601: '3',
            },
            biography: {
              getBiography: 'A nice person 0.',
            },
            profilePicture: {
              getUrl: 'https://www.example.com/0.jpg',
            },
            addRefreshToken: jest.fn(),
          } as MockedObject<User>;

          const userRepository = {
            getOneByUsername: jest.fn().mockReturnValue(user),
            addRefreshToken: jest.fn(),
          } as MockedObject<UserRepository>;

          const unitOfWork = {
            commitChanges: jest.fn(),
          } as MockedObject<UnitOfWork>;

          const encryptionService = {
            passwordMatch: jest.fn().mockReturnValue(true),
          } as MockedObject<EncryptionService>;

          const accessToken = 'access-token';
          const tokenService = {
            signPayload: jest.fn().mockReturnValue(accessToken),
          } as MockedObject<TokenService>;

          const refreshTokenId = 'refresh-token-id';
          const uniqueIdGeneratorService = {
            generateId: jest.fn().mockReturnValue(refreshTokenId),
          } as MockedObject<UniqueIdGeneratorService>;

          const handler = new LocalLoginHandler(
            userRepository,
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
          expect(user.addRefreshToken.mock.calls).toHaveLength(1);

          expect(userRepository.addRefreshToken.mock.calls).toHaveLength(1);
          expect(unitOfWork.commitChanges.mock.calls).toHaveLength(1);

          expect(authTokens.access_token).toBe(accessToken);
          expect(authTokens.refresh_token).toBe(refreshTokenId);
        });
      });
    });
  });
});
