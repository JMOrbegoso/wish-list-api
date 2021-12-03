import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UnitOfWork } from '../../../core/domain/repositories';
import { UnitOfWorkMongoDb } from '../../../core/infrastructure/repositories';
import {
  BlockUserHandler,
  CreateUserHandler,
  DeleteUserHandler,
  UnblockUserHandler,
  UndeleteUserHandler,
  UpdateUserPasswordHandler,
  UpdateUserProfileHandler,
  UpdateUserProfilePictureHandler,
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
  UniqueIdGeneratorService,
} from '../../application/services';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserEntity } from '../persistence/entities';
import { UserRepositoryMongoDb } from '../persistence/repositories';
import {
  EmailSenderServiceNodemailer,
  EncryptionServiceBcrypt,
  UniqueIdGeneratorServiceMongoDb,
} from '../services';
import { UsersController } from './users.controller';

const queryHandlers = [
  GetUsersHandler,
  GetUserByIdHandler,
  GetUserByEmailHandler,
  GetUserByUsernameHandler,
];
const commandHandlers = [
  CreateUserHandler,
  UpdateUserProfileHandler,
  UpdateUserProfilePictureHandler,
  UpdateUserPasswordHandler,
  DeleteUserHandler,
  UndeleteUserHandler,
  BlockUserHandler,
  UnblockUserHandler,
];

@Module({
  controllers: [UsersController],
  imports: [MikroOrmModule.forFeature([UserEntity]), CqrsModule],
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
    ...queryHandlers,
    ...commandHandlers,
  ],
})
export class UsersModule {}
