import { InvalidWishPrivacyLevelError } from '..';
import { ValueObject } from '../../../../shared/domain/value-objects';

export enum PrivacyLevel {
  Public = 'Public',
  JustFriends = 'JustFriends',
  OnlyMe = 'OnlyMe',
}

export class WishPrivacyLevel extends ValueObject<PrivacyLevel> {
  static public(): WishPrivacyLevel {
    return new WishPrivacyLevel(PrivacyLevel.Public);
  }

  static justFriends(): WishPrivacyLevel {
    return new WishPrivacyLevel(PrivacyLevel.JustFriends);
  }

  static onlyMe(): WishPrivacyLevel {
    return new WishPrivacyLevel(PrivacyLevel.OnlyMe);
  }

  protected validate(value: PrivacyLevel): void {
    if (!Object.values(PrivacyLevel).includes(value))
      throw new InvalidWishPrivacyLevelError();
  }

  static create(value: PrivacyLevel): WishPrivacyLevel {
    return new WishPrivacyLevel(value);
  }

  public get getPrivacyLevel(): PrivacyLevel {
    return this.value;
  }
}
