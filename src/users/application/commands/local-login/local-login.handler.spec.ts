import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { MockedObject } from 'ts-jest/dist/utils/testing';
import { LocalLoginCommand, LocalLoginHandler } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import { UniqueId } from '../../../../shared/domain/value-objects';
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

const commands = [
  new LocalLoginCommand('john_doe', 'password', '192.168.1.1'),
  new LocalLoginCommand('john_doe', 'password', '192.168.1.2'),
  new LocalLoginCommand('john_doe', 'password', '192.168.0.1'),
];

describe('users', () => {
  describe('application', () => {
    describe('commands', () => {
      describe('local-login', () => {
        test.each(commands)(
          'should throw InvalidIpAddressError',
          (command: LocalLoginCommand) => {
            // Arrange
            command = new LocalLoginCommand('john_doe', 'password', null);

            const userRepository = {
              getOneByUsername: jest.fn().mockReturnValue(null),
            } as MockedObject<UserRepository>;

            const refreshTokenRepository =
              {} as MockedObject<RefreshTokenRepository>;

            const unitOfWork = {} as MockedObject<UnitOfWork>;

            const encryptionService = {} as MockedObject<EncryptionService>;
            const tokenService = {} as MockedObject<TokenService>;
            const uniqueIdGeneratorService =
              {} as MockedObject<UniqueIdGeneratorService>;
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
          },
        );

        test.each(commands)(
          'should throw NotFoundException',
          (command: LocalLoginCommand) => {
            // Arrange
            const userRepository = {
              getOneByUsername: jest.fn().mockReturnValue(null),
            } as MockedObject<UserRepository>;

            const refreshTokenRepository =
              {} as MockedObject<RefreshTokenRepository>;
            const unitOfWork = {} as MockedObject<UnitOfWork>;

            const encryptionService = {} as MockedObject<EncryptionService>;
            const tokenService = {} as MockedObject<TokenService>;
            const uniqueIdGeneratorService =
              {} as MockedObject<UniqueIdGeneratorService>;
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
          },
        );

        test.each(commands)(
          'should throw UnauthorizedException because passwords do not match',
          (command: LocalLoginCommand) => {
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
              deletedAt: null,
            } as MockedObject<User>;

            const userRepository = {
              getOneByUsername: jest.fn().mockReturnValue(user),
            } as MockedObject<UserRepository>;

            const refreshTokenRepository =
              {} as MockedObject<RefreshTokenRepository>;
            const unitOfWork = {} as MockedObject<UnitOfWork>;

            const encryptionService = {
              passwordMatch: jest.fn().mockReturnValue(false),
            } as MockedObject<EncryptionService>;

            const tokenService = {} as MockedObject<TokenService>;
            const uniqueIdGeneratorService =
              {} as MockedObject<UniqueIdGeneratorService>;
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
          },
        );

        test.each(commands)(
          'should throw UnauthorizedException because the user is deleted',
          (command: LocalLoginCommand) => {
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
              isDeleted: true,
            } as MockedObject<User>;

            const userRepository = {
              getOneByUsername: jest.fn().mockReturnValue(user),
            } as MockedObject<UserRepository>;

            const refreshTokenRepository =
              {} as MockedObject<RefreshTokenRepository>;
            const unitOfWork = {} as MockedObject<UnitOfWork>;

            const encryptionService = {
              passwordMatch: jest.fn().mockReturnValue(true),
            } as MockedObject<EncryptionService>;

            const tokenService = {} as MockedObject<TokenService>;
            const uniqueIdGeneratorService =
              {} as MockedObject<UniqueIdGeneratorService>;
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
          },
        );

        test.each(commands)(
          'should throw UnauthorizedException because the user is blocked',
          (command: LocalLoginCommand) => {
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
            } as MockedObject<User>;

            const userRepository = {
              getOneByUsername: jest.fn().mockReturnValue(user),
            } as MockedObject<UserRepository>;

            const refreshTokenRepository =
              {} as MockedObject<RefreshTokenRepository>;
            const unitOfWork = {} as MockedObject<UnitOfWork>;

            const encryptionService = {
              passwordMatch: jest.fn().mockReturnValue(true),
            } as MockedObject<EncryptionService>;

            const tokenService = {} as MockedObject<TokenService>;
            const uniqueIdGeneratorService =
              {} as MockedObject<UniqueIdGeneratorService>;
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
          },
        );

        test.each(commands)(
          'should throw UnauthorizedException because the user is not verified',
          (command: LocalLoginCommand) => {
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
            } as MockedObject<User>;

            const userRepository = {
              getOneByUsername: jest.fn().mockReturnValue(user),
            } as MockedObject<UserRepository>;

            const refreshTokenRepository =
              {} as MockedObject<RefreshTokenRepository>;
            const unitOfWork = {} as MockedObject<UnitOfWork>;

            const encryptionService = {
              passwordMatch: jest.fn().mockReturnValue(true),
            } as MockedObject<EncryptionService>;

            const tokenService = {} as MockedObject<TokenService>;
            const uniqueIdGeneratorService =
              {} as MockedObject<UniqueIdGeneratorService>;
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
          },
        );

        test.each(commands)(
          'should return the auth tokens',
          async (command: LocalLoginCommand) => {
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
              deletedAt: null,
              isDeleted: false,
              addRefreshToken: jest.fn(),
            } as MockedObject<User>;

            const userRepository = {
              getOneByUsername: jest.fn().mockReturnValue(user),
              update: jest.fn(),
            } as MockedObject<UserRepository>;

            const refreshTokenRepository = {
              add: jest.fn(),
            } as MockedObject<RefreshTokenRepository>;

            const unitOfWork = {
              commitChanges: jest.fn(),
            } as MockedObject<UnitOfWork>;

            const encryptionService = {
              passwordMatch: jest.fn().mockReturnValue(true),
            } as MockedObject<EncryptionService>;

            const tokenService = {
              signPayload: jest.fn().mockReturnValue('access-token'),
            } as MockedObject<TokenService>;

            const uniqueId = {
              getId: 'id-0',
            } as MockedObject<UniqueId>;

            const uniqueIdGeneratorService = {
              generateId: jest.fn().mockRejectedValue(uniqueId),
            } as MockedObject<UniqueIdGeneratorService>;

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
            expect(user.addRefreshToken.mock.calls).toHaveLength(1);

            expect(userRepository.update.mock.calls).toHaveLength(1);
            expect(unitOfWork.commitChanges.mock.calls).toHaveLength(1);

            expect(authTokens.access_token).toBe('access-token');
            expect(authTokens.refresh_token).not.toBeNull();
          },
        );
      });
    });
  });
});
