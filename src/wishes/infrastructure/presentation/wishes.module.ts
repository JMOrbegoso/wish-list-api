import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MulterModule } from '@nestjs/platform-express';
import { UnitOfWork } from '../../../core/domain/repositories';
import { UnitOfWorkMongoDb } from '../../../core/infrastructure/repositories';
import { UserRepository } from '../../../users/domain/repositories';
import { UserRepositoryMongoDb } from '../../../users/infrastructure/persistence/repositories';
import {
  ChangeWishPrivacyLevelHandler,
  CompleteWishHandler,
  CreateWishHandler,
  CreateWishStageHandler,
  DeleteWishHandler,
  UncompleteWishHandler,
  UndeleteWishHandler,
  UpdateWishHandler,
} from '../../application/commands';
import {
  GetPublicWishesHandler,
  GetWishByIdHandler,
  GetWishesByWisherIdHandler,
  GetWishesHandler,
} from '../../application/queries';
import { WishRepository } from '../../domain/repositories';
import { WishEntity } from '../persistence/entities';
import { WishRepositoryMongoDb } from '../persistence/repositories';
import { WishesController } from './wishes.controller';

const queryHandlers = [
  GetWishesHandler,
  GetPublicWishesHandler,
  GetWishByIdHandler,
  GetWishesByWisherIdHandler,
];
const commandHandlers = [
  ChangeWishPrivacyLevelHandler,
  CompleteWishHandler,
  CreateWishHandler,
  CreateWishStageHandler,
  DeleteWishHandler,
  UncompleteWishHandler,
  UndeleteWishHandler,
  UpdateWishHandler,
];

@Module({
  controllers: [WishesController],
  imports: [
    MikroOrmModule.forFeature([WishEntity]),
    MulterModule.register(),
    CqrsModule,
  ],
  providers: [
    { provide: WishRepository, useClass: WishRepositoryMongoDb },
    { provide: UserRepository, useClass: UserRepositoryMongoDb },
    { provide: UnitOfWork, useClass: UnitOfWorkMongoDb },
    ...queryHandlers,
    ...commandHandlers,
  ],
})
export class WishesModule {}
