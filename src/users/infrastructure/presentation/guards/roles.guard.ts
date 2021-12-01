import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Role } from '../../../domain/value-objects';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly validRoles: Role[]) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const validRoles = this.validRoles.map((role) => role.getRole);

    return validRoles.some((role) => user.roles.includes(role));
  }
}
