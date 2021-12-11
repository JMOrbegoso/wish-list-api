import { PrivacyLevel } from '../../../domain/value-objects';

export class ChangeWishPrivacyLevelCommand {
  constructor(
    public readonly id: string,
    public readonly privacyLevel: PrivacyLevel,
  ) {}
}
