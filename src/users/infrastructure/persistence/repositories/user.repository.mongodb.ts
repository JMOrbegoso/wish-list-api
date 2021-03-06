import {
  EntityData,
  EntityRepository,
  MikroORM,
  Repository as MikroOrmRepository,
} from '@mikro-orm/core';
import { Query } from '@mikro-orm/core/typings';
import { ObjectId } from '@mikro-orm/mongodb';
import {
  RefreshToken,
  RefreshTokenId,
  User,
  UserId,
  VerificationCode,
  VerificationCodeId,
} from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';
import { Email, IpAddress, Username } from '../../../domain/value-objects';
import {
  refreshTokenEntityToRefreshToken,
  userEntityToUser,
} from '../../mappings';
import {
  RefreshTokenEntity,
  UserEntity,
  VerificationCodeEntity,
} from '../entities';

@MikroOrmRepository(UserEntity)
export class UserRepositoryMongoDb
  extends EntityRepository<UserEntity>
  implements UserRepository
{
  constructor(private readonly orm: MikroORM) {
    super(orm.em, UserEntity);
  }

  async userExists(
    id: UserId,
    email: Email,
    username: Username,
  ): Promise<boolean> {
    const queries: Query<UserEntity>[] = [];

    if (id) queries.push({ _id: new ObjectId(id.value) });
    if (email) queries.push({ normalizedEmail: email.getNormalizedEmail });
    if (username)
      queries.push({ normalizedUsername: username.getNormalizedUsername });

    const count = await this.count({
      $or: queries,
    });

    return count > 0;
  }

  async getOneById(id: UserId): Promise<User> {
    const userObjectId = new ObjectId(id.value);
    const userEntity = await this.findOne(userObjectId);
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

  async getOneByVerificationCodeId(
    verificationCodeId: VerificationCodeId,
  ): Promise<User> {
    const verificationCodeIdObjectId = new ObjectId(verificationCodeId.value);
    const verificationCodeEntity = await this.orm.em.findOne(
      VerificationCodeEntity,
      verificationCodeIdObjectId,
      { populate: true },
    );

    if (!verificationCodeEntity) return null;
    const userEntity = verificationCodeEntity.user.getEntity();

    return userEntityToUser(userEntity);
  }

  async getOneByRefreshTokenId(refreshTokenId: RefreshTokenId): Promise<User> {
    const refreshTokenIdObjectId = new ObjectId(refreshTokenId.value);
    const refreshTokenEntity = await this.orm.em.findOne(
      RefreshTokenEntity,
      refreshTokenIdObjectId,
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

  async getAllRefreshTokensByUserId(id: UserId): Promise<RefreshToken[]> {
    const userObjectId = new ObjectId(id.value);
    const userEntity = await this.findOne(userObjectId, { populate: true });
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
    const newValues: EntityData<UserEntity> = {
      id: user.id.value,
      email: user.email.getEmail,
      normalizedEmail: user.email.getNormalizedEmail,
      username: user.username.getUsername,
      normalizedUsername: user.username.getNormalizedUsername,
      passwordHash: user.passwordHash.getPasswordHash,
      isVerified: user.isVerified,
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
    const newUserEntity = this.create(newValues);
    this.orm.em.persist(newUserEntity);
  }

  updateUser(user: User): void {
    const userObjectId = new ObjectId(user.id.value);
    const userEntityFromDb = this.getReference(userObjectId);
    const newValues: EntityData<UserEntity> = {
      passwordHash: user.passwordHash.getPasswordHash,
      isVerified: user.isVerified,
      isBlocked: user.isBlocked,
      firstName: user.firstName.getFirstName,
      lastName: user.lastName.getLastName,
      birthday: user.birthday.getDate,
      updatedAt: user.updatedAt.getDate,
      biography: user.biography.getBiography,
      profilePicture: user.profilePicture?.getUrl ?? null,
      deletedAt: user.deletedAt?.getDate ?? null,
      roles: user.roles,
    };
    this.orm.em.assign(userEntityFromDb, newValues);
  }

  addVerificationCode(
    verificationCode: VerificationCode,
    userId: UserId,
  ): void {
    const userObjectId = new ObjectId(userId.value);
    const newValues: EntityData<VerificationCodeEntity> = {
      id: verificationCode.id.value,
      user: userObjectId,
      createdAt: verificationCode.createdAt.getDate,
      duration: verificationCode.duration.getDuration,
    };
    const newVerificationCode = this.orm.em.create(
      VerificationCodeEntity,
      newValues,
    );
    this.orm.em.persist(newVerificationCode);
  }

  addRefreshToken(refreshToken: RefreshToken, userId: UserId): void {
    const userObjectId = new ObjectId(userId.value);
    const newValues: EntityData<RefreshTokenEntity> = {
      id: refreshToken.id.value,
      user: userObjectId,
      createdAt: refreshToken.createdAt.getDate,
      duration: refreshToken.duration,
      ipAddress: refreshToken.ipAddress,
      replacedAt: refreshToken.replacedAt?.getDate ?? null,
      replacedBy: refreshToken.replacedBy?.value ?? null,
      revokedAt: refreshToken.revokedAt?.getDate ?? null,
    };
    const newRefreshTokenEntity = this.orm.em.create(
      RefreshTokenEntity,
      newValues,
    );
    this.orm.em.persist(newRefreshTokenEntity);
  }

  updateRefreshToken(refreshToken: RefreshToken): void {
    const refreshTokenObjectId = new ObjectId(refreshToken.id.value);
    const refreshTokenEntityFromDb = this.orm.em.getReference(
      RefreshTokenEntity,
      refreshTokenObjectId,
    );
    const newValues: EntityData<RefreshTokenEntity> = {
      replacedAt: refreshToken.replacedAt?.getDate ?? null,
      replacedBy: refreshToken.replacedBy?.value ?? null,
      revokedAt: refreshToken.revokedAt?.getDate ?? null,
    };
    this.orm.em.assign(refreshTokenEntityFromDb, newValues);
  }
}
