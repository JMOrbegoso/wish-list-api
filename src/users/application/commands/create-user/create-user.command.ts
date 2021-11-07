export class CreateUserCommand {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly userName: string,
    public readonly passwordHash: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly birthday: number,
    public readonly biography?: string,
    public readonly profilePicture?: string,
  ) {}
}