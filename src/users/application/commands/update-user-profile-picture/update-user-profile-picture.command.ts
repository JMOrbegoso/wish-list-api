export class UpdateUserProfilePictureCommand {
  constructor(
    public readonly id: string,
    public readonly profilePicture: string,
  ) {}
}
