import {
  EntityRepository,
  Repository as MikroOrmRepository,
} from '@mikro-orm/core';
import { UserRepository } from '../../../domain/repositories';
import { User } from '../../../domain/entities';
import { UserEntity } from '../entities';
import { toUser, toUserEntity } from '../../mappings';
import { UniqueId } from '../../../../core/domain/value-objects';
import { Email, UserName } from '../../../domain/value-objects';

@MikroOrmRepository(UserEntity)
export class UserRepositoryMongoDb
  extends EntityRepository<UserEntity>
  implements UserRepository
{
  async getOneByEmail(email: Email): Promise<User> {
    const userEntity = await this.findOne({
      normalizedEmail: email.getNormalizedEmail,
    });
    if (!userEntity) return null;
    const user = toUser(userEntity);
    return user;
  }

  async getOneByUserName(userName: UserName): Promise<User> {
    const userEntity = await this.findOne({
      normalizedUserName: userName.getNormalizedUserName,
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
    const userFromDb = this.getReference(user.id.getId);
    this.assign(userFromDb, userEntity);
  }

  delete(id: UniqueId): void {
    const userFromDb = this.getReference(id.getId);
    this.remove(userFromDb);
  }
}
