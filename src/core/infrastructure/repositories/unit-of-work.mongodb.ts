import { Injectable } from '@nestjs/common';
import { MikroORM, UnitOfWork as MikroOrmUnitOfWork } from '@mikro-orm/core';
import { UnitOfWork } from '../../domain/repositories';
import { UserEntity } from '../../../users/infrastructure/persistence/entities';
import { UserRepository } from '../../../users/domain/repositories';

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
