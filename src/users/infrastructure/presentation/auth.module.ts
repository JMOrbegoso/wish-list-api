import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UnitOfWork } from '../../../core/domain/repositories';
import { UnitOfWorkMongoDb } from '../../../core/infrastructure/repositories';
import {
  LocalLoginHandler,
  VerifyUserHandler,
} from '../../../users/application/commands';
import {
  RefreshTokenRepository,
  UserRepository,
} from '../../../users/domain/repositories';
import {
  EncryptionService,
  UniqueIdGeneratorService,
} from '../../application/services';
import {
  JwtPassportStrategy,
  LocalLoginPassportStrategy,
} from '../passport-strategies';
import { UserEntity } from '../persistence/entities';
import {
  RefreshTokenRepositoryMongoDb,
  UserRepositoryMongoDb,
} from '../persistence/repositories';
import {
  EncryptionServiceBcrypt,
  UniqueIdGeneratorServiceMongoDb,
} from '../services';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const commandHandlers = [LocalLoginHandler, VerifyUserHandler];
const passportStrategies = [LocalLoginPassportStrategy, JwtPassportStrategy];

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
    AuthService,
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
    ...commandHandlers,
    ...passportStrategies,
  ],
})
export class AuthModule {}
