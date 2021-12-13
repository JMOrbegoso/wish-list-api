import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../../domain/value-objects';
import { RolesKey } from '../decorators';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const roles = this.reflector.get<Role[]>(RolesKey, context.getHandler());

    const validRoles = roles.map((role) => role.getRole);
    return validRoles.some((role) => user.roles.includes(role));
  }
}
