import { AggregateRoot } from '../../../../core/domain/entities';
import {
  UniqueId,
  MillisecondsDate,
  WebUrl,
} from '../../../../core/domain/value-objects';
import {
  Email,
  UserName,
  PasswordHash,
  IsVerified,
  IsBlocked,
  FirstName,
  LastName,
  Biography,
} from '../../value-objects';

export class User extends AggregateRoot {
  private _email: Email;
  private _userName: UserName;
  private _passwordHash: PasswordHash;
  private _isVerified: IsVerified;
  private _isBlocked: IsBlocked;
  private _firstName: FirstName;
  private _lastName: LastName;
  private _birthday: MillisecondsDate;
  private _createdAt: MillisecondsDate;
  private _updatedAt: MillisecondsDate;
  private _biography?: Biography;
  private _profilePicture?: WebUrl;
  private _deletedAt?: MillisecondsDate;

  private constructor(
    id: UniqueId,
    email: Email,
    userName: UserName,
    passwordHash: PasswordHash,
    isVerified: IsVerified,
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
    this._userName = userName;
    this._passwordHash = passwordHash;
    this._isVerified = isVerified;
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
    userName: UserName,
    passwordHash: PasswordHash,
    isVerified: IsVerified,
    isBlocked: IsBlocked,
    firstName: FirstName,
    lastName: LastName,
    birthday: MillisecondsDate,
    createdAt: MillisecondsDate,
    updatedAt: MillisecondsDate,
    biography: Biography = null,
    profilePicture: WebUrl = null,
    deletedAt: MillisecondsDate = null,
  ): User {
    return new User(
      id,
      email,
      userName,
      passwordHash,
      isVerified,
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

  public get userName(): UserName {
    return this._userName;
  }

  public get passwordHash(): PasswordHash {
    return this._passwordHash;
  }

  public get isVerified(): IsVerified {
    return this._isVerified;
  }

  public get isBlocked(): IsBlocked {
    return this._isBlocked;
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
    biography?: Biography,
    profilePicture?: WebUrl,
  ): void {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthday = birthday;
    this._biography = biography ?? null;
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
