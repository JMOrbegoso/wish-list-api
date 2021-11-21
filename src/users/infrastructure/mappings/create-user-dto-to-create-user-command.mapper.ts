import { CreateUserDto } from '../dtos';
import { CreateUserCommand } from '../../../users/application/commands';

export function createUserDtoToCreateUserCommand(
  dto: CreateUserDto,
): CreateUserCommand {
  return new CreateUserCommand(
    dto.id,
    dto.email,
    dto.username,
    dto.password,
    dto.firstName,
    dto.lastName,
    dto.birthday,
    dto.biography,
    dto.profilePicture,
  );
}
