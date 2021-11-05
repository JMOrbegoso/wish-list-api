import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UnitOfWork } from '../../../core/domain/repositories';
import { User } from '../../domain/entities';
import { CreateUserCommand } from '.';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly unitOfWork: UnitOfWork) {}

  async execute(command: CreateUserCommand): Promise<void> {
    const user = User.create(
      command.id,
      command.email,
      command.userName,
      command.passwordHash,
      command.isVerified,
      command.firstName,
      command.lastName,
      command.birthday,
      command.createdAt,
      command.updatedAt,
      command.biography,
      command.profilePicture,
      null,
    );
    this.unitOfWork.userRepository.add(user);
    await this.unitOfWork.commitChanges();
  }
}
