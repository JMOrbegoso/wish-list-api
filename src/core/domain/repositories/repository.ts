import { AggregateRoot } from '../aggregate-roots';
import { UniqueId } from '../value-objects';

export interface Repository<T extends AggregateRoot> {
  getAll(): Promise<T[]>;

  getOne(id: UniqueId): Promise<T>;

  add(entity: T): Promise<void>;

  delete(id: UniqueId): Promise<void>;
}
