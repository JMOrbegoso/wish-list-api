import { AggregateRoot } from '../aggregate-roots';
import { UniqueId } from '../unique-id';

export interface Repository<T extends AggregateRoot> {
  getAll(): Promise<T[]>;

  find(id: UniqueId): Promise<T>;

  add(entity: T): Promise<void>;

  delete(id: UniqueId): Promise<void>;
}
