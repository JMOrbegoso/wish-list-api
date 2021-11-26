import {
  EntityRepository,
  MikroORM,
  Repository as MikroOrmRepository,
} from '@mikro-orm/core';
import { RefreshTokenEntity } from '../entities';

@MikroOrmRepository(RefreshTokenEntity)
export class RefreshTokenRepositoryMongoDb extends EntityRepository<RefreshTokenEntity> {
  constructor(orm: MikroORM) {
    super(orm.em, RefreshTokenEntity);
  }

  async getAll(): Promise<RefreshTokenEntity[]> {
    return await this.findAll();
  }

  async getAllByUserId(userId: string): Promise<RefreshTokenEntity[]> {
    return await this.find({ userId });
  }

  async getOne(id: string): Promise<RefreshTokenEntity> {
    const refreshToken = await this.findOne(id);
    if (!refreshToken) return null;
    return refreshToken;
  }

  add(refreshToken: RefreshTokenEntity): void {
    const entityToPersist = this.create(refreshToken);
    this.persist(entityToPersist);
  }

  replaceToken(id: string, newRefreshTokenId: string): void {
    const refreshToken = this.getReference(id);
    refreshToken.replace(newRefreshTokenId);
  }

  async revokeValidTokensByUserId(userId: string): Promise<void> {
    const refreshTokens = await this.find({ userId });
    refreshTokens.filter((rt) => rt.isValid).forEach((rt) => rt.revoke());
  }
}
