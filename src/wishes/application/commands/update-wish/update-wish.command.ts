export class UpdateWishCommand {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly urls: string[],
    public readonly imageUrls: string[],
    public readonly categories: string[],
    public readonly startedAt?: number,
    public readonly completedAt?: number,
  ) {}
}
