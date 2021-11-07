import { ValueObject } from '../../../../core/domain/value-objects';

export enum PrivacyLevel {
  Public = 0,
  JustFriends = 1,
  OnlyMe = 2,
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
      throw new Error('Invalid wish privacy level.');
  }

  static create(value: PrivacyLevel): WishPrivacyLevel {
    return new WishPrivacyLevel(value);
  }

  public get getPrivacyLevel(): PrivacyLevel {
    return this.value;
  }
}
