import {
  UniqueId,
  MillisecondsDate,
  WebUrl,
} from '../../../core/domain/value-objects';
import {
  Email,
  UserName,
  PasswordHash,
  IsVerified,
  FirstName,
  LastName,
  Biography,
} from '../../../auth/domain/value-objects';

export class CreateUserCommand {
  constructor(
    public readonly id: UniqueId,
    public readonly email: Email,
    public readonly userName: UserName,
    public readonly passwordHash: PasswordHash,
    public readonly isVerified: IsVerified,
    public readonly firstName: FirstName,
    public readonly lastName: LastName,
    public readonly birthday: MillisecondsDate,
    public readonly createdAt: MillisecondsDate,
    public readonly updatedAt: MillisecondsDate,
    public readonly biography?: Biography,
    public readonly profilePicture?: WebUrl,
  ) {}
}
