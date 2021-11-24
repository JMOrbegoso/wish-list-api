import { Repository } from '../../../core/domain/repositories';
import { UniqueId } from '../../../core/domain/value-objects';
import { User } from '../entities';
import { Email, Username } from '../value-objects';

export abstract class UserRepository implements Repository<User> {
  abstract getOneByEmail(email: Email): Promise<User>;

  abstract getOneByUsername(username: Username): Promise<User>;

  abstract getAll(): Promise<User[]>;

  abstract getOne(id: UniqueId): Promise<User>;

  abstract add(user: User): void;

  abstract update(user: User): void;

  abstract delete(id: UniqueId): void;
}
