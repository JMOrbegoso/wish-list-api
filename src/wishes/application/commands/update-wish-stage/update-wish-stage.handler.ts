import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateWishStageCommand } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import { WebUrl } from '../../../../shared/domain/value-objects';
import { WishStageId } from '../../../domain/entities';
import { WishRepository } from '../../../domain/repositories';
import { WishDescription, WishTitle } from '../../../domain/value-objects';

@CommandHandler(UpdateWishStageCommand)
export class UpdateWishStageHandler
  implements ICommandHandler<UpdateWishStageCommand>
{
  constructor(
    private readonly wishRepository: WishRepository,
    private readonly unitOfWork: UnitOfWork,
  ) {}

  async execute(command: UpdateWishStageCommand): Promise<void> {
    // Generate the properties of the wish stage to update
    const wishStageId = WishStageId.create(command.id);
    const title = WishTitle.create(command.title);
    const description = WishDescription.create(command.description);
    const urls = command.urls.map((url) => WebUrl.create(url));
    const imageUrls = command.imageUrls.map((url) => WebUrl.create(url));

    // Get the wish
    const wish = await this.wishRepository.getWishByWishStageId(wishStageId);
    if (!wish) throw new NotFoundException();

    // Check if the wish is deleted
    if (wish.isDeleted) throw new BadRequestException('Wish is deleted.');

    // Update the wish stage
    wish.updateStage(wishStageId, title, description, urls, imageUrls);

    // Get the wish stage
    const wishStage = wish.stages.find((stage) => stage.id.equals(wishStageId));

    // Update the wish and wish stage using the repository
    this.wishRepository.updateWish(wish);
    this.wishRepository.updateWishStage(wishStage);

    // Save changes using Unit of Work
    await this.unitOfWork.commitChanges();
  }
}
