import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

/**
 * Check if the `request param` and the `request body` have the same `Id`.
 * @param paramIdPropertyName Property name of the `Id` in the `request param`.
 * @param bodyIdPropertyName Property name of the `Id` in the `request body`.
 */
@Injectable()
export class ParamAndBodySameIdGuard implements CanActivate {
  constructor(
    private readonly paramIdPropertyName: string = 'id',
    private readonly bodyIdPropertyName: string = 'id',
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const idParam: string = request.params[this.paramIdPropertyName];
    const idBody: string = request.body[this.bodyIdPropertyName];

    if (idParam !== idBody) throw new BadRequestException('Id are different.');

    return true;
  }
}
