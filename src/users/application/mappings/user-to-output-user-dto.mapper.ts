import { User } from '../../domain/entities';
import { OutputUserDto } from '../dtos';

export function userToOutputUserDto(user: User): OutputUserDto {
  const dto = new OutputUserDto();

  dto.id = user.id.getId;
  dto.email = user.email.getEmail;
  dto.userName = user.userName.getUserName;
  dto.isVerified = user.isVerified.getStatus;
  dto.isBlocked = user.isBlocked.getStatus;
  dto.firstName = user.firstName.getFirstName;
  dto.lastName = user.lastName.getLastName;
  dto.birthday = user.birthday.getMilliseconds;
  dto.createdAt = user.createdAt.getMilliseconds;
  dto.updatedAt = user.updatedAt.getMilliseconds;
  dto.biography = user.biography.getBiography;
  dto.profilePicture = user.profilePicture?.getUrl ?? null;
  dto.deletedAt = user.deletedAt?.getMilliseconds ?? null;

  return dto;
}
