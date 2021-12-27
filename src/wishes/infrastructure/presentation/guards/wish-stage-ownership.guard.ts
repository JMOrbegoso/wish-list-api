import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UniqueId } from '../../../../shared/domain/value-objects';
import {
  Ownership,
  RoleOwnership,
} from '../../../../shared/infrastructure/presentation/decorators';
import { WishRepository } from '../../../domain/repositories';

export const WishStageOwnershipKey = 'WishStageOwnership';

@Injectable()
export class WishStageOwnershipGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly wishRepository: WishRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const wishStageOwnership = this.reflector.get<RoleOwnership>(
      WishStageOwnershipKey,
      context.getHandler(),
    );

    for (const ownership of wishStageOwnership.ownerships) {
      // Check if the user have the role
      if (!request.user.roles.includes(ownership.role.getRole)) continue;

      // Check if the ownership is any
      if (ownership.ownership === Ownership.Any) return true;

      // Check if the user is owner of the wish
      const id =
        request[wishStageOwnership.idProperty.target][
          wishStageOwnership.idProperty.name
        ];
      const uniqueId = UniqueId.create(id);
      const wish = await this.wishRepository.getWishByWishStageId(uniqueId);
      if (request.user.id == wish.wisher.id.getId) return true;
    }

    return false;
  }
}
