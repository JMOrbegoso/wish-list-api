import { UserRepository } from '../../../auth/domain/repositories';

export abstract class UnitOfWork {
  userRepository: UserRepository;

  abstract commitChanges(): Promise<void>;
}
