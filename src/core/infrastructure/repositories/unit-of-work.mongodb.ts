import { MikroORM, UnitOfWork as MikroOrmUnitOfWork } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { UnitOfWork } from '../../domain/repositories';

@Injectable()
export class UnitOfWorkMongoDb
  extends MikroOrmUnitOfWork
  implements UnitOfWork
{
  constructor(private readonly orm: MikroORM) {
    super(orm.em);
  }

  public commitChanges(): Promise<void> {
    return this.orm.em.flush();
  }
}
