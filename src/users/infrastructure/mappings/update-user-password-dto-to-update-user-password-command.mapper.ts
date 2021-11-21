import { UpdateUserPasswordDto } from '../dtos';
import { UpdateUserPasswordCommand } from '../../application/commands';

export function updateUserPasswordDtoToUpdateUserPasswordCommand(
  dto: UpdateUserPasswordDto,
): UpdateUserPasswordCommand {
  return new UpdateUserPasswordCommand(dto.id, dto.password);
}
