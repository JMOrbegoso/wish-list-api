import { PrivacyLevel } from '../../../domain/value-objects';

export class CreateWishCommand {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly privacyLevel: PrivacyLevel,
    public readonly wisherId: string,
    public readonly urls: string[],
    public readonly imageUrls: string[],
    public readonly categories: string[],
    public readonly startedAt: number,
  ) {}
}
