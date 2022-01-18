import { DateTime } from '../../../shared/domain/value-objects';
import { VerificationCode, VerificationCodeId } from '../../domain/entities';
import { SecondsDuration } from '../../domain/value-objects';
import { VerificationCodeEntity } from '../persistence/entities';

export function verificationCodeEntityToVerificationCode(
  verificationCodeEntity: VerificationCodeEntity,
): VerificationCode {
  const verificationCodeId = VerificationCodeId.create(
    verificationCodeEntity.id,
  );
  const createdAt = DateTime.createFromDate(verificationCodeEntity.createdAt);
  const duration = SecondsDuration.create(verificationCodeEntity.duration);

  return VerificationCode.create(verificationCodeId, createdAt, duration);
}
