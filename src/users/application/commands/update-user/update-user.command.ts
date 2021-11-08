export class UpdateUserCommand {
  constructor(
    public readonly id: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly birthday: number,
    public readonly biography?: string,
    public readonly profilePicture?: string,
  ) {}
}
