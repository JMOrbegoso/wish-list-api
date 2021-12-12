import { Repository } from '../../../shared/domain/repositories';
import { UniqueId } from '../../../shared/domain/value-objects';
import { RefreshToken } from '../entities';
import { IpAddress } from '../value-objects';

export abstract class RefreshTokenRepository
  implements Repository<RefreshToken>
{
  abstract getAll(): Promise<RefreshToken[]>;

  abstract getAllByUserId(userId: UniqueId): Promise<RefreshToken[]>;

  abstract getAllByIpAddress(ipAddress: IpAddress): Promise<RefreshToken[]>;

  abstract getOne(id: UniqueId): Promise<RefreshToken>;

  abstract add(refreshToken: RefreshToken): void;

  abstract update(refreshToken: RefreshToken): void;

  abstract delete(id: UniqueId): void;
}
