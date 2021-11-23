import { MikroORM, UnitOfWork as MikroOrmUnitOfWork } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../users/domain/repositories';
import { UserEntity } from '../../../users/infrastructure/persistence/entities';
import { UnitOfWork } from '../../domain/repositories';

@Injectable()
export class UnitOfWorkMongoDb
  extends MikroOrmUnitOfWork
  implements UnitOfWork
{
  public userRepository: UserRepository;

  constructor(private readonly orm: MikroORM) {
    super(orm.em);

    this.userRepository = this.orm.em.getRepository(UserEntity);
  }

  public commitChanges(): Promise<void> {
    return this.orm.em.flush();
  }
}
