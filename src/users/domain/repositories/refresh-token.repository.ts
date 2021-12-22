import { Repository } from '../../../shared/domain/repositories';
import { UniqueId } from '../../../shared/domain/value-objects';
import { RefreshToken } from '../entities';

export abstract class RefreshTokenRepository
  implements Repository<RefreshToken>
{
  abstract getAll(): Promise<RefreshToken[]>;

  abstract getOne(id: UniqueId): Promise<RefreshToken>;

  abstract add(refreshToken: RefreshToken): void;

  abstract update(refreshToken: RefreshToken): void;

  abstract delete(id: UniqueId): void;
}
