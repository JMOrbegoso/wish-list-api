import { Repository } from '../../../shared/domain/repositories';
import { UniqueId } from '../../../shared/domain/value-objects';
import { RefreshToken, User, VerificationCode } from '../entities';
import { Email, IpAddress, Username } from '../value-objects';

export abstract class UserRepository implements Repository<User> {
  abstract userExists(
    id: UniqueId,
    email: Email,
    username: Username,
  ): Promise<boolean>;

  abstract getOneByVerificationCode(
    verificationCode: VerificationCode,
  ): Promise<User>;

  abstract getOneByEmail(email: Email): Promise<User>;

  abstract getOneByUsername(username: Username): Promise<User>;

  abstract getOneByRefreshTokenId(refreshTokenId: UniqueId): Promise<User>;

  abstract getAll(): Promise<User[]>;

  abstract getAllRefreshTokensByUserId(id: UniqueId): Promise<RefreshToken[]>;

  abstract getAllRefreshTokensByIpAddress(
    ipAddress: IpAddress,
  ): Promise<RefreshToken[]>;

  abstract getOne(id: UniqueId): Promise<User>;

  abstract add(user: User): void;

  abstract update(user: User): void;

  abstract updateRefreshToken(refreshToken: RefreshToken): void;
}
