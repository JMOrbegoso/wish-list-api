import { EntityId, InvalidEntityIdError } from '.';

export abstract class Entity<T extends EntityId> {
  protected readonly _id: T;

  public get id(): T {
    return this._id;
  }

  protected constructor(id: T) {
    if (!id) throw new InvalidEntityIdError();

    this._id = id;
  }

  public equals(other?: Entity<T>): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    return this._id.equals(other._id);
  }
}
