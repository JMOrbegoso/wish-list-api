import {
  EntityData,
  EntityRepository,
  MikroORM,
  Repository as MikroOrmRepository,
} from '@mikro-orm/core';
import { Query } from '@mikro-orm/core/typings';
import { ObjectId } from '@mikro-orm/mongodb';
import { UniqueId } from '../../../../shared/domain/value-objects';
import { RefreshToken, User, VerificationCode } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';
import { Email, IpAddress, Username } from '../../../domain/value-objects';
import {
  refreshTokenEntityToRefreshToken,
  userEntityToUser,
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
    const newValues = this.userEntityValues(user);
    const newUserEntity = this.create(newValues);
    this.orm.em.persist(newUserEntity);
  }

  updateUser(user: User): void {
    const userEntityFromDb = this.getReference(user.id.getId);
    const newValues = this.userEntityValues(user);
    this.orm.em.assign(userEntityFromDb, newValues);
  }

  addRefreshToken(refreshToken: RefreshToken): void {}

  updateRefreshToken(refreshToken: RefreshToken): void {}

  private userEntityValues(user: User): EntityData<UserEntity> {
    return {
      id: user.id.getId,
      email: user.email.getEmail,
      normalizedEmail: user.email.getNormalizedEmail,
      username: user.username.getUsername,
      normalizedUsername: user.username.getNormalizedUsername,
      passwordHash: user.passwordHash.getPasswordHash,
      isVerified: user.isVerified,
      verificationCode: user.verificationCode,
      isBlocked: user.isBlocked,
      firstName: user.firstName.getFirstName,
      lastName: user.lastName.getLastName,
      birthday: user.birthday.getDate,
      createdAt: user.createdAt.getDate,
      updatedAt: user.updatedAt.getDate,
      biography: user.biography.getBiography,
      profilePicture: user.profilePicture?.getUrl ?? null,
      deletedAt: user.deletedAt?.getDate ?? null,
      roles: user.roles,
    };
  }
}
