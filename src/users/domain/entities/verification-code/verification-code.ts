import { VerificationCodeId } from '..';
import { Entity } from '../../../../shared/domain/entities';

export class VerificationCode extends Entity<VerificationCodeId> {
  private constructor(id: VerificationCodeId) {
    super(id);
  }

  public static create(id: VerificationCodeId): VerificationCode {
    return new VerificationCode(id);
  }
}
