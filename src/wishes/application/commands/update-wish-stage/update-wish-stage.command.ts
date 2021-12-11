export class UpdateWishStageCommand {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly urls: string[],
    public readonly imageUrls: string[],
  ) {}
}
