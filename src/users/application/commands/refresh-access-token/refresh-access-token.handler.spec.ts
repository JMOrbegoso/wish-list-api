import { UnauthorizedException } from '@nestjs/common';
import { MockedObject } from 'ts-jest/dist/utils/testing';
import { RefreshAccessTokenCommand, RefreshAccessTokenHandler } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import { UniqueId } from '../../../../shared/domain/value-objects';
import { RefreshToken, User } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';
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
          'should throw UnauthorizedException because the User of the RefreshToken to use was not found',
          (command: RefreshAccessTokenCommand) => {
            // Arrange
            const unitOfWork = {} as MockedObject<UnitOfWork>;

            const userRepository = {
              getOneByRefreshTokenId: jest.fn().mockReturnValue(null),
            } as MockedObject<UserRepository>;

            const tokenService = {} as MockedObject<TokenService>;
            const uniqueIdGeneratorService =
              {} as MockedObject<UniqueIdGeneratorService>;
            const handler = new RefreshAccessTokenHandler(
              unitOfWork,
              userRepository,
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
          'should throw UnauthorizedException because the RefreshToken to use was not found in the User',
          (command: RefreshAccessTokenCommand) => {
            // Arrange
            const unitOfWork = {} as MockedObject<UnitOfWork>;

            const user = {
              getRefreshToken: jest.fn().mockReturnValue(null),
            } as MockedObject<User>;

            const userRepository = {
              getOneByRefreshTokenId: jest.fn().mockReturnValue(user),
            } as MockedObject<UserRepository>;

            const tokenService = {} as MockedObject<TokenService>;
            const uniqueIdGeneratorService =
              {} as MockedObject<UniqueIdGeneratorService>;
            const handler = new RefreshAccessTokenHandler(
              unitOfWork,
              userRepository,
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

            const refreshTokenToUse = {
              isExpired: true,
            } as MockedObject<RefreshToken>;

            const user = {
              id: {
                getId: 'id-0',
              },
              getRefreshToken: jest.fn().mockReturnValue(refreshTokenToUse),
            } as MockedObject<User>;

            const userRepository = {
              getOneByRefreshTokenId: jest.fn().mockReturnValue(user),
            } as MockedObject<UserRepository>;

            const tokenService = {} as MockedObject<TokenService>;
            const uniqueIdGeneratorService =
              {} as MockedObject<UniqueIdGeneratorService>;
            const handler = new RefreshAccessTokenHandler(
              unitOfWork,
              userRepository,
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

            const refreshTokenToUse = {
              wasReplaced: false,
              isRevoked: true,
              isExpired: false,
            } as MockedObject<RefreshToken>;

            const user = {
              id: {
                getId: 'id-0',
              },
              getRefreshToken: jest.fn().mockReturnValue(refreshTokenToUse),
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
              getOneByRefreshTokenId: jest.fn().mockReturnValue(user),
              getAllRefreshTokensByUserId: jest
                .fn()
                .mockReturnValue([validRefreshTokenToRevoke, usedRefreshToken]),
              getAllRefreshTokensByIpAddress: jest
                .fn()
                .mockReturnValue([validRefreshTokenToRevoke, usedRefreshToken]),
              updateRefreshToken: jest.fn(),
            } as MockedObject<UserRepository>;

            const tokenService = {} as MockedObject<TokenService>;
            const uniqueIdGeneratorService =
              {} as MockedObject<UniqueIdGeneratorService>;
            const handler = new RefreshAccessTokenHandler(
              unitOfWork,
              userRepository,
              tokenService,
              uniqueIdGeneratorService,
            );

            // Act

            // Assert
            try {
              await handler.execute(command);
            } catch (error) {
              expect(userRepository.updateRefreshToken.mock.calls).toHaveLength(
                2,
              );
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

            const refreshTokenToUse = {
              wasReplaced: true,
              isRevoked: false,
              isExpired: false,
            } as MockedObject<RefreshToken>;

            const user = {
              id: {
                getId: 'id-0',
              },
              getRefreshToken: jest.fn().mockReturnValue(refreshTokenToUse),
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
              getOneByRefreshTokenId: jest.fn().mockReturnValue(user),
              getAllRefreshTokensByUserId: jest
                .fn()
                .mockReturnValue([validRefreshTokenToRevoke, usedRefreshToken]),
              getAllRefreshTokensByIpAddress: jest
                .fn()
                .mockReturnValue([validRefreshTokenToRevoke, usedRefreshToken]),
              updateRefreshToken: jest.fn(),
            } as MockedObject<UserRepository>;

            const tokenService = {} as MockedObject<TokenService>;
            const uniqueIdGeneratorService =
              {} as MockedObject<UniqueIdGeneratorService>;
            const handler = new RefreshAccessTokenHandler(
              unitOfWork,
              userRepository,
              tokenService,
              uniqueIdGeneratorService,
            );

            // Act

            // Assert
            try {
              await handler.execute(command);
            } catch (error) {
              expect(userRepository.updateRefreshToken.mock.calls).toHaveLength(
                2,
              );
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

            const refreshTokenToUse = {
              isExpired: false,
              isRevoked: false,
              wasReplaced: false,
              isValid: true,
              replace: jest.fn(),
            } as MockedObject<RefreshToken>;

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
              replaceRefreshToken: jest.fn(),
              getRefreshToken: jest.fn().mockReturnValue(refreshTokenToUse),
            } as MockedObject<User>;

            const userRepository = {
              getOneByRefreshTokenId: jest.fn().mockReturnValue(user),
              update: jest.fn(),
            } as MockedObject<UserRepository>;

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
            expect(user.replaceRefreshToken.mock.calls).toHaveLength(1);

            expect(userRepository.update.mock.calls).toHaveLength(1);
            expect(unitOfWork.commitChanges.mock.calls).toHaveLength(1);

            expect(authTokens.access_token).toBe('access-token');
            expect(authTokens.refresh_token).toBe('new-refresh-token-id');
          },
        );
      });
    });
  });
});
