import { UserRepository } from '../../../users/domain/repositories';

export abstract class UnitOfWork {
  userRepository: UserRepository;

  abstract commitChanges(): Promise<void>;
}
