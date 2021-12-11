import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { OutputUserDto } from '../../../application/dtos';
import { Role } from '../../../domain/value-objects';

export const enum Ownership {
  Own = 'Own',
  Any = 'Any',
}

type RoleOwnership = { role: Role; ownership: Ownership };

@Injectable()
export class RoleOwnershipGuard implements CanActivate {
  constructor(
    private readonly ownerships: RoleOwnership[],
    private readonly target: 'body' | 'params',
    private readonly idPropertyName: string = 'id',
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user as OutputUserDto;

    for (const ownership of this.ownerships) {
      // Check if the user have the role
      if (!user.roles.includes(ownership.role.getRole)) continue;

      // Check if the ownership is any
      if (ownership.ownership === Ownership.Any) return true;

      // Check if the user is owner
      if (user.id == request[this.target][this.idPropertyName]) return true;
    }

    return false;
  }
}
