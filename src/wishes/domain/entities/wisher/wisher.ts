import { Entity } from '../../../../shared/domain/entities';
import { UniqueId } from '../../../../shared/domain/value-objects';

export class Wisher extends Entity {
  private constructor(id: UniqueId) {
    super(id);
  }

  public static create(id: UniqueId): Wisher {
    return new Wisher(id);
  }

  public get id(): UniqueId {
    return this._id;
  }
}
