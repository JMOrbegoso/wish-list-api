import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UndeleteWishCommand } from '..';
import { UnitOfWork } from '../../../../core/domain/repositories';
import { UniqueId } from '../../../../core/domain/value-objects';
import { WishRepository } from '../../../domain/repositories';

@CommandHandler(UndeleteWishCommand)
export class UndeleteWishHandler
  implements ICommandHandler<UndeleteWishCommand>
{
  constructor(
    private readonly wishRepository: WishRepository,
    private readonly unitOfWork: UnitOfWork,
  ) {}

  async execute(command: UndeleteWishCommand): Promise<void> {
    // Generate the properties of the new Wish
    const id = UniqueId.create(command.id);

    // Get the wish  by id
    const wish = await this.wishRepository.getOne(id);
    if (!wish) throw new NotFoundException();

    // Check if the wish is not deleted
    if (!wish.isDeleted) throw new BadRequestException('Wish is not deleted.');

    // Complete the wish
    wish.undelete();

    // Save the wish
    this.wishRepository.update(wish);

    // Save changes using Unit of Work
    await this.unitOfWork.commitChanges();
  }
}
