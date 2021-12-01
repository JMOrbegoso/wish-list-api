import { CreateUserCommand } from '../../application/commands';
import { CreateUserDto } from '../dtos';

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
