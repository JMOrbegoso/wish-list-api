import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CompleteWishCommand } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import {
  MillisecondsDate,
  UniqueId,
} from '../../../../shared/domain/value-objects';
import { WishRepository } from '../../../domain/repositories';

@CommandHandler(CompleteWishCommand)
export class CompleteWishHandler
  implements ICommandHandler<CompleteWishCommand>
{
  constructor(
    private readonly wishRepository: WishRepository,
    private readonly unitOfWork: UnitOfWork,
  ) {}

  async execute(command: CompleteWishCommand): Promise<void> {
    // Generate the properties of the new Wish
    const id = UniqueId.create(command.id);

    // Get the wish  by id
    const wish = await this.wishRepository.getOne(id);
    if (!wish) throw new NotFoundException();

    // Check if the wish is deleted
    if (wish.isDeleted) throw new BadRequestException('Wish is deleted.');

    // Check if the wish is completed
    if (wish.isCompleted)
      throw new BadRequestException('Wish is already completed.');

    // Complete the wish
    const completionDate = MillisecondsDate.createFromMilliseconds(
      command.millisecondsDate,
    );
    wish.complete(completionDate);

    // Save the wish
    await this.wishRepository.update(wish);

    // Save changes using Unit of Work
    await this.unitOfWork.commitChanges();
  }
}
