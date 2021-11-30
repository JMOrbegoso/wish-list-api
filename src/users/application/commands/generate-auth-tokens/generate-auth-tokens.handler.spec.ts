import { mocked } from 'ts-jest/utils';
import { GenerateAuthTokensCommand, GenerateAuthTokensHandler } from '..';
import { UnitOfWork } from '../../../../core/domain/repositories';
import {
  InvalidUniqueIdError,
  UniqueId,
} from '../../../../core/domain/value-objects';
import { RefreshTokenRepository } from '../../../domain/repositories';
import { InvalidIpError } from '../../../domain/value-objects';
import { OutputUserDto } from '../../dtos';
import { TokenService, UniqueIdGeneratorService } from '../../services';

describe('users', () => {
  describe('application', () => {
    describe('commands', () => {
      describe('generate-auth-tokens', () => {
        test('should throw InvalidUniqueIdError', () => {
          // Arrange
          const unitOfWork = mocked<UnitOfWork>({} as unknown as UnitOfWork);

          const refreshTokenRepository = mocked<RefreshTokenRepository>(
            {} as unknown as RefreshTokenRepository,
          );

          const tokenService = mocked<TokenService>(
            {} as unknown as TokenService,
          );

          const uniqueIdGeneratorService = mocked<UniqueIdGeneratorService>(
            {} as unknown as UniqueIdGeneratorService,
          );

          const outputUserDto = mocked<OutputUserDto>(
            {} as unknown as OutputUserDto,
          );

          const command = mocked<GenerateAuthTokensCommand>({
            outputUserDto: outputUserDto,
            ipAddress: '192.168.1.1',
          } as unknown as GenerateAuthTokensCommand);

          const handler = new GenerateAuthTokensHandler(
            unitOfWork,
            refreshTokenRepository,
            tokenService,
            uniqueIdGeneratorService,
          );

          // Act

          // Assert
          return expect(handler.execute(command)).rejects.toThrowError(
            InvalidUniqueIdError,
          );
        });

        test('should throw InvalidIpError', () => {
          // Arrange
          const unitOfWork = mocked<UnitOfWork>({} as unknown as UnitOfWork);

          const refreshTokenRepository = mocked<RefreshTokenRepository>(
            {} as unknown as RefreshTokenRepository,
          );

          const tokenService = mocked<TokenService>(
            {} as unknown as TokenService,
          );

          const uniqueIdGeneratorService = mocked<UniqueIdGeneratorService>(
            {} as unknown as UniqueIdGeneratorService,
          );

          const outputUserDto = mocked<OutputUserDto>({
            id: 'id-0',
          } as unknown as OutputUserDto);

          const command = mocked<GenerateAuthTokensCommand>({
            outputUserDto: outputUserDto,
          } as unknown as GenerateAuthTokensCommand);

          const handler = new GenerateAuthTokensHandler(
            unitOfWork,
            refreshTokenRepository,
            tokenService,
            uniqueIdGeneratorService,
          );

          // Act

          // Assert
          return expect(handler.execute(command)).rejects.toThrowError(
            InvalidIpError,
          );
        });

        test('should generate the access tokens', async () => {
          // Arrange
          const unitOfWork = mocked<UnitOfWork>({
            commitChanges: jest.fn(),
          } as unknown as UnitOfWork);

          const refreshTokenRepository = mocked<RefreshTokenRepository>({
            add: jest.fn(),
          } as unknown as RefreshTokenRepository);

          const tokenService = mocked<TokenService>({
            signPayload: jest.fn().mockReturnValue('access-token'),
          } as unknown as TokenService);

          const uniqueId = mocked<UniqueId>({
            getId: 'id-0',
          } as unknown as UniqueId);

          const uniqueIdGeneratorService = mocked<UniqueIdGeneratorService>({
            generateId: jest.fn().mockRejectedValue(uniqueId),
          } as unknown as UniqueIdGeneratorService);

          const outputUserDto = mocked<OutputUserDto>({
            id: 'id-0',
          } as unknown as OutputUserDto);

          const command = mocked<GenerateAuthTokensCommand>({
            outputUserDto: outputUserDto,
            ipAddress: '192.168.1.1',
          } as unknown as GenerateAuthTokensCommand);

          const handler = new GenerateAuthTokensHandler(
            unitOfWork,
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
          expect(unitOfWork.commitChanges.mock.calls).toHaveLength(1);

          expect(authTokens.access_token).toBe('access-token');
          expect(authTokens.refresh_token).not.toBeNull();
        });
      });
    });
  });
});
