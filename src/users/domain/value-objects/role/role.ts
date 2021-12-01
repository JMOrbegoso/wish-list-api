import { InvalidRoleError } from '..';
import { ValueObject } from '../../../../core/domain/value-objects';

export class Role extends ValueObject<string> {
  public static admin(): Role {
    return new Role('Admin');
  }

  public static moderator(): Role {
    return new Role('Moderator');
  }

  public static basic(): Role {
    return new Role('Basic');
  }

  protected validate(value: string): void {
    if (!value) throw new InvalidRoleError();
  }

  static create(value: string): Role {
    return new Role(value);
  }

  public get getRole(): string {
    return this.value;
  }
}
