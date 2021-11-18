import { userToUserEntity } from '.';
import { User } from '../../domain/entities';
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
import { normalizeString } from '../../../core/helpers';

describe('users', () => {
  describe('infrastructure', () => {
    describe('mappings', () => {
      describe('User to UserEntity', () => {
        const id = 'id';
        const email = 'john@DOE.com';
        const username = 'John_Doe';
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
          const userEntity = userToUserEntity(user);

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
    });
  });
});
