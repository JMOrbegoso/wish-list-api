import { Entity } from '../../../../core/domain/entities';
import { UniqueId } from '../../../../core/domain/value-objects';

export class Wisher extends Entity {
  readonly id: UniqueId;

  private constructor(id: UniqueId) {
    super(id);
  }

  public static create(id: UniqueId): Wisher {
    return new Wisher(id);
  }

  public get getId(): UniqueId {
    return this.id;
  }
}
