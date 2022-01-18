import { UnauthorizedException } from '@nestjs/common';
import { MockedObject } from 'ts-jest/dist/utils/testing';
import { RefreshAccessTokenCommand, RefreshAccessTokenHandler } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import { RefreshToken, RefreshTokenId, User } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';
import { TokenService, UniqueIdGeneratorService } from '../../services';

describe('users', () => {
  describe('application', () => {
    describe('commands', () => {
      describe('refresh-access-token', () => {
        const command = new RefreshAccessTokenCommand(
          'refresh-token-to-use',
          '192.168.0.1',
        );

        it('should throw UnauthorizedException because the User of the RefreshToken to use was not found', () => {
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
        });

        it('should throw UnauthorizedException because the RefreshToken to use was not found in the User', () => {
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
        });

        it('should throw UnauthorizedException because the RefreshToken to use is expired', () => {
          // Arrange
          const unitOfWork = {} as MockedObject<UnitOfWork>;

          const refreshTokenToReplace = {
            isExpired: true,
          } as MockedObject<RefreshToken>;

          const user = {
            id: {
              value: 'id-0',
            },
            getRefreshToken: jest.fn().mockReturnValue(refreshTokenToReplace),
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
        });

        it('should throw UnauthorizedException because the RefreshToken to use is revoked', async () => {
          // Arrange
          const unitOfWork = {
            commitChanges: jest.fn(),
          } as MockedObject<UnitOfWork>;

          const refreshTokenToReplace = {
            wasReplaced: false,
            isRevoked: true,
            isExpired: false,
          } as MockedObject<RefreshToken>;

          const user = {
            id: {
              value: 'id-0',
            },
            getRefreshToken: jest.fn().mockReturnValue(refreshTokenToReplace),
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

            expect(validRefreshTokenToRevoke.revoke.mock.calls).toHaveLength(2);
            expect(usedRefreshToken.revoke.mock.calls).toHaveLength(0);
          }
        });

        it('should throw UnauthorizedException because the RefreshToken to use was previously used', async () => {
          // Arrange
          const unitOfWork = {
            commitChanges: jest.fn(),
          } as MockedObject<UnitOfWork>;

          const refreshTokenToReplace = {
            wasReplaced: true,
            isRevoked: false,
            isExpired: false,
          } as MockedObject<RefreshToken>;

          const user = {
            id: {
              value: 'id-0',
            },
            getRefreshToken: jest.fn().mockReturnValue(refreshTokenToReplace),
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

            expect(validRefreshTokenToRevoke.revoke.mock.calls).toHaveLength(2);
            expect(usedRefreshToken.revoke.mock.calls).toHaveLength(0);
          }
        });

        it('should throw UnauthorizedException because the user is deleted', async () => {
          // Arrange
          const unitOfWork = {
            commitChanges: jest.fn(),
          } as MockedObject<UnitOfWork>;

          const refreshTokenToReplace = {
            isExpired: false,
            isRevoked: false,
            wasReplaced: false,
            isValid: true,
            replace: jest.fn(),
          } as MockedObject<RefreshToken>;

          const user = {
            id: {
              value: 'id-0',
            },
            isDeleted: true,
            getRefreshToken: jest.fn().mockReturnValue(refreshTokenToReplace),
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
        });

        it('should throw UnauthorizedException because the user is blocked', async () => {
          // Arrange
          const unitOfWork = {
            commitChanges: jest.fn(),
          } as MockedObject<UnitOfWork>;

          const refreshTokenToReplace = {
            isExpired: false,
            isRevoked: false,
            wasReplaced: false,
            isValid: true,
            replace: jest.fn(),
          } as MockedObject<RefreshToken>;

          const user = {
            id: {
              value: 'id-0',
            },
            isDeleted: false,
            isBlocked: true,
            getRefreshToken: jest.fn().mockReturnValue(refreshTokenToReplace),
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
        });

        it('should throw UnauthorizedException because the user is not verified', async () => {
          // Arrange
          const unitOfWork = {
            commitChanges: jest.fn(),
          } as MockedObject<UnitOfWork>;

          const refreshTokenToReplace = {
            isExpired: false,
            isRevoked: false,
            wasReplaced: false,
            isValid: true,
            replace: jest.fn(),
          } as MockedObject<RefreshToken>;

          const user = {
            id: {
              value: 'id-0',
            },
            isDeleted: false,
            isBlocked: false,
            isVerified: false,
            getRefreshToken: jest.fn().mockReturnValue(refreshTokenToReplace),
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
        });

        it('should generate the auth tokens using the refresh token', async () => {
          // Arrange
          const unitOfWork = {
            commitChanges: jest.fn(),
          } as MockedObject<UnitOfWork>;

          const refreshTokenToReplaceId = {
            equals: jest.fn().mockReturnValue(true),
          } as MockedObject<RefreshTokenId>;

          const refreshTokenToReplace = {
            id: refreshTokenToReplaceId as RefreshTokenId,
            isExpired: false,
            isRevoked: false,
            wasReplaced: false,
            isValid: true,
            replace: jest.fn(),
          } as MockedObject<RefreshToken>;

          const user = {
            id: {
              value: 'id-0',
            },
            isDeleted: false,
            isBlocked: false,
            isVerified: true,
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
              getIso8601: '1',
            },
            createdAt: {
              getIso8601: '1',
            },
            updatedAt: {
              getIso8601: '1',
            },
            biography: {
              getBiography: 'bio',
            },
            roles: ['Admin'],
            profilePicture: null,
            replaceRefreshToken: jest.fn(),
            getRefreshToken: jest.fn().mockReturnValue(refreshTokenToReplace),
            refreshTokens: [refreshTokenToReplace] as MockedObject<
              RefreshToken[]
            >,
          } as MockedObject<User>;

          const userRepository = {
            getOneByRefreshTokenId: jest.fn().mockReturnValue(user),
            addRefreshToken: jest.fn(),
            updateRefreshToken: jest.fn(),
          } as MockedObject<UserRepository>;

          const accessToken = 'access-token';
          const tokenService = {
            signPayload: jest.fn().mockReturnValue(accessToken),
          } as MockedObject<TokenService>;

          const refreshTokenId = 'refresh-token-id';
          const uniqueIdGeneratorService = {
            generateId: jest.fn().mockReturnValue(refreshTokenId),
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

          expect(userRepository.addRefreshToken.mock.calls).toHaveLength(1);
          expect(userRepository.updateRefreshToken.mock.calls).toHaveLength(1);
          expect(unitOfWork.commitChanges.mock.calls).toHaveLength(1);

          expect(authTokens.access_token).toBe(accessToken);
          expect(authTokens.refresh_token).toBe(refreshTokenId);
        });
      });
    });
  });
});
