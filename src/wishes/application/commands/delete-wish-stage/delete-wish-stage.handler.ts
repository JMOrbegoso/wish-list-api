import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteWishStageCommand } from '..';
import { UnitOfWork } from '../../../../core/domain/repositories';
import { UniqueId } from '../../../../core/domain/value-objects';
import { WishRepository } from '../../../domain/repositories';

@CommandHandler(DeleteWishStageCommand)
export class DeleteWishStageHandler
  implements ICommandHandler<DeleteWishStageCommand>
{
  constructor(
    private readonly wishRepository: WishRepository,
    private readonly unitOfWork: UnitOfWork,
  ) {}

  async execute(command: DeleteWishStageCommand): Promise<void> {
    // Generate the properties of the wish stage
    const id = UniqueId.create(command.id);

    // Get the wish
    const wish = await this.wishRepository.getWishByWishStageId(id);
    if (!wish) throw new NotFoundException();

    // Get the wish stage
    const wishStage = wish.stages.find((stage) => stage.id.equals(id));
    if (!wishStage) throw new NotFoundException();

    // Check if the wish is deleted
    if (wish.isDeleted) throw new BadRequestException('Wish is deleted.');

    // Update the wish
    wish.removeStage(wishStage);

    // Update the wish using the repository
    this.wishRepository.update(wish);

    // Save changes using Unit of Work
    await this.unitOfWork.commitChanges();
  }
}
