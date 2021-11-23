import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UnitOfWork } from '../../../core/domain/repositories';
import { UnitOfWorkMongoDb } from '../../../core/infrastructure/repositories';
import { LocalLoginHandler } from '../../../users/application/commands';
import { EncryptionService } from '../../application/services';
import {
  JwtPassportStrategy,
  LocalLoginPassportStrategy,
} from '../passport-strategies';
import { UserEntity } from '../persistence/entities';
import { UserRepositoryMongoDb } from '../persistence/repositories';
import { EncryptionServiceBcrypt } from '../services';
import { AuthController } from './auth.controller';

const commandHandlers = [LocalLoginHandler];
const passportStrategies = [LocalLoginPassportStrategy, JwtPassportStrategy];

@Module({
  controllers: [AuthController],
  imports: [
    MikroOrmModule.forFeature([UserEntity]),
    UserRepositoryMongoDb,
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
    { provide: UnitOfWork, useClass: UnitOfWorkMongoDb },
    { provide: EncryptionService, useClass: EncryptionServiceBcrypt },
    ...commandHandlers,
    ...passportStrategies,
  ],
})
export class AuthModule {}
