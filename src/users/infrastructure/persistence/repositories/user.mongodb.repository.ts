import {
  EntityRepository,
  Repository as MikroOrmRepository,
} from '@mikro-orm/core';
import { UserRepository } from '../../../domain/repositories';
import { User } from '../../../domain/entities';
import { UserEntity } from '../entities';
import { toUser, toUserEntity } from '../../mappings';
import { UniqueId } from '../../../../core/domain/value-objects';
import { UserName } from '../../../domain/value-objects';

@MikroOrmRepository(UserEntity)
export class UserMongoDbRepository
  extends EntityRepository<UserEntity>
  implements UserRepository
{
  async getOneByUserName(userName: UserName): Promise<User> {
    const userEntity = await this.findOne({
      userName: userName.getUserName,
    });
    if (!userEntity) return null;
    const user = toUser(userEntity);
    return user;
  }

  async getAll(): Promise<User[]> {
    const usersEntities = await this.findAll();
    const users = usersEntities.map((u) => toUser(u));
    return users;
  }

  async getOne(id: UniqueId): Promise<User> {
    const userEntity = await this.findOne(id.getId);
    if (!userEntity) return null;
    const user = toUser(userEntity);
    return user;
  }

  add(user: User): void {
    const userEntity = toUserEntity(user);
    const userEntityToPersist = this.create(userEntity);
    this.persist(userEntityToPersist);
  }

  update(user: User): void {
    const userEntity = toUserEntity(user);
    const userEntityToPersist = this.create(userEntity);
    this.persist(userEntityToPersist);
  }

  delete(id: UniqueId): void {
    const userEntity = this.getReference(id.getId);
    this.remove(userEntity);
  }
}
