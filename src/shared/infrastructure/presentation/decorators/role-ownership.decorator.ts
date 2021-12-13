import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { Role } from '../../../../users/domain/value-objects';

export const enum Ownership {
  Own = 'Own',
  Any = 'Any',
}

export type RoleOwnership = {
  ownerships: { role: Role; ownership: Ownership }[];
  idProperty: {
    target: 'body' | 'params';
    name: string;
  };
};

export const RoleOwnershipDecorator = (
  key: string,
  roleOwnership: RoleOwnership,
): CustomDecorator<string> => SetMetadata(key, roleOwnership);
