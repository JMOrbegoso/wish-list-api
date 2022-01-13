import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateWishStageCommand } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import {
  MillisecondsDate,
  WebUrl,
} from '../../../../shared/domain/value-objects';
import { Wish, WishId, WishStage, WishStageId } from '../../../domain/entities';
import { WishRepository } from '../../../domain/repositories';
import { WishDescription, WishTitle } from '../../../domain/value-objects';

@CommandHandler(CreateWishStageCommand)
export class CreateWishStageHandler
  implements ICommandHandler<CreateWishStageCommand>
{
  constructor(
    private readonly wishRepository: WishRepository,
    private readonly unitOfWork: UnitOfWork,
  ) {}

  async execute(command: CreateWishStageCommand): Promise<void> {
    // Generate the properties of the new Wish
    const wishStageId = WishStageId.create(command.id);
    const wishId = WishId.create(command.wishId);
    const title = WishTitle.create(command.title);
    const description = WishDescription.create(command.description);
    const createdAt = MillisecondsDate.create();
    const urls = command.urls.map((url) => WebUrl.create(url));
    const imageUrls = command.imageUrls.map((url) => WebUrl.create(url));

    // Check if the wish stage exist
    const wishStageExist = await this.wishRepository.getWishStageById(
      wishStageId,
    );
    if (wishStageExist) throw new BadRequestException('Id already in use.');

    // Check if the wish exist
    const wish = await this.wishRepository.getOneById(wishId);
    if (!wish) throw new NotFoundException();

    // Check if the wish is deleted
    if (wish.isDeleted) throw new BadRequestException('Wish is deleted.');

    // Check if the wish have the max number of stages
    if (wish.stages.length === Wish.MaxStages)
      throw new BadRequestException('Wish has the maximum number of stages.');

    // Create the new wish stage
    const wishStage = WishStage.create(
      wishStageId,
      title,
      description,
      createdAt,
      urls,
      imageUrls,
    );

    // Add the new stage to the wish
    wish.addStage(wishStage);

    // Add the new wish to the wishes repository
    this.wishRepository.updateWish(wish);
    this.wishRepository.addWishStage(wishStage, wish.id);

    // Save changes using Unit of Work
    await this.unitOfWork.commitChanges();
  }
}
