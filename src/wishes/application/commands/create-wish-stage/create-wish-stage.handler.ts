import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateWishStageCommand } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import {
  MillisecondsDate,
  UniqueId,
  WebUrl,
} from '../../../../shared/domain/value-objects';
import { Wish, WishStage } from '../../../domain/entities';
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
    const id = UniqueId.create(command.id);
    const wishId = UniqueId.create(command.wishId);
    const title = WishTitle.create(command.title);
    const description = WishDescription.create(command.description);
    const createdAt = MillisecondsDate.create();
    const urls = command.urls.map((url) => WebUrl.create(url));
    const imageUrls = command.imageUrls.map((url) => WebUrl.create(url));

    // Check if the wish stage exist
    const wishStageExist = await this.wishRepository.getWishStageById(id);
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
      id,
      title,
      description,
      createdAt,
      urls,
      imageUrls,
    );

    // Add the new stage to the wish
    wish.addStage(wishStage);

    // Add the new wish to the wishes repository
    await this.wishRepository.update(wish);

    // Save changes using Unit of Work
    await this.unitOfWork.commitChanges();
  }
}
