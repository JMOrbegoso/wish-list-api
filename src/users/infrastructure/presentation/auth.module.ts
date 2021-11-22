import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CqrsModule } from '@nestjs/cqrs';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { JwtModule } from '@nestjs/jwt';
import { UnitOfWork } from '../../../core/domain/repositories';
import { UnitOfWorkMongoDb } from '../../../core/infrastructure/repositories';
import { UserRepositoryMongoDb } from '../persistence/repositories';
import { UserEntity } from '../persistence/entities';
import { EncryptionService } from '../../application/services';
import { EncryptionServiceBcrypt } from '../services';
import { AuthController } from './auth.controller';
import { LocalLoginHandler } from '../../../users/application/commands';
import {
  LocalLoginPassportStrategy,
  JwtPassportStrategy,
} from '../passport-strategies';

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
