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
} from '../../application/commands';
import {
  GetUserByEmailHandler,
  GetUserByIdHandler,
  GetUserByUsernameHandler,
  GetUsersHandler,
} from '../../application/queries';
import {
  EncryptionService,
  UniqueIdGeneratorService,
} from '../../application/services';
import { UserEntity } from '../persistence/entities';
import { UserRepositoryMongoDb } from '../persistence/repositories';
import {
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
  UpdateUserPasswordHandler,
  DeleteUserHandler,
  UndeleteUserHandler,
  BlockUserHandler,
  UnblockUserHandler,
];

@Module({
  controllers: [UsersController],
  imports: [
    MikroOrmModule.forFeature([UserEntity]),
    UserRepositoryMongoDb,
    CqrsModule,
  ],
  providers: [
    { provide: UnitOfWork, useClass: UnitOfWorkMongoDb },
    { provide: EncryptionService, useClass: EncryptionServiceBcrypt },
    {
      provide: UniqueIdGeneratorService,
      useClass: UniqueIdGeneratorServiceMongoDb,
    },
    ...queryHandlers,
    ...commandHandlers,
  ],
})
export class UsersModule {}
