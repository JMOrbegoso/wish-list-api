import { AggregateRoot } from '../entities';
import { UniqueId } from '../value-objects';

export interface Repository<T extends AggregateRoot> {
  getAll(): Promise<T[]>;

  getOneById(id: UniqueId): Promise<T>;

  add(t: T): void;
}
