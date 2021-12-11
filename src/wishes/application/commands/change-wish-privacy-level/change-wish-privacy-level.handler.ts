import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ChangeWishPrivacyLevelCommand } from '..';
import { UnitOfWork } from '../../../../core/domain/repositories';
import { UniqueId } from '../../../../core/domain/value-objects';
import { WishRepository } from '../../../domain/repositories';
import { WishPrivacyLevel } from '../../../domain/value-objects';

@CommandHandler(ChangeWishPrivacyLevelCommand)
export class ChangeWishPrivacyLevelHandler
  implements ICommandHandler<ChangeWishPrivacyLevelCommand>
{
  constructor(
    private readonly wishRepository: WishRepository,
    private readonly unitOfWork: UnitOfWork,
  ) {}

  async execute(command: ChangeWishPrivacyLevelCommand): Promise<void> {
    // Generate the properties of the new Wish
    const id = UniqueId.create(command.id);

    // Get the wish  by id
    const wish = await this.wishRepository.getOne(id);
    if (!wish) throw new NotFoundException();

    // Check if the wish is deleted
    if (wish.isDeleted) throw new BadRequestException('Wish is deleted.');

    // Complete the wish
    const wishPrivacyLevel = WishPrivacyLevel.create(command.privacyLevel);
    wish.changePrivacyLevel(wishPrivacyLevel);

    // Save the wish
    await this.wishRepository.update(wish);

    // Save changes using Unit of Work
    await this.unitOfWork.commitChanges();
  }
}
