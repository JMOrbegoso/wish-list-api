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
import { WishStageId } from '../../../domain/entities';
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
      const wishStageId = WishStageId.create(id);
      const wish = await this.wishRepository.getWishByWishStageId(wishStageId);
      if (!wish) throw new NotFoundException();
      if (request.user.id == wish.wisher.id.value) return true;
    }

    return false;
  }
}
