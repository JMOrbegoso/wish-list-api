import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MulterModule } from '@nestjs/platform-express';
import { UnitOfWork } from '../../../shared/domain/repositories';
import { UnitOfWorkMongoDb } from '../../../shared/infrastructure/repositories';
import { UserRepository } from '../../../users/domain/repositories';
import { UserRepositoryMongoDb } from '../../../users/infrastructure/persistence/repositories';
import {
  CreateWishHandler,
  CreateWishStageHandler,
  DeleteWishHandler,
  DeleteWishStageHandler,
  UndeleteWishHandler,
  UpdateWishHandler,
  UpdateWishStageHandler,
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
import { WishStagesController } from './wish-stages.controller';
import { WishesController } from './wishes.controller';

const queryHandlers = [
  GetWishesHandler,
  GetPublicWishesHandler,
  GetWishByIdHandler,
  GetWishesByWisherIdHandler,
];
const commandHandlers = [
  CreateWishHandler,
  CreateWishStageHandler,
  DeleteWishHandler,
  DeleteWishStageHandler,
  UndeleteWishHandler,
  UpdateWishHandler,
  UpdateWishStageHandler,
];

@Module({
  controllers: [WishesController, WishStagesController],
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
