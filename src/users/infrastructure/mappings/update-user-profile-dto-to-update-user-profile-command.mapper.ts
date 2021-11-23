import { UpdateUserProfileDto } from '../dtos';
import { UpdateUserProfileCommand } from '../../application/commands';

export function updateUserProfileDtoToUpdateUserProfileCommand(
  dto: UpdateUserProfileDto,
): UpdateUserProfileCommand {
  return new UpdateUserProfileCommand(
    dto.id,
    dto.firstName,
    dto.lastName,
    dto.birthday,
    dto.biography,
    dto.profilePicture,
  );
}
