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
  public set email(email: Email) {
    if (this._email.equals(email)) return;

    this._email = email;
    this.updatedAt = MillisecondsDate.create();
  }

  public get userName(): UserName {
    return this._userName;
  }
  public set userName(userName: UserName) {
    if (this._userName.equals(userName)) return;

    this._userName = userName;
    this.updatedAt = MillisecondsDate.create();
  }

  public get passwordHash(): PasswordHash {
    return this._passwordHash;
  }
  public set passwordHash(passwordHash: PasswordHash) {
    if (this._passwordHash.equals(passwordHash)) return;

    this._passwordHash = passwordHash;
    this.updatedAt = MillisecondsDate.create();
  }

  public get isVerified(): IsVerified {
    return this._isVerified;
  }
  public set isVerified(isVerified: IsVerified) {
    if (this._isVerified.equals(isVerified)) return;

    this._isVerified = isVerified;
    this.updatedAt = MillisecondsDate.create();
  }

  public get isBlocked(): IsBlocked {
    return this._isBlocked;
  }
  public set isBlocked(isBlocked: IsBlocked) {
    if (this._isBlocked.equals(isBlocked)) return;

    this._isBlocked = isBlocked;
    this.updatedAt = MillisecondsDate.create();
  }

  public get firstName(): FirstName {
    return this._firstName;
  }
  public set firstName(firstName: FirstName) {
    if (this._firstName.equals(firstName)) return;

    this._firstName = firstName;
    this.updatedAt = MillisecondsDate.create();
  }

  public get lastName(): LastName {
    return this._lastName;
  }
  public set lastName(lastName: LastName) {
    if (this._lastName.equals(lastName)) return;

    this._lastName = lastName;
    this.updatedAt = MillisecondsDate.create();
  }

  public get birthday(): MillisecondsDate {
    return this._birthday;
  }
  public set birthday(birthday: MillisecondsDate) {
    if (this._birthday.equals(birthday)) return;

    this._birthday = birthday;
    this.updatedAt = MillisecondsDate.create();
  }

  public get createdAt(): MillisecondsDate {
    return this._createdAt;
  }

  public get updatedAt(): MillisecondsDate {
    return this._updatedAt;
  }
  public set updatedAt(updatedAt: MillisecondsDate) {
    this._updatedAt = updatedAt;
  }

  public get biography(): Biography {
    return this._biography;
  }
  public set biography(biography: Biography) {
    if (!this._biography && !biography) return;

    if (this._biography && this._biography.equals(biography)) return;

    this._biography = biography;
    this.updatedAt = MillisecondsDate.create();
  }

  public get profilePicture(): WebUrl {
    return this._profilePicture;
  }
  public set profilePicture(profilePicture: WebUrl) {
    if (!this._profilePicture && !profilePicture) return;

    if (this._profilePicture && this._profilePicture.equals(profilePicture))
      return;

    this._profilePicture = profilePicture;
    this.updatedAt = MillisecondsDate.create();
  }

  public get deletedAt(): MillisecondsDate {
    return this._deletedAt;
  }
  public set deletedAt(deletedAt: MillisecondsDate) {
    if (!this._deletedAt && !deletedAt) return;

    if (this._deletedAt && this._deletedAt.equals(deletedAt)) return;

    this._deletedAt = deletedAt;
    this.updatedAt = MillisecondsDate.create();
  }

  public get isDeleted(): boolean {
    return !this._deletedAt;
  }
}
