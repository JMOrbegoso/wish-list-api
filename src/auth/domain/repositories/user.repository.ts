import { Repository } from '../../../core/domain/repositories';
import { User } from '../entities';
import { UserName } from '../value-objects';

export interface UserRepository extends Repository<User> {
  getOneByUserName(userName: UserName): Promise<User>;
}
