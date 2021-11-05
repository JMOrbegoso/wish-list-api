import { UserRepository } from '../../../auth/domain/repositories';

export interface UnitOfWork {
  userRepository: UserRepository;

  commitChanges(): Promise<void>;
}
