import { RefreshToken, VerificationCode } from '..';
import { AggregateRoot } from '../../../../shared/domain/entities';
import {
  MillisecondsDate,
  UniqueId,
  WebUrl,
} from '../../../../shared/domain/value-objects';
import {
  Biography,
  Email,
  FirstName,
  IsBlocked,
  IsVerified,
  LastName,
  PasswordHash,
  Role,
  Username,
} from '../../value-objects';
import {
  BlockedUserCannotBeUpdatedError,
  DeletedUserCannotBeUpdatedError,
  DuplicatedUserRefreshTokenError,
  InvalidUserBiographyError,
  InvalidUserBirthdayError,
  InvalidUserBlockedStatusError,
  InvalidUserCreatedAtError,
  InvalidUserEmailError,
  InvalidUserFirstNameError,
  InvalidUserLastNameError,
  InvalidUserPasswordHashError,
  InvalidUserRefreshTokenError,
  InvalidUserRefreshTokensError,
  InvalidUserRoleError,
  InvalidUserRolesError,
  InvalidUserUpdatedAtError,
  InvalidUserUsernameError,
  InvalidUserVerificationCodeError,
  InvalidUserVerificationStatusError,
  RefreshTokenNotFoundError,
  UnverifiedUserCannotBeUpdatedError,
} from './exceptions';

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
  private _roles: Role[];
  private _refreshTokens: RefreshToken[];
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
    roles: Role[],
    refreshTokens: RefreshToken[],
    profilePicture?: WebUrl,
    deletedAt?: MillisecondsDate,
  ) {
    super(id);

    if (!email) throw new InvalidUserEmailError();
    if (!username) throw new InvalidUserUsernameError();
    if (!passwordHash) throw new InvalidUserPasswordHashError();
    if (!isVerified) throw new InvalidUserVerificationStatusError();
    if (!verificationCode) throw new InvalidUserVerificationCodeError();
    if (!isBlocked) throw new InvalidUserBlockedStatusError();
    if (!firstName) throw new InvalidUserFirstNameError();
    if (!lastName) throw new InvalidUserLastNameError();
    if (!birthday) throw new InvalidUserBirthdayError();
    if (!createdAt) throw new InvalidUserCreatedAtError();
    if (!updatedAt) throw new InvalidUserUpdatedAtError();
    if (!biography) throw new InvalidUserBiographyError();
    if (!roles) throw new InvalidUserRolesError();
    roles.forEach((role) => {
      if (!role) throw new InvalidUserRoleError();
    });
    if (!refreshTokens) throw new InvalidUserRefreshTokensError();
    refreshTokens.forEach((refreshToken) => {
      if (!refreshToken) throw new InvalidUserRefreshTokenError();
    });
    if (!profilePicture) profilePicture = null;
    if (!deletedAt) deletedAt = null;

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
    this._roles = [...roles];
    this._refreshTokens = [...refreshTokens];
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
    roles: Role[] = [],
    refreshTokens: RefreshToken[] = [],
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
      roles,
      refreshTokens,
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
  ): void {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthday = birthday;
    this._biography = biography;

    this._updatedAt = MillisecondsDate.create();
  }

  public updateProfilePicture(profilePicture: WebUrl = null): void {
    this._profilePicture = profilePicture;

    this._updatedAt = MillisecondsDate.create();
  }

  public delete(): void {
    this._deletedAt = MillisecondsDate.create();
  }
  public undelete(): void {
    this._deletedAt = null;
  }

  public get roles(): string[] {
    return this._roles.map((r) => r.getRole);
  }

  public addRole(role: Role): void {
    if (!this._roles.some((r) => r.equals(role))) this._roles.push(role);
  }

  public removeRole(role: Role): void {
    this._roles = this._roles.filter((r) => !r.equals(role));
  }

  public get refreshTokens(): RefreshToken[] {
    return [...this._refreshTokens];
  }

  public getRefreshToken(refreshTokenId: UniqueId): RefreshToken {
    const refreshToken = this._refreshTokens.find((token) =>
      token.id.equals(refreshTokenId),
    );
    if (!refreshToken) return null;

    return refreshToken;
  }

  public addRefreshToken(newRefreshToken: RefreshToken): void {
    if (this.isDeleted) throw new DeletedUserCannotBeUpdatedError();

    if (this.isBlocked) throw new BlockedUserCannotBeUpdatedError();

    if (!this.isVerified) throw new UnverifiedUserCannotBeUpdatedError();

    if (!newRefreshToken) throw new InvalidUserRefreshTokenError();

    if (this._refreshTokens.some((token) => token.equals(newRefreshToken)))
      throw new DuplicatedUserRefreshTokenError();

    this._refreshTokens.push(newRefreshToken);
  }

  public replaceRefreshToken(
    refreshTokenIdToReplace: UniqueId,
    replacedByToken: RefreshToken,
  ): void {
    if (this.isDeleted) throw new DeletedUserCannotBeUpdatedError();

    if (this.isBlocked) throw new BlockedUserCannotBeUpdatedError();

    if (!this.isVerified) throw new UnverifiedUserCannotBeUpdatedError();

    if (!replacedByToken) throw new InvalidUserRefreshTokenError();

    const refreshTokenToReplace = this.getRefreshToken(refreshTokenIdToReplace);
    if (!refreshTokenToReplace) throw new RefreshTokenNotFoundError();

    this.addRefreshToken(replacedByToken);
    refreshTokenToReplace.replace(replacedByToken);
  }
}
