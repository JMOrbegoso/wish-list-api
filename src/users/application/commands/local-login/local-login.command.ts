export class LocalLoginCommand {
  constructor(
    public readonly username: string,
    public readonly password: string,
    public readonly ipAddress: string,
  ) {}
}
