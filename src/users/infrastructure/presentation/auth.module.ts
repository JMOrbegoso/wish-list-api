import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserRepositoryMongoDb } from '../persistence/repositories';
import { UnitOfWork } from '../../../core/domain/repositories';
import { UnitOfWorkMongoDb } from '../../../core/infrastructure/repositories';
import { UserEntity } from '../persistence/entities';
import { AuthController } from './auth.controller';

const queryHandlers = [];
const commandHandlers = [];

@Module({
  controllers: [AuthController],
  imports: [
    MikroOrmModule.forFeature([UserEntity]),
    UserRepositoryMongoDb,
    CqrsModule,
  ],
  providers: [
    { provide: UnitOfWork, useClass: UnitOfWorkMongoDb },
    ...queryHandlers,
    ...commandHandlers,
  ],
})
export class AuthModule {}
