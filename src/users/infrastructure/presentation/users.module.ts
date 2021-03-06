import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express';
import config from '../../../config';
import { UnitOfWork } from '../../../shared/domain/repositories';
import { UnitOfWorkMongoDb } from '../../../shared/infrastructure/repositories';
import {
  AddVerificationCodeHandler,
  BlockUserHandler,
  CreateUserHandler,
  DeleteUserHandler,
  LocalLoginHandler,
  RefreshAccessTokenHandler,
  UnblockUserHandler,
  UndeleteUserHandler,
  UpdateUserPasswordHandler,
  UpdateUserProfileHandler,
  UpdateUserProfilePictureHandler,
  VerifyUserHandler,
} from '../../application/commands';
import {
  GetUserByEmailHandler,
  GetUserByIdHandler,
  GetUserByUsernameHandler,
  GetUsersHandler,
} from '../../application/queries';
import {
  EmailSenderService,
  EncryptionService,
  TokenService,
  UniqueIdGeneratorService,
} from '../../application/services';
import { UserRepository } from '../../domain/repositories/user.repository';
import { JwtPassportStrategy } from '../passport-strategies';
import { UserEntity } from '../persistence/entities';
import { UserRepositoryMongoDb } from '../persistence/repositories';
import {
  EmailSenderServiceNodemailer,
  EncryptionServiceBcrypt,
  TokenServiceJwt,
  UniqueIdGeneratorServiceMongoDb,
} from '../services';
import { AuthController } from './auth.controller';
import { UsersManagementController } from './users-management.controller';
import { UsersController } from './users.controller';

const queryHandlers = [
  GetUserByEmailHandler,
  GetUserByIdHandler,
  GetUserByUsernameHandler,
  GetUsersHandler,
];
const commandHandlers = [
  AddVerificationCodeHandler,
  BlockUserHandler,
  CreateUserHandler,
  DeleteUserHandler,
  LocalLoginHandler,
  RefreshAccessTokenHandler,
  UnblockUserHandler,
  UndeleteUserHandler,
  UpdateUserPasswordHandler,
  UpdateUserProfileHandler,
  UpdateUserProfilePictureHandler,
  VerifyUserHandler,
];
const passportStrategies = [JwtPassportStrategy];

@Module({
  controllers: [AuthController, UsersController, UsersManagementController],
  imports: [
    MikroOrmModule.forFeature([UserEntity]),
    MulterModule.register(),
    CqrsModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: config.JWT_KEY,
        signOptions: { expiresIn: '60s' },
      }),
    }),
  ],
  providers: [
    { provide: UserRepository, useClass: UserRepositoryMongoDb },
    { provide: UnitOfWork, useClass: UnitOfWorkMongoDb },
    { provide: EncryptionService, useClass: EncryptionServiceBcrypt },
    {
      provide: UniqueIdGeneratorService,
      useClass: UniqueIdGeneratorServiceMongoDb,
    },
    {
      provide: EmailSenderService,
      useClass: EmailSenderServiceNodemailer,
    },
    {
      provide: TokenService,
      useClass: TokenServiceJwt,
    },
    ...queryHandlers,
    ...commandHandlers,
    ...passportStrategies,
  ],
})
export class UsersModule {}
