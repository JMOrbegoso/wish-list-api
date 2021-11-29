export class RefreshAccessTokenCommand {
  constructor(
    public readonly refreshTokenToUse: string,
    public readonly ipAddress: string,
  ) {}
}
