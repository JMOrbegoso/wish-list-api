import { VerificationCode } from '..';
import { AggregateRoot } from '../../../../core/domain/entities';
import {
  MillisecondsDate,
  UniqueId,
  WebUrl,
} from '../../../../core/domain/value-objects';
import {
  Biography,
  Email,
  FirstName,
  IsBlocked,
  IsVerified,
  LastName,
  PasswordHash,
  Username,
} from '../../value-objects';

export class User extends AggregateRoot {
  private _email: Email;
  private _username: Username;
  private _passwordHash: PasswordHash;
  private _isVerified: IsVerified;
  private _verificationCode: VerificationCode;
  private _isBlocked: IsBlocked;
  private _firstName: FirstName;
  private _lastName: LastName;
  private _birthday: MillisecondsDate;
  private _createdAt: MillisecondsDate;
  private _updatedAt: MillisecondsDate;
  private _biography: Biography;
  private _profilePicture?: WebUrl;
  private _deletedAt?: MillisecondsDate;

  private constructor(
    id: UniqueId,
    email: Email,
    username: Username,
    passwordHash: PasswordHash,
    isVerified: IsVerified,
    verificationCode: VerificationCode,
    isBlocked: IsBlocked,
    firstName: FirstName,
    lastName: LastName,
    birthday: MillisecondsDate,
    createdAt: MillisecondsDate,
    updatedAt: MillisecondsDate,
    biography: Biography,
    profilePicture: WebUrl,
    deletedAt?: MillisecondsDate,
  ) {
    super(id);

    this._email = email;
    this._username = username;
    this._passwordHash = passwordHash;
    this._isVerified = isVerified;
    this._verificationCode = verificationCode;
    this._isBlocked = isBlocked;
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthday = birthday;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this._biography = biography;
    this._profilePicture = profilePicture;
    this._deletedAt = deletedAt;
  }

  public static create(
    id: UniqueId,
    email: Email,
    username: Username,
    passwordHash: PasswordHash,
    isVerified: IsVerified,
    verificationCode: VerificationCode,
    isBlocked: IsBlocked,
    firstName: FirstName,
    lastName: LastName,
    birthday: MillisecondsDate,
    createdAt: MillisecondsDate,
    updatedAt: MillisecondsDate,
    biography: Biography,
    profilePicture: WebUrl = null,
    deletedAt: MillisecondsDate = null,
  ): User {
    return new User(
      id,
      email,
      username,
      passwordHash,
      isVerified,
      verificationCode,
      isBlocked,
      firstName,
      lastName,
      birthday,
      createdAt,
      updatedAt,
      biography,
      profilePicture,
      deletedAt,
    );
  }

  public get id(): UniqueId {
    return this._id;
  }

  public get email(): Email {
    return this._email;
  }

  public get username(): Username {
    return this._username;
  }

  public get passwordHash(): PasswordHash {
    return this._passwordHash;
  }

  public get isVerified(): boolean {
    return this._isVerified.getStatus;
  }

  public get verificationCode(): string {
    return this._verificationCode.id.getId;
  }

  public get isBlocked(): boolean {
    return this._isBlocked.getStatus;
  }

  public get firstName(): FirstName {
    return this._firstName;
  }

  public get lastName(): LastName {
    return this._lastName;
  }

  public get birthday(): MillisecondsDate {
    return this._birthday;
  }

  public get createdAt(): MillisecondsDate {
    return this._createdAt;
  }

  public get updatedAt(): MillisecondsDate {
    return this._updatedAt;
  }

  public get biography(): Biography {
    return this._biography;
  }

  public get profilePicture(): WebUrl {
    return this._profilePicture;
  }

  public get deletedAt(): MillisecondsDate {
    return this._deletedAt;
  }

  public get isDeleted(): boolean {
    return !!this._deletedAt;
  }

  public updatePasswordHash(passwordHash: PasswordHash): void {
    this._passwordHash = passwordHash;
  }

  public verify(): void {
    this._isVerified = IsVerified.verified();
  }

  public block(): void {
    this._isBlocked = IsBlocked.blocked();
  }
  public unblock(): void {
    this._isBlocked = IsBlocked.notBlocked();
  }

  public updateProfile(
    firstName: FirstName,
    lastName: LastName,
    birthday: MillisecondsDate,
    biography: Biography,
    profilePicture?: WebUrl,
  ): void {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthday = birthday;
    this._biography = biography;
    this._profilePicture = profilePicture ?? null;

    this._updatedAt = MillisecondsDate.create();
  }

  public delete(): void {
    this._deletedAt = MillisecondsDate.create();
  }
  public undelete(): void {
    this._deletedAt = null;
  }
}
