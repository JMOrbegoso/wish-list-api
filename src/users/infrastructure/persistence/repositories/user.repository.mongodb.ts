import {
  EntityRepository,
  MikroORM,
  Repository as MikroOrmRepository,
} from '@mikro-orm/core';
import { Query } from '@mikro-orm/core/typings';
import { UniqueId } from '../../../../shared/domain/value-objects';
import { RefreshToken, User, VerificationCode } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';
import { Email, Username } from '../../../domain/value-objects';
import {
  refreshTokenEntityToRefreshToken,
  userEntityToUser,
  userToUserEntity,
} from '../../mappings';
import { RefreshTokenEntity, UserEntity } from '../entities';

@MikroOrmRepository(UserEntity)
export class UserRepositoryMongoDb
  extends EntityRepository<UserEntity>
  implements UserRepository
{
  constructor(private readonly orm: MikroORM) {
    super(orm.em, UserEntity);
  }

  async getOneByVerificationCode(
    verificationCode: VerificationCode,
  ): Promise<User> {
    const userEntity = await this.findOne({
      verificationCode: verificationCode.id.getId,
    });
    if (!userEntity) return null;
    const user = userEntityToUser(userEntity);
    return user;
  }

  async userExists(
    id: UniqueId,
    email: Email,
    username: Username,
  ): Promise<boolean> {
    const queries: Query<UserEntity>[] = [];

    if (id) queries.push({ id: id.getId });
    if (email) queries.push({ normalizedEmail: email.getNormalizedEmail });
    if (username)
      queries.push({ normalizedUsername: username.getNormalizedUsername });

    const count = await this.count({
      $or: queries,
    });

    return count > 0;
  }

  async getOneByEmail(email: Email): Promise<User> {
    const userEntity = await this.findOne({
      normalizedEmail: email.getNormalizedEmail,
    });
    if (!userEntity) return null;
    const user = userEntityToUser(userEntity);
    return user;
  }

  async getOneByUsername(username: Username): Promise<User> {
    const userEntity = await this.findOne({
      normalizedUsername: username.getNormalizedUsername,
    });
    if (!userEntity) return null;
    const user = userEntityToUser(userEntity);
    return user;
  }

  async getAllRefreshTokensByUserId(id: UniqueId): Promise<RefreshToken[]> {
    const refreshTokenEntities = await this.orm.em.find(RefreshTokenEntity, {
      userId: id.getId,
    });
    const refreshTokens = refreshTokenEntities.map((rt) =>
      refreshTokenEntityToRefreshToken(rt),
    );
    return refreshTokens;
  }

  async getAll(): Promise<User[]> {
    const usersEntities = await this.findAll();
    const users = usersEntities.map((u) => userEntityToUser(u));
    return users;
  }

  async getOne(id: UniqueId): Promise<User> {
    const userEntity = await this.findOne(id.getId);
    if (!userEntity) return null;
    const user = userEntityToUser(userEntity);
    return user;
  }

  add(user: User): void {
    const userEntity = userToUserEntity(user);
    const userEntityToPersist = this.create(userEntity);
    this.persist(userEntityToPersist);
  }

  update(user: User): void {
    const userEntity = userToUserEntity(user);
    const userFromDb = this.getReference(user.id.getId);
    this.assign(userFromDb, userEntity);
  }

  delete(id: UniqueId): void {
    const userFromDb = this.getReference(id.getId);
    this.remove(userFromDb);
  }
}
