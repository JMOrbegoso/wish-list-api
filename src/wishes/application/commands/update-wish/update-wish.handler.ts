import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateWishCommand } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import {
  MillisecondsDate,
  WebUrl,
} from '../../../../shared/domain/value-objects';
import { WishId } from '../../../domain/entities';
import { WishRepository } from '../../../domain/repositories';
import {
  CategoryName,
  WishDescription,
  WishPrivacyLevel,
  WishTitle,
} from '../../../domain/value-objects';

@CommandHandler(UpdateWishCommand)
export class UpdateWishHandler implements ICommandHandler<UpdateWishCommand> {
  constructor(
    private readonly wishRepository: WishRepository,
    private readonly unitOfWork: UnitOfWork,
  ) {}

  async execute(command: UpdateWishCommand): Promise<void> {
    // Generate the properties of the new Wish
    const wishId = WishId.create(command.id);
    const title = WishTitle.create(command.title);
    const description = WishDescription.create(command.description);
    const privacyLevel = WishPrivacyLevel.create(command.privacyLevel);
    const urls = command.urls.map((url) => WebUrl.create(url));
    const imageUrls = command.imageUrls.map((url) => WebUrl.create(url));
    const categories = command.categories.map((url) =>
      CategoryName.create(url),
    );
    const startedAt = command.startedAt
      ? MillisecondsDate.createFromMilliseconds(command.startedAt)
      : null;
    const completedAt = command.completedAt
      ? MillisecondsDate.createFromMilliseconds(command.completedAt)
      : null;

    // Get the wish  by id
    const wish = await this.wishRepository.getOneById(wishId);
    if (!wish) throw new NotFoundException();

    // Check if the wish is deleted
    if (wish.isDeleted) throw new BadRequestException('Wish is deleted.');

    // Update the wish
    wish.update(
      title,
      description,
      privacyLevel,
      urls,
      imageUrls,
      categories,
      startedAt,
      completedAt,
    );

    // Save the wish
    this.wishRepository.updateWish(wish);

    // Save changes using Unit of Work
    await this.unitOfWork.commitChanges();
  }
}
