import { UpdateUserDto } from '../dtos';
import { UpdateUserCommand } from '../../../users/application/commands';

export function updateUserDtoToUpdateUserCommand(
  dto: UpdateUserDto,
): UpdateUserCommand {
  return new UpdateUserCommand(
    dto.id,
    dto.firstName,
    dto.lastName,
    dto.birthday,
    dto.biography,
    dto.profilePicture,
  );
}
