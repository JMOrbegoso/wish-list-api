import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Role } from '../../../domain/value-objects';
import { RolesGuard } from '../guards';

export function AuthJwtBearer(validRoles: Role[] = []) {
  const decorators: Array<
    ClassDecorator | MethodDecorator | PropertyDecorator
  > = [];

  decorators.push(ApiBearerAuth());
  decorators.push(UseGuards(AuthGuard('jwt')));

  if (validRoles && validRoles.length)
    decorators.push(UseGuards(new RolesGuard(validRoles)));

  return applyDecorators(...decorators);
}
