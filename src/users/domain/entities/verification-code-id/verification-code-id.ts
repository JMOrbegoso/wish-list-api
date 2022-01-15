import { EntityId } from '../../../../shared/domain/entities';

export class VerificationCodeId extends EntityId {
  protected readonly entityIdType: string = 'VerificationCodeId';

  private constructor(id: string) {
    super(id);
  }

  public static create(id: string): VerificationCodeId {
    return new VerificationCodeId(id);
  }

  public equals(other?: VerificationCodeId): boolean {
    return super._equals(other);
  }
}
