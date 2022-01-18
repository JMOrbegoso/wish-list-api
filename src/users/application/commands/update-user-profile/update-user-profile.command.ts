export class UpdateUserProfileCommand {
  constructor(
    public readonly id: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly birthday: string,
    public readonly biography: string,
  ) {}
}
