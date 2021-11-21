import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserRepositoryMongoDb } from '../persistence/repositories';
import { UnitOfWork } from '../../../core/domain/repositories';
import { UnitOfWorkMongoDb } from '../../../core/infrastructure/repositories';
import { UserEntity } from '../persistence/entities';
import {
  EncryptionService,
  UniqueIdGeneratorService,
} from '../../application/services';
import {
  EncryptionServiceBcrypt,
  UniqueIdGeneratorServiceMongoDb,
} from '../services';
import { UsersController } from './users.controller';
import {
  GetUsersHandler,
  GetUserByIdHandler,
  GetUserByEmailHandler,
  GetUserByUserNameHandler,
} from '../../application/queries';
import {
  BlockUserHandler,
  CreateUserHandler,
  UpdateUserProfileHandler,
  UpdateUserPasswordHandler,
  DeleteUserHandler,
  UnblockUserHandler,
  UndeleteUserHandler,
} from '../../application/commands';

const queryHandlers = [
  GetUsersHandler,
  GetUserByIdHandler,
  GetUserByEmailHandler,
  GetUserByUserNameHandler,
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
