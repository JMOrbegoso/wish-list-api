import { Repository } from '../../../core/domain/repositories';
import { UniqueId } from '../../../core/domain/value-objects';
import { RefreshToken } from '../entities';
import { Ip } from '../value-objects';

export abstract class RefreshTokenRepository
  implements Repository<RefreshToken>
{
  abstract getAll(): Promise<RefreshToken[]>;

  abstract getAllByUserId(userId: UniqueId): Promise<RefreshToken[]>;

  abstract getAllByIp(ip: Ip): Promise<RefreshToken[]>;

  abstract getOne(id: UniqueId): Promise<RefreshToken>;

  abstract add(refreshToken: RefreshToken): void;

  abstract update(refreshToken: RefreshToken): void;

  abstract delete(id: UniqueId): void;
}
