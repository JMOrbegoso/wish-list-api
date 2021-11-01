import { AggregateRoot } from '../aggregate-roots';
import { UniqueId } from '../value-objects';

export interface Repository<T extends AggregateRoot> {
  getAll(): Promise<T[]>;

  getOne(id: UniqueId): Promise<T>;

  add(t: T): void;

  update(t: T): void;

  delete(id: UniqueId): void;
}
