import { User } from '../../../auth/domain/entities';
import { UserEntity } from '../persistence/entities';
import { UniqueId, MillisecondsDate } from '../../../core/domain/value-objects';
import {
  Biography,
  Email,
  FirstName,
  IsVerified,
  LastName,
  PasswordHash,
  UserName,
} from '../../../auth/domain/value-objects';
import { CreateUserDto } from '../dtos';
import { toNewUser, toUser, toUserEntity } from '.';

describe('auth', () => {
  describe('infrastructure', () => {
    describe('mappings', () => {
      const id = 'id';
      const email = 'john@doe.com';
      const username = 'john_doe';
      const password = 'password';
      const hash = 'password hash';
      const verificationStatus = true;
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
          userEntity.firstName = firstNameText;
          userEntity.lastName = lastNameText;
          userEntity.birthday = birthDate;
          userEntity.createdAt = creationDate;
          userEntity.updatedAt = creationDate;
          userEntity.biography = bio;
          userEntity.profilePicture = null;
          userEntity.deletedAt = null;

          // Act
          const user = toUser(userEntity);

          // Assert
          expect(user.id.getId).toBe(id);
          expect(user.email.getEmail).toBe(email);
          expect(user.userName.getUserName).toBe(username);
          expect(user.passwordHash.getPasswordHash).toBe(hash);
          expect(user.isVerified.getStatus).toBe(verificationStatus);
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
            firstName,
            lastName,
            birthday,
            creationDate,
            creationDate,
            biography,
          );

          // Act
          const userEntity = toUserEntity(user);

          // Assert
          expect(userEntity.id).toBe(id);
          expect(userEntity.email).toBe(email);
          expect(userEntity.userName).toBe(username);
          expect(userEntity.passwordHash).toBe(hash);
          expect(userEntity.isVerified).toBe(verificationStatus);
          expect(userEntity.firstName).toBe(firstNameText);
          expect(userEntity.lastName).toBe(lastNameText);
          expect(userEntity.birthday.getTime()).toBe(birthDateMilliseconds);
          expect(userEntity.biography).toBe(bio);
        });
      });

      describe('map CreateUserDto to User', () => {
        it('should map CreateUserDto to new User keeping all the property values', () => {
          // Arrange
          const dto = new CreateUserDto();
          dto.email = email;
          dto.userName = username;
          dto.password = password;
          dto.firstName = firstNameText;
          dto.lastName = lastNameText;
          dto.birthday = birthDateMilliseconds;
          dto.biography = bio;
          dto.profilePicture = null;

          // Act
          const user = toNewUser(dto);

          // Assert
          expect(user.id.getId).not.toBeNull();
          expect(user.email.getEmail).toBe(email);
          expect(user.userName.getUserName).toBe(username);
          expect(user.passwordHash.getPasswordHash).not.toBeNull();
          expect(user.isVerified.getStatus).toBe(false);
          expect(user.firstName.getFirstName).toBe(firstNameText);
          expect(user.lastName.getLastName).toBe(lastNameText);
          expect(user.birthday.getMilliseconds).toBe(birthDateMilliseconds);
          expect(user.createdAt.getMilliseconds).not.toBeNull();
          expect(user.updatedAt.getMilliseconds).not.toBeNull();
          expect(user.biography.getBiography).toBe(bio);
          expect(user.profilePicture).toBeNull();
          expect(user.deletedAt).toBeNull();
        });
      });
    });
  });
});
