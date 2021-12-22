import { UnauthorizedException } from '@nestjs/common';
import { MockedObject } from 'ts-jest/dist/utils/testing';
import { RefreshAccessTokenCommand, RefreshAccessTokenHandler } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import { UniqueId } from '../../../../shared/domain/value-objects';
import { RefreshToken, User } from '../../../domain/entities';
import {
  RefreshTokenRepository,
  UserRepository,
} from '../../../domain/repositories';
import { TokenService, UniqueIdGeneratorService } from '../../services';

const commands = [
  new RefreshAccessTokenCommand('refresh-token-to-use', '192.168.0.1'),
  new RefreshAccessTokenCommand('refresh-token-to-use', '192.168.1.1'),
  new RefreshAccessTokenCommand('refresh-token-to-use', '192.168.1.2'),
];

describe('users', () => {
  describe('application', () => {
    describe('commands', () => {
      describe('refresh-access-token', () => {
        test.each(commands)(
          'should throw UnauthorizedException because RefreshToken to use was not found',
          (command: RefreshAccessTokenCommand) => {
            // Arrange
            const unitOfWork = {} as MockedObject<UnitOfWork>;

            const userRepository = {} as MockedObject<UserRepository>;
            const refreshTokenRepository = {
              getOne: jest.fn().mockReturnValue(null),
            } as MockedObject<RefreshTokenRepository>;

            const tokenService = {} as MockedObject<TokenService>;
            const uniqueIdGeneratorService =
              {} as MockedObject<UniqueIdGeneratorService>;
            const handler = new RefreshAccessTokenHandler(
              unitOfWork,
              userRepository,
              refreshTokenRepository,
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
          'should throw UnauthorizedException because the RefreshToken User was not found',
          (command: RefreshAccessTokenCommand) => {
            // Arrange
            const unitOfWork = {} as MockedObject<UnitOfWork>;

            const userRepository = {
              getOne: jest.fn().mockReturnValue(null),
            } as MockedObject<UserRepository>;

            const refreshTokenToUse = {} as MockedObject<RefreshToken>;
            const refreshTokenRepository = {
              getOne: jest.fn().mockReturnValue(refreshTokenToUse),
            } as MockedObject<RefreshTokenRepository>;

            const tokenService = {} as MockedObject<TokenService>;
            const uniqueIdGeneratorService =
              {} as MockedObject<UniqueIdGeneratorService>;
            const handler = new RefreshAccessTokenHandler(
              unitOfWork,
              userRepository,
              refreshTokenRepository,
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
          'should throw UnauthorizedException because the RefreshToken to use is expired',
          (command: RefreshAccessTokenCommand) => {
            // Arrange
            const unitOfWork = {} as MockedObject<UnitOfWork>;

            const user = {
              id: {
                getId: 'id-0',
              },
            } as MockedObject<User>;

            const userRepository = {
              getOne: jest.fn().mockReturnValue(user),
            } as MockedObject<UserRepository>;

            const refreshTokenToUse = {
              isExpired: true,
            } as MockedObject<RefreshToken>;

            const refreshTokenRepository = {
              getOne: jest.fn().mockReturnValue(refreshTokenToUse),
            } as MockedObject<RefreshTokenRepository>;

            const tokenService = {} as MockedObject<TokenService>;
            const uniqueIdGeneratorService =
              {} as MockedObject<UniqueIdGeneratorService>;
            const handler = new RefreshAccessTokenHandler(
              unitOfWork,
              userRepository,
              refreshTokenRepository,
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
          'should throw UnauthorizedException because the RefreshToken to use is revoked',
          async (command: RefreshAccessTokenCommand) => {
            // Arrange
            const unitOfWork = {
              commitChanges: jest.fn(),
            } as MockedObject<UnitOfWork>;

            const user = {
              id: {
                getId: 'id-0',
              },
            } as MockedObject<User>;

            const validRefreshTokenToRevoke = {
              isRevoked: false,
              wasReplaced: false,
              isExpired: false,
              isValid: true,
              revoke: jest.fn(),
            } as MockedObject<RefreshToken>;

            const usedRefreshToken = {
              isRevoked: false,
              wasReplaced: true,
              isExpired: false,
              isValid: false,
              revoke: jest.fn(),
            } as MockedObject<RefreshToken>;

            const userRepository = {
              getOne: jest.fn().mockReturnValue(user),
              getAllRefreshTokensByUserId: jest
                .fn()
                .mockReturnValue([validRefreshTokenToRevoke, usedRefreshToken]),
              getAllRefreshTokensByIpAddress: jest
                .fn()
                .mockReturnValue([validRefreshTokenToRevoke, usedRefreshToken]),
            } as MockedObject<UserRepository>;

            const refreshTokenToUse = {
              wasReplaced: false,
              isRevoked: true,
              isExpired: false,
            } as MockedObject<RefreshToken>;

            const refreshTokenRepository = {
              getOne: jest.fn().mockReturnValue(refreshTokenToUse),
              update: jest.fn(),
            } as MockedObject<RefreshTokenRepository>;

            const tokenService = {} as MockedObject<TokenService>;
            const uniqueIdGeneratorService =
              {} as MockedObject<UniqueIdGeneratorService>;
            const handler = new RefreshAccessTokenHandler(
              unitOfWork,
              userRepository,
              refreshTokenRepository,
              tokenService,
              uniqueIdGeneratorService,
            );

            // Act

            // Assert
            try {
              await handler.execute(command);
            } catch (error) {
              expect(refreshTokenRepository.update.mock.calls).toHaveLength(2);
              expect(unitOfWork.commitChanges.mock.calls).toHaveLength(1);

              expect(validRefreshTokenToRevoke.revoke.mock.calls).toHaveLength(
                2,
              );
              expect(usedRefreshToken.revoke.mock.calls).toHaveLength(0);
            }
          },
        );

        test.each(commands)(
          'should throw UnauthorizedException because the RefreshToken to use was previously used',
          async (command: RefreshAccessTokenCommand) => {
            // Arrange
            const unitOfWork = {
              commitChanges: jest.fn(),
            } as MockedObject<UnitOfWork>;

            const user = {
              id: {
                getId: 'id-0',
              },
            } as MockedObject<User>;

            const validRefreshTokenToRevoke = {
              isRevoked: false,
              wasReplaced: false,
              isExpired: false,
              isValid: true,
              revoke: jest.fn(),
            } as MockedObject<RefreshToken>;

            const usedRefreshToken = {
              isRevoked: false,
              wasReplaced: true,
              isExpired: false,
              isValid: false,
              revoke: jest.fn(),
            } as MockedObject<RefreshToken>;

            const userRepository = {
              getOne: jest.fn().mockReturnValue(user),
              getAllRefreshTokensByUserId: jest
                .fn()
                .mockReturnValue([validRefreshTokenToRevoke, usedRefreshToken]),
              getAllRefreshTokensByIpAddress: jest
                .fn()
                .mockReturnValue([validRefreshTokenToRevoke, usedRefreshToken]),
            } as MockedObject<UserRepository>;

            const refreshTokenToUse = {
              wasReplaced: true,
              isRevoked: false,
              isExpired: false,
            } as MockedObject<RefreshToken>;

            const refreshTokenRepository = {
              getOne: jest.fn().mockReturnValue(refreshTokenToUse),
              update: jest.fn(),
            } as MockedObject<RefreshTokenRepository>;

            const tokenService = {} as MockedObject<TokenService>;
            const uniqueIdGeneratorService =
              {} as MockedObject<UniqueIdGeneratorService>;
            const handler = new RefreshAccessTokenHandler(
              unitOfWork,
              userRepository,
              refreshTokenRepository,
              tokenService,
              uniqueIdGeneratorService,
            );

            // Act

            // Assert
            try {
              await handler.execute(command);
            } catch (error) {
              expect(refreshTokenRepository.update.mock.calls).toHaveLength(2);
              expect(unitOfWork.commitChanges.mock.calls).toHaveLength(1);

              expect(validRefreshTokenToRevoke.revoke.mock.calls).toHaveLength(
                2,
              );
              expect(usedRefreshToken.revoke.mock.calls).toHaveLength(0);
            }
          },
        );

        test.each(commands)(
          'should generate the auth tokens using the refresh token',
          async (command: RefreshAccessTokenCommand) => {
            // Arrange
            const unitOfWork = {
              commitChanges: jest.fn(),
            } as MockedObject<UnitOfWork>;

            const user = {
              id: {
                getId: 'id-0',
              },
              email: {
                getEmail: 'email',
              },
              username: {
                getUsername: 'username',
              },
              firstName: {
                getFirstName: 'firstname',
              },
              lastName: {
                getLastName: 'lastname',
              },
              birthday: {
                getMilliseconds: 1,
              },
              createdAt: {
                getMilliseconds: 1,
              },
              updatedAt: {
                getMilliseconds: 1,
              },
              isVerified: true,
              isBlocked: false,
              biography: {
                getBiography: 'bio',
              },
              roles: ['Admin'],
              profilePicture: null,
            } as MockedObject<User>;

            const userRepository = {
              getOne: jest.fn().mockReturnValue(user),
            } as MockedObject<UserRepository>;

            const refreshTokenToUse = {
              isExpired: false,
              isRevoked: false,
              wasReplaced: false,
              isValid: true,
              replace: jest.fn(),
            } as MockedObject<RefreshToken>;

            const refreshTokenRepository = {
              getOne: jest.fn().mockReturnValue(refreshTokenToUse),
              add: jest.fn(),
              update: jest.fn(),
            } as MockedObject<RefreshTokenRepository>;

            const tokenService = {
              signPayload: jest.fn().mockReturnValue('access-token'),
            } as MockedObject<TokenService>;

            const uniqueId = {
              getId: 'new-refresh-token-id',
            } as MockedObject<UniqueId>;

            const uniqueIdGeneratorService = {
              generateId: jest.fn().mockReturnValue(uniqueId),
            } as MockedObject<UniqueIdGeneratorService>;

            const handler = new RefreshAccessTokenHandler(
              unitOfWork,
              userRepository,
              refreshTokenRepository,
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
            expect(refreshTokenRepository.update.mock.calls).toHaveLength(1);
            expect(unitOfWork.commitChanges.mock.calls).toHaveLength(1);

            expect(authTokens.access_token).toBe('access-token');
            expect(authTokens.refresh_token).toBe('new-refresh-token-id');
          },
        );
      });
    });
  });
});
