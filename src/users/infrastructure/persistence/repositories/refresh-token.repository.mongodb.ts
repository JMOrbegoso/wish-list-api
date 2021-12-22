import {
  EntityRepository,
  MikroORM,
  Repository as MikroOrmRepository,
} from '@mikro-orm/core';
import { UniqueId } from '../../../../shared/domain/value-objects';
import { RefreshToken } from '../../../domain/entities';
import { RefreshTokenRepository } from '../../../domain/repositories';
import { IpAddress } from '../../../domain/value-objects';
import {
  refreshTokenEntityToRefreshToken,
  refreshTokenToRefreshTokenEntity,
} from '../../mappings';
import { RefreshTokenEntity } from '../entities';

@MikroOrmRepository(RefreshTokenEntity)
export class RefreshTokenRepositoryMongoDb
  extends EntityRepository<RefreshTokenEntity>
  implements RefreshTokenRepository
{
  constructor(orm: MikroORM) {
    super(orm.em, RefreshTokenEntity);
  }

  async getAll(): Promise<RefreshToken[]> {
    const refreshTokenEntities = await this.findAll();
    const refreshTokens = refreshTokenEntities.map((rt) =>
      refreshTokenEntityToRefreshToken(rt),
    );
    return refreshTokens;
  }

  async getAllByIpAddress(ipAddress: IpAddress): Promise<RefreshToken[]> {
    const refreshTokenEntities = await this.find({
      ipAddress: ipAddress.getIpAddress,
    });
    const refreshTokens = refreshTokenEntities.map((rt) =>
      refreshTokenEntityToRefreshToken(rt),
    );
    return refreshTokens;
  }

  async getOne(id: UniqueId): Promise<RefreshToken> {
    const refreshTokenEntity = await this.findOne(id.getId);
    if (!refreshTokenEntity) return null;
    const refreshToken = refreshTokenEntityToRefreshToken(refreshTokenEntity);
    return refreshToken;
  }

  add(refreshToken: RefreshToken): void {
    const refreshTokenEntity = refreshTokenToRefreshTokenEntity(refreshToken);
    const entityToPersist = this.create(refreshTokenEntity);
    this.persist(entityToPersist);
  }

  update(refreshToken: RefreshToken): void {
    const refreshTokenEntity = refreshTokenToRefreshTokenEntity(refreshToken);
    const refreshTokenFromDb = this.getReference(refreshToken.id.getId);
    this.assign(refreshTokenFromDb, refreshTokenEntity);
  }

  delete(id: UniqueId): void {
    const refreshTokenFromDb = this.getReference(id.getId);
    this.remove(refreshTokenFromDb);
  }
}
