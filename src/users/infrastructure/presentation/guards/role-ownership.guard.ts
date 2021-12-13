import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { OutputUserDto } from '../../../application/dtos';
import { Ownership, RoleOwnership, RoleOwnershipKey } from '../decorators';

@Injectable()
export class RoleOwnershipGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user as OutputUserDto;

    const roleOwnership = this.reflector.get<RoleOwnership>(
      RoleOwnershipKey,
      context.getHandler(),
    );

    for (const ownership of roleOwnership.ownerships) {
      // Check if the user have the role
      if (!user.roles.includes(ownership.role.getRole)) continue;

      // Check if the ownership is any
      if (ownership.ownership === Ownership.Any) return true;

      // Check if the user is owner
      if (
        user.id ==
        request[roleOwnership.idProperty.target][roleOwnership.idProperty.name]
      )
        return true;
    }

    return false;
  }
}
