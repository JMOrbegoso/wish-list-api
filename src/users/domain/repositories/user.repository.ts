import {
  RefreshToken,
  RefreshTokenId,
  User,
  UserId,
  VerificationCode,
  VerificationCodeId,
} from '../entities';
import { Email, IpAddress, Username } from '../value-objects';

export abstract class UserRepository {
  abstract userExists(
    id: UserId,
    email: Email,
    username: Username,
  ): Promise<boolean>;

  abstract getOneById(id: UserId): Promise<User>;

  abstract getOneByEmail(email: Email): Promise<User>;

  abstract getOneByUsername(username: Username): Promise<User>;

  abstract getOneByVerificationCodeId(
    verificationCodeId: VerificationCodeId,
  ): Promise<User>;

  abstract getOneByRefreshTokenId(
    refreshTokenId: RefreshTokenId,
  ): Promise<User>;

  abstract getAll(): Promise<User[]>;

  abstract getAllRefreshTokensByUserId(id: UserId): Promise<RefreshToken[]>;

  abstract getAllRefreshTokensByIpAddress(
    ipAddress: IpAddress,
  ): Promise<RefreshToken[]>;

  abstract addUser(user: User): void;
  abstract updateUser(user: User): void;

  abstract addVerificationCode(
    verificationCode: VerificationCode,
    userId: UserId,
  ): void;

  abstract addRefreshToken(refreshToken: RefreshToken, userId: UserId): void;
  abstract updateRefreshToken(refreshToken: RefreshToken): void;
}
