import { User } from '../../domain/entities';
import { OutputUserDto } from '../dtos';

export function userToOutputUserDto(user: User): OutputUserDto {
  const dto = new OutputUserDto();

  dto.id = user.id.value.toString();
  dto.email = user.email.getEmail;
  dto.username = user.username.getUsername;
  dto.isVerified = user.isVerified;
  dto.isBlocked = user.isBlocked;
  dto.firstName = user.firstName.getFirstName;
  dto.lastName = user.lastName.getLastName;
  dto.birthday = user.birthday.getIso8601;
  dto.createdAt = user.createdAt.getIso8601;
  dto.updatedAt = user.updatedAt.getIso8601;
  dto.biography = user.biography.getBiography;
  dto.roles = user.roles;
  dto.profilePicture = user.profilePicture?.getUrl ?? null;
  dto.deletedAt = user.deletedAt?.getIso8601 ?? null;

  return dto;
}
