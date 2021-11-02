import { UniqueId } from '../value-objects';

export abstract class Entity {
  protected readonly _id: UniqueId;

  protected constructor(id: UniqueId) {
    this._id = id;
  }

  public equals(other?: Entity): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    return this._id.equals(other._id);
  }
}
