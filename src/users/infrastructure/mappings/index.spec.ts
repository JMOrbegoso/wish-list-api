import { Mapper } from '.';
import { User } from '../../domain/entities';
import { UserEntity } from '../persistence/entities';
import { UniqueId, MillisecondsDate } from '../../../core/domain/value-objects';
import {
  Biography,
  Email,
  FirstName,
  IsVerified,
  IsBlocked,
  LastName,
  PasswordHash,
  UserName,
} from '../../domain/value-objects';
import { CreateUserDto, UpdateUserDto } from '../dtos';
import { normalizeString } from '../../../core/helpers';

describe('users', () => {
  describe('infrastructure', () => {
    describe('mappings', () => {
      const id = 'id';
      const email = 'john@DOE.com';
      const username = 'John_Doe';
      const password = 'password';
      const hash = 'password hash';
      const verificationStatus = true;
      const blockedStatus = true;
      const firstNameText = 'John';
      const lastNameText = 'Doe';
      const birthDate = new Date('2000-05-05');
      const birthDateMilliseconds = birthDate.getTime();
      const creationDate = new Date();
      const creationDateMilliseconds = creationDate.getTime();
      const bio = 'A nice person.';

      describe('map UserEntity to User', () => {
        it('should map UserEntity to User keeping all the property values', () => {
          // Arrange
          const userEntity = new UserEntity();
          userEntity.id = id;
          userEntity.email = email;
          userEntity.userName = username;
          userEntity.passwordHash = hash;
          userEntity.isVerified = verificationStatus;
          userEntity.isBlocked = blockedStatus;
          userEntity.firstName = firstNameText;
          userEntity.lastName = lastNameText;
          userEntity.birthday = birthDate;
          userEntity.createdAt = creationDate;
          userEntity.updatedAt = creationDate;
          userEntity.biography = bio;
          userEntity.profilePicture = null;
          userEntity.deletedAt = null;

          // Act
          const user = Mapper.toUserDomain(userEntity);

          // Assert
          expect(user.id.getId).toBe(id);
          expect(user.email.getEmail).toBe(email);
          expect(user.userName.getUserName).toBe(username);
          expect(user.passwordHash.getPasswordHash).toBe(hash);
          expect(user.isVerified.getStatus).toBe(verificationStatus);
          expect(user.isBlocked.getStatus).toBe(blockedStatus);
          expect(user.firstName.getFirstName).toBe(firstNameText);
          expect(user.lastName.getLastName).toBe(lastNameText);
          expect(user.birthday.getMilliseconds).toBe(birthDateMilliseconds);
          expect(user.createdAt.getMilliseconds).toBe(creationDateMilliseconds);
          expect(user.updatedAt.getMilliseconds).toBe(creationDateMilliseconds);
          expect(user.biography.getBiography).toBe(bio);
          expect(user.profilePicture).toBeNull();
          expect(user.deletedAt).toBeNull();
        });
      });

      describe('map User to UserEntity', () => {
        it('should map User to UserEntity keeping all the property values', () => {
          // Arrange
          const uniqueId = UniqueId.create(id);
          const userEmail = Email.create(email);
          const userName = UserName.create(username);
          const passwordHash = PasswordHash.create(hash);
          const isVerified = IsVerified.create(verificationStatus);
          const isBlocked = IsBlocked.create(blockedStatus);
          const firstName = FirstName.create(firstNameText);
          const lastName = LastName.create(lastNameText);
          const birthday = MillisecondsDate.createFromDate(birthDate);
          const creationDate = MillisecondsDate.createFromMilliseconds(
            creationDateMilliseconds,
          );
          const biography = Biography.create(bio);

          const user = User.create(
            uniqueId,
            userEmail,
            userName,
            passwordHash,
            isVerified,
            isBlocked,
            firstName,
            lastName,
            birthday,
            creationDate,
            creationDate,
            biography,
          );

          // Act
          const userEntity = Mapper.toUserEntity(user);

          // Assert
          expect(userEntity.id).toBe(id);
          expect(userEntity.email).toBe(email);
          expect(userEntity.normalizedEmail).toBe(normalizeString(email));
          expect(userEntity.userName).toBe(username);
          expect(userEntity.normalizedUserName).toBe(normalizeString(username));
          expect(userEntity.passwordHash).toBe(hash);
          expect(userEntity.isVerified).toBe(verificationStatus);
          expect(userEntity.isBlocked).toBe(blockedStatus);
          expect(userEntity.firstName).toBe(firstNameText);
          expect(userEntity.lastName).toBe(lastNameText);
          expect(userEntity.birthday.getTime()).toBe(birthDateMilliseconds);
          expect(userEntity.biography).toBe(bio);
        });
      });

      describe('map CreateUserDto to CreateUserCommand', () => {
        it('should map CreateUserDto to a CreateUserCommand keeping all the property values', () => {
          // Arrange
          const dto = new CreateUserDto();
          dto.id = id;
          dto.email = email;
          dto.userName = username;
          dto.password = password;
          dto.firstName = firstNameText;
          dto.lastName = lastNameText;
          dto.birthday = birthDateMilliseconds;
          dto.biography = bio;
          dto.profilePicture = null;

          // Act
          const command = Mapper.toCreateUserCommand(dto);

          // Assert
          expect(command.id).toBe(id);
          expect(command.email).toBe(email);
          expect(command.userName).toBe(username);
          expect(command.password).toBe(password);
          expect(command.firstName).toBe(firstNameText);
          expect(command.lastName).toBe(lastNameText);
          expect(command.birthday).toBe(birthDateMilliseconds);
          expect(command.biography).toBe(bio);
          expect(command.profilePicture).toBeNull();
        });
      });

      describe('map UpdateUserDto to UpdateUserCommand', () => {
        it('should map UpdateUserDto to an UpdateUserCommand keeping all the property values', () => {
          // Arrange
          const dto = new UpdateUserDto();
          dto.id = id;
          dto.firstName = firstNameText;
          dto.lastName = lastNameText;
          dto.birthday = birthDateMilliseconds;
          dto.biography = bio;
          dto.profilePicture = null;

          // Act
          const command = Mapper.toUpdateUserCommand(dto);

          // Assert
          expect(command.id).toBe(id);
          expect(command.firstName).toBe(firstNameText);
          expect(command.lastName).toBe(lastNameText);
          expect(command.birthday).toBe(birthDateMilliseconds);
          expect(command.biography).toBe(bio);
          expect(command.profilePicture).toBeNull();
        });
      });
    });
  });
});
