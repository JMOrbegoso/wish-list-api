import { UniqueId } from '../../../core/domain/value-objects';

export abstract class UniqueIdGeneratorService {
  abstract generateId(): UniqueId;
}
