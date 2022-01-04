import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateWishCommand } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import { UniqueId, WebUrl } from '../../../../shared/domain/value-objects';
import { WishRepository } from '../../../domain/repositories';
import {
  CategoryName,
  WishDescription,
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
    const id = UniqueId.create(command.id);
    const title = WishTitle.create(command.title);
    const description = WishDescription.create(command.description);
    const urls = command.urls.map((url) => WebUrl.create(url));
    const imageUrls = command.imageUrls.map((url) => WebUrl.create(url));
    const categories = command.categories.map((url) =>
      CategoryName.create(url),
    );

    // Get the wish  by id
    const wish = await this.wishRepository.getOneById(id);
    if (!wish) throw new NotFoundException();

    // Check if the wish is deleted
    if (wish.isDeleted) throw new BadRequestException('Wish is deleted.');

    // Update the wish
    wish.update(title, description, urls, imageUrls, categories);

    // Save the wish
    this.wishRepository.updateWish(wish);

    // Save changes using Unit of Work
    await this.unitOfWork.commitChanges();
  }
}
