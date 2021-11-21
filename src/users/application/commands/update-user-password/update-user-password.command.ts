export class UpdateUserPasswordCommand {
  constructor(public readonly id: string, public readonly password: string) {}
}
