import { UniqueId } from '../../../shared/domain/value-objects';

export abstract class UniqueIdGeneratorService {
  abstract generateId(): UniqueId;
}
