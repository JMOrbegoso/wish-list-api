import { UnauthorizedException } from '@nestjs/common';
import { mocked } from 'ts-jest/utils';
import { RefreshAccessTokenCommand, RefreshAccessTokenHandler } from '..';
import { UnitOfWork } from '../../../../core/domain/repositories';
import { UniqueId } from '../../../../core/domain/value-objects';
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
            const unitOfWork = mocked<UnitOfWork>({} as unknown as UnitOfWork);

            const userRepository = mocked<UserRepository>(
              {} as unknown as UserRepository,
            );

            const refreshTokenRepository = mocked<RefreshTokenRepository>({
              getOne: jest.fn().mockReturnValue(null),
            } as unknown as RefreshTokenRepository);

            const tokenService = mocked<TokenService>(
              {} as unknown as TokenService,
            );

            const uniqueIdGeneratorService = mocked<UniqueIdGeneratorService>(
              {} as unknown as UniqueIdGeneratorService,
            );

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
            const unitOfWork = mocked<UnitOfWork>({} as unknown as UnitOfWork);

            const userRepository = mocked<UserRepository>({
              getOne: jest.fn().mockReturnValue(null),
            } as unknown as UserRepository);

            const refreshTokenToUse = mocked<RefreshToken>(
              {} as unknown as RefreshToken,
            );

            const refreshTokenRepository = mocked<RefreshTokenRepository>({
              getOne: jest.fn().mockReturnValue(refreshTokenToUse),
            } as unknown as RefreshTokenRepository);

            const tokenService = mocked<TokenService>(
              {} as unknown as TokenService,
            );

            const uniqueIdGeneratorService = mocked<UniqueIdGeneratorService>(
              {} as unknown as UniqueIdGeneratorService,
            );

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
            const unitOfWork = mocked<UnitOfWork>({} as unknown as UnitOfWork);

            const user = mocked<User>({
              id: {
                getId: 'id-0',
              },
            } as unknown as User);

            const userRepository = mocked<UserRepository>({
              getOne: jest.fn().mockReturnValue(user),
            } as unknown as UserRepository);

            const refreshTokenToUse = mocked<RefreshToken>({
              isExpired: true,
            } as unknown as RefreshToken);

            const refreshTokenRepository = mocked<RefreshTokenRepository>({
              getOne: jest.fn().mockReturnValue(refreshTokenToUse),
            } as unknown as RefreshTokenRepository);

            const tokenService = mocked<TokenService>(
              {} as unknown as TokenService,
            );

            const uniqueIdGeneratorService = mocked<UniqueIdGeneratorService>(
              {} as unknown as UniqueIdGeneratorService,
            );

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
            const unitOfWork = mocked<UnitOfWork>({
              commitChanges: jest.fn(),
            } as unknown as UnitOfWork);

            const user = mocked<User>({
              id: {
                getId: 'id-0',
              },
            } as unknown as User);

            const userRepository = mocked<UserRepository>({
              getOne: jest.fn().mockReturnValue(user),
            } as unknown as UserRepository);

            const refreshTokenToUse = mocked<RefreshToken>({
              wasReplaced: false,
              isRevoked: true,
              isExpired: false,
            } as unknown as RefreshToken);

            const validRefreshTokenToRevoke = mocked<RefreshToken>({
              isRevoked: false,
              wasReplaced: false,
              isExpired: false,
              isValid: true,
              revoke: jest.fn(),
            } as unknown as RefreshToken);

            const usedRefreshToken = mocked<RefreshToken>({
              isRevoked: false,
              wasReplaced: true,
              isExpired: false,
              isValid: false,
              revoke: jest.fn(),
            } as unknown as RefreshToken);

            const refreshTokenRepository = mocked<RefreshTokenRepository>({
              getOne: jest.fn().mockReturnValue(refreshTokenToUse),
              getAllByUserId: jest
                .fn()
                .mockReturnValue([validRefreshTokenToRevoke, usedRefreshToken]),
              getAllByIpAddress: jest
                .fn()
                .mockReturnValue([validRefreshTokenToRevoke, usedRefreshToken]),
              update: jest.fn(),
            } as unknown as RefreshTokenRepository);

            const tokenService = mocked<TokenService>(
              {} as unknown as TokenService,
            );

            const uniqueIdGeneratorService = mocked<UniqueIdGeneratorService>(
              {} as unknown as UniqueIdGeneratorService,
            );

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
            const unitOfWork = mocked<UnitOfWork>({
              commitChanges: jest.fn(),
            } as unknown as UnitOfWork);

            const user = mocked<User>({
              id: {
                getId: 'id-0',
              },
            } as unknown as User);

            const userRepository = mocked<UserRepository>({
              getOne: jest.fn().mockReturnValue(user),
            } as unknown as UserRepository);

            const refreshTokenToUse = mocked<RefreshToken>({
              wasReplaced: true,
              isRevoked: false,
              isExpired: false,
            } as unknown as RefreshToken);

            const validRefreshTokenToRevoke = mocked<RefreshToken>({
              isRevoked: false,
              wasReplaced: false,
              isExpired: false,
              isValid: true,
              revoke: jest.fn(),
            } as unknown as RefreshToken);

            const usedRefreshToken = mocked<RefreshToken>({
              isRevoked: false,
              wasReplaced: true,
              isExpired: false,
              isValid: false,
              revoke: jest.fn(),
            } as unknown as RefreshToken);

            const refreshTokenRepository = mocked<RefreshTokenRepository>({
              getOne: jest.fn().mockReturnValue(refreshTokenToUse),
              getAllByUserId: jest
                .fn()
                .mockReturnValue([validRefreshTokenToRevoke, usedRefreshToken]),
              getAllByIpAddress: jest
                .fn()
                .mockReturnValue([validRefreshTokenToRevoke, usedRefreshToken]),
              update: jest.fn(),
            } as unknown as RefreshTokenRepository);

            const tokenService = mocked<TokenService>(
              {} as unknown as TokenService,
            );

            const uniqueIdGeneratorService = mocked<UniqueIdGeneratorService>(
              {} as unknown as UniqueIdGeneratorService,
            );

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
            const unitOfWork = mocked<UnitOfWork>({
              commitChanges: jest.fn(),
            } as unknown as UnitOfWork);

            const user = mocked<User>({
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
            } as unknown as User);

            const userRepository = mocked<UserRepository>({
              getOne: jest.fn().mockReturnValue(user),
            } as unknown as UserRepository);

            const refreshTokenToUse = mocked<RefreshToken>({
              isExpired: false,
              isRevoked: false,
              wasReplaced: false,
              isValid: true,
              replace: jest.fn(),
            } as unknown as RefreshToken);

            const refreshTokenRepository = mocked<RefreshTokenRepository>({
              getOne: jest.fn().mockReturnValue(refreshTokenToUse),
              add: jest.fn(),
              update: jest.fn(),
            } as unknown as RefreshTokenRepository);

            const tokenService = mocked<TokenService>({
              signPayload: jest.fn().mockReturnValue('access-token'),
            } as unknown as TokenService);

            const uniqueId = mocked<UniqueId>({
              getId: 'new-refresh-token-id',
            } as unknown as UniqueId);

            const uniqueIdGeneratorService = mocked<UniqueIdGeneratorService>({
              generateId: jest.fn().mockReturnValue(uniqueId),
            } as unknown as UniqueIdGeneratorService);

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
