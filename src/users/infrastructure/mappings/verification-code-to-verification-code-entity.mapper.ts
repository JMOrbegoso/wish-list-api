import { VerificationCode } from '../../domain/entities';
import { VerificationCodeEntity } from '../persistence/entities';

export function verificationCodeToVerificationCodeEntity(
  verificationCode: VerificationCode,
): VerificationCodeEntity {
  const verificationCodeEntity = new VerificationCodeEntity();

  verificationCodeEntity.id = verificationCode.id.value.toString();
  verificationCodeEntity.createdAt = verificationCode.createdAt.getDate;
  verificationCodeEntity.duration = verificationCode.duration.getDuration;

  return verificationCodeEntity;
}
