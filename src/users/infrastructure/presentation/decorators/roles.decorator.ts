import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { Role } from '../../../domain/value-objects';

export const RolesKey = 'RolesKey';

export const RolesDecorator = (roles: Role[]): CustomDecorator<string> =>
  SetMetadata(RolesKey, roles);
