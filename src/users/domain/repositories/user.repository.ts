import { Repository } from '../../../shared/domain/repositories';
import { UniqueId } from '../../../shared/domain/value-objects';
import { User, VerificationCode } from '../entities';
import { Email, Username } from '../value-objects';

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

  abstract getAll(): Promise<User[]>;

  abstract getOne(id: UniqueId): Promise<User>;

  abstract add(user: User): void;

  abstract update(user: User): void;

  abstract delete(id: UniqueId): void;
}
