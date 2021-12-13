import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { Role } from '../../../../users/domain/value-objects';

export const WishOwnershipKey = 'WishOwnership';

export const enum Ownership {
  Own = 'Own',
  Any = 'Any',
}

export type WishOwnership = {
  ownerships: { role: Role; ownership: Ownership }[];
  idProperty: {
    target: 'body' | 'params';
    name: string;
  };
};

export const WishOwnershipDecorator = (
  wishOwnership: WishOwnership,
): CustomDecorator<string> => SetMetadata(WishOwnershipKey, wishOwnership);
