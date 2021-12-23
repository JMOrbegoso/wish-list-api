export class RefreshAccessTokenCommand {
  constructor(
    public readonly refreshTokenToReplace: string,
    public readonly ipAddress: string,
  ) {}
}
