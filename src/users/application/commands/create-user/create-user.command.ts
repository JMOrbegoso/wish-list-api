export class CreateUserCommand {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly username: string,
    public readonly password: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly birthday: string,
    public readonly biography: string,
  ) {}
}
