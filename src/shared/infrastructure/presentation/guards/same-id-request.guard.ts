import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RequestIds, RequestIdsKey } from '../decorators';

/**
 * Check if the `request params` and the `request body` have the same `Id`.
 */
@Injectable()
export class SameIdRequestGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const requestIds = this.reflector.get<RequestIds>(
      RequestIdsKey,
      context.getHandler(),
    );

    const idParams: string = request.params[requestIds.paramsIdPropertyName];
    const idBody: string = request.body[requestIds.bodyIdPropertyName];

    if (idParams !== idBody) throw new BadRequestException('Id are different.');

    return true;
  }
}
