import { UniqueId } from '../unique-id';

export abstract class Entity {
  public readonly id: UniqueId;

  protected constructor(id: UniqueId) {
    this.id = id;
  }

  public equals(other?: Entity): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    return this.id.equals(other.id);
  }
}
