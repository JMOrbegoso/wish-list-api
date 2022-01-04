import {
  EntityRepository,
  MikroORM,
  Repository as MikroOrmRepository,
} from '@mikro-orm/core';
import { Query } from '@mikro-orm/core/typings';
import { UniqueId } from '../../../../shared/domain/value-objects';
import { RefreshToken, User, VerificationCode } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';
import { Email, IpAddress, Username } from '../../../domain/value-objects';
import {
  refreshTokenEntityToRefreshToken,
  refreshTokenToRefreshTokenEntity,
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

  async getOneById(id: UniqueId): Promise<User> {
    const userEntity = await this.findOne(id.getId);
    if (!userEntity) return null;
    const user = userEntityToUser(userEntity);
    return user;
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

  async getOneByRefreshTokenId(refreshTokenId: UniqueId): Promise<User> {
    const refreshTokenEntity = await this.orm.em.findOne(
      RefreshTokenEntity,
      refreshTokenId.getId,
      { populate: true },
    );

    if (!refreshTokenEntity) return null;
    const userEntity = refreshTokenEntity.user.getEntity();

    return userEntityToUser(userEntity);
  }

  async getAll(): Promise<User[]> {
    const usersEntities = await this.findAll();
    const users = usersEntities.map((u) => userEntityToUser(u));
    return users;
  }

  async getAllRefreshTokensByUserId(id: UniqueId): Promise<RefreshToken[]> {
    const userEntity = await this.findOne({ id: id.getId }, { populate: true });
    if (!userEntity) return null;

    const refreshTokens = userEntity.refreshTokens
      .getItems()
      .map((rt) => refreshTokenEntityToRefreshToken(rt));

    return refreshTokens;
  }

  async getAllRefreshTokensByIpAddress(
    ipAddress: IpAddress,
  ): Promise<RefreshToken[]> {
    const refreshTokenEntities = await this.orm.em.find(RefreshTokenEntity, {
      ipAddress: ipAddress.getIpAddress,
    });
    const refreshTokens = refreshTokenEntities.map((rt) =>
      refreshTokenEntityToRefreshToken(rt),
    );
    return refreshTokens;
  }

  addUser(user: User): void {
    const refreshTokenEntities = user.refreshTokens.map((token) =>
      this.getOrCreateRefreshTokenEntity(token),
    );
    const userEntity = userToUserEntity(user, refreshTokenEntities);
    const userEntityToPersist = this.create(userEntity);
    this.persist(userEntityToPersist);
  }

  async update(user: User): Promise<void> {
    const userFromDb = await this.findOne(user.id.getId, { populate: true });

    // Update refreshTokens
    const refreshTokensToUpdate = user.refreshTokens.filter((refreshToken) =>
      userFromDb.refreshTokens
        .getItems()
        .some((refreshTokenDb) => refreshToken.id.getId === refreshTokenDb.id),
    );
    const refreshTokensToAdd = user.refreshTokens.filter(
      (refreshToken) =>
        !refreshTokensToUpdate.some(
          (refreshTokenToUpdate) => refreshToken.id === refreshTokenToUpdate.id,
        ),
    );

    // Persist user refreshTokens to add
    refreshTokensToAdd.forEach((refreshToken) =>
      this.persistNewRefreshToken(refreshToken, userFromDb),
    );

    // Persist user refreshTokens to update
    refreshTokensToUpdate.forEach((refreshToken) =>
      this.updateRefreshTokenFromPersist(refreshToken),
    );

    // Update user
    const userEntity = userToUserEntity(user, []);
    this.assign(userFromDb, userEntity);
  }

  updateRefreshToken(refreshToken: RefreshToken): void {
    const refreshTokenEntity = refreshTokenToRefreshTokenEntity(refreshToken);
    const refreshTokenFromDb = this.orm.em.getReference(
      RefreshTokenEntity,
      refreshToken.id.getId,
    );
    this.orm.em.assign(refreshTokenFromDb, refreshTokenEntity);
  }

  private getOrCreateRefreshTokenEntity(
    refreshToken: RefreshToken,
  ): RefreshTokenEntity {
    let refreshTokenEntity = this.orm.em.getReference(
      RefreshTokenEntity,
      refreshToken.id.getId,
    );

    if (!refreshTokenEntity) {
      refreshTokenEntity = refreshTokenToRefreshTokenEntity(refreshToken);
    }

    return refreshTokenEntity;
  }

  private persistNewRefreshToken(
    refreshToken: RefreshToken,
    userFromDb: UserEntity,
  ): void {
    const refreshTokenEntity = refreshTokenToRefreshTokenEntity(refreshToken);
    userFromDb.refreshTokens.add(refreshTokenEntity);
    this.orm.em.persist(refreshTokenEntity);
  }

  private updateRefreshTokenFromPersist(refreshToken: RefreshToken): void {
    const refreshTokenReference = this.orm.em.getReference(
      RefreshTokenEntity,
      refreshToken.id.getId,
    );
    this.orm.em.assign(
      refreshTokenReference,
      refreshTokenToRefreshTokenEntity(refreshToken),
    );
  }
}
