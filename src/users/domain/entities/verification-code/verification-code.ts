import { Entity } from '../../../../core/domain/entities';
import { UniqueId } from '../../../../core/domain/value-objects';

export class VerificationCode extends Entity {
  private constructor(id: UniqueId) {
    super(id);
  }

  public static create(id: UniqueId): VerificationCode {
    return new VerificationCode(id);
  }

  public get id(): UniqueId {
    return this._id;
  }
}
