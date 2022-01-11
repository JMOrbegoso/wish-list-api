import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateWishCommand } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import {
  MillisecondsDate,
  UniqueId,
  WebUrl,
} from '../../../../shared/domain/value-objects';
import { UserRepository } from '../../../../users/domain/repositories';
import { Wish, Wisher } from '../../../domain/entities';
import { WishRepository } from '../../../domain/repositories';
import {
  CategoryName,
  WishDescription,
  WishPrivacyLevel,
  WishTitle,
} from '../../../domain/value-objects';

@CommandHandler(CreateWishCommand)
export class CreateWishHandler implements ICommandHandler<CreateWishCommand> {
  constructor(
    private readonly wishRepository: WishRepository,
    private readonly userRepository: UserRepository,
    private readonly unitOfWork: UnitOfWork,
  ) {}

  async execute(command: CreateWishCommand): Promise<void> {
    // Generate the properties of the new Wish
    const id = UniqueId.create(command.id);
    const wisherId = UniqueId.create(command.wisherId);
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

    // Check if the user exist
    const user = await this.userRepository.getOneById(wisherId);
    if (!user) throw new NotFoundException();

    // Check if the id is already in use by other wish
    const wishExists = await this.wishRepository.getOneById(id);
    if (wishExists) throw new BadRequestException('Id already in use.');

    // Check if the wisher exist
    let wisher = await this.wishRepository.getWisherById(wisherId);
    if (!wisher) {
      // Create the new wisher
      wisher = Wisher.create(wisherId);

      // Add the new wisher to the wishers repository
      this.wishRepository.addWisher(wisher);
    }

    // Create the new wish
    const wish = Wish.create(
      id,
      title,
      description,
      privacyLevel,
      MillisecondsDate.create(),
      MillisecondsDate.create(),
      wisher,
      urls,
      imageUrls,
      categories,
      [],
      null,
      startedAt,
      completedAt,
    );

    // Add the new wish to the wishes repository
    this.wishRepository.addWish(wish);

    // Save changes using Unit of Work
    await this.unitOfWork.commitChanges();
  }
}
