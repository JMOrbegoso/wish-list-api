import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UnitOfWork } from '../../../core/domain/repositories';
import { UnitOfWorkMongoDb } from '../../../core/infrastructure/repositories';
import {
  LocalLoginHandler,
  RefreshAccessTokenHandler,
  VerifyUserHandler,
} from '../../application/commands';
import {
  EncryptionService,
  TokenService,
  UniqueIdGeneratorService,
} from '../../application/services';
import {
  RefreshTokenRepository,
  UserRepository,
} from '../../domain/repositories';
import { JwtPassportStrategy } from '../passport-strategies';
import { UserEntity } from '../persistence/entities';
import {
  RefreshTokenRepositoryMongoDb,
  UserRepositoryMongoDb,
} from '../persistence/repositories';
import {
  EncryptionServiceBcrypt,
  TokenServiceJwt,
  UniqueIdGeneratorServiceMongoDb,
} from '../services';
import { AuthController } from './auth.controller';

const commandHandlers = [
  LocalLoginHandler,
  RefreshAccessTokenHandler,
  VerifyUserHandler,
];
const passportStrategies = [JwtPassportStrategy];

@Module({
  controllers: [AuthController],
  imports: [
    MikroOrmModule.forFeature([UserEntity]),
    CqrsModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_KEY,
        signOptions: { expiresIn: '60s' },
      }),
    }),
  ],
  providers: [
    { provide: UserRepository, useClass: UserRepositoryMongoDb },
    {
      provide: RefreshTokenRepository,
      useClass: RefreshTokenRepositoryMongoDb,
    },
    { provide: UnitOfWork, useClass: UnitOfWorkMongoDb },
    { provide: EncryptionService, useClass: EncryptionServiceBcrypt },
    {
      provide: UniqueIdGeneratorService,
      useClass: UniqueIdGeneratorServiceMongoDb,
    },
    {
      provide: TokenService,
      useClass: TokenServiceJwt,
    },
    ...commandHandlers,
    ...passportStrategies,
  ],
})
export class AuthModule {}
