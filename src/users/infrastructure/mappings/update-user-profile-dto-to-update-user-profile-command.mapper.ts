import { UpdateUserProfileCommand } from '../../application/commands';
import { UpdateUserProfileDto } from '../dtos';

export function updateUserProfileDtoToUpdateUserProfileCommand(
  dto: UpdateUserProfileDto,
): UpdateUserProfileCommand {
  return new UpdateUserProfileCommand(
    dto.id,
    dto.firstName,
    dto.lastName,
    dto.birthday,
    dto.biography,
  );
}
