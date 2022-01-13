import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  Ownership,
  RoleOwnership,
} from '../../../../shared/infrastructure/presentation/decorators';
import { WishId } from '../../../domain/entities';
import { WishRepository } from '../../../domain/repositories';

export const WishOwnershipKey = 'WishOwnership';

@Injectable()
export class WishOwnershipGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly wishRepository: WishRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const wishOwnership = this.reflector.get<RoleOwnership>(
      WishOwnershipKey,
      context.getHandler(),
    );

    for (const ownership of wishOwnership.ownerships) {
      // Check if the user have the role
      if (!request.user.roles.includes(ownership.role.getRole)) continue;

      // Check if the ownership is any
      if (ownership.ownership === Ownership.Any) return true;

      // Check if the user is owner of the wish
      const id =
        request[wishOwnership.idProperty.target][wishOwnership.idProperty.name];
      const wishId = WishId.create(id);
      const wish = await this.wishRepository.getOneById(wishId);
      if (!wish) throw new NotFoundException();
      if (request.user.id == wish.wisher.id.value) return true;
    }

    return false;
  }
}
