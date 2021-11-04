import { Repository } from '../../../core/domain/repositories';
import { User } from '../entities';
import { UniqueId } from '../../../core/domain/value-objects';

export interface UserRepository extends Repository<User> {
  verifyUser(userId: UniqueId): Promise<void>;
}
