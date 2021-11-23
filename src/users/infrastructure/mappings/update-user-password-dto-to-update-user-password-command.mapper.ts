import { UpdateUserPasswordCommand } from '../../application/commands';
import { UpdateUserPasswordDto } from '../dtos';

export function updateUserPasswordDtoToUpdateUserPasswordCommand(
  dto: UpdateUserPasswordDto,
): UpdateUserPasswordCommand {
  return new UpdateUserPasswordCommand(dto.id, dto.password);
}
