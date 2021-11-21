import { Repository } from '../../../core/domain/repositories';
import { User } from '../entities';
import { Email, Username } from '../value-objects';

export interface UserRepository extends Repository<User> {
  getOneByEmail(email: Email): Promise<User>;

  getOneByUsername(username: Username): Promise<User>;
}
