import { Repository } from '../../../core/domain/repositories';
import { User } from '../entities';
import { Email, UserName } from '../value-objects';

export interface UserRepository extends Repository<User> {
  getOneByEmail(email: Email): Promise<User>;

  getOneByUserName(userName: UserName): Promise<User>;
}
