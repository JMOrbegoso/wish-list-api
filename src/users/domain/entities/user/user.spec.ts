import { User } from '..';
import {
  UniqueId,
  MillisecondsDate,
} from '../../../../core/domain/value-objects';
import {
  Email,
  UserName,
  PasswordHash,
  IsVerified,
  FirstName,
  LastName,
  Biography,
} from '../../value-objects';

describe('users', () => {
  describe('domain', () => {
    describe('entities', () => {
      describe('user', () => {
        it('should create a User instance and should store the value', () => {
          // Arrange

          // Act
          const id = 'id';
          const email = 'john@doe.com';
          const username = 'john_doe';
          const hash = 'password hash';
          const verificationStatus = true;
          const firstNameText = 'John';
          const lastNameText = 'Doe';
          const birth = new Date('2000-05-05');
          const creationDateMilliseconds = Date.now();
          const bio = 'A nice person.';

          const uniqueId = UniqueId.create(id);
          const userEmail = Email.create(email);
          const userName = UserName.create(username);
          const passwordHash = PasswordHash.create(hash);
          const isVerified = IsVerified.create(verificationStatus);
          const firstName = FirstName.create(firstNameText);
          const lastName = LastName.create(lastNameText);
          const birthday = MillisecondsDate.createFromDate(birth);
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

          // Assert
          expect(user.id.getId).toBe(id);
          expect(user.email.getEmail).toBe(email);
          expect(user.userName.getUserName).toBe(username);
          expect(user.passwordHash.getPasswordHash).toBe(hash);
          expect(user.isVerified.getStatus).toBe(verificationStatus);
          expect(user.firstName.getFirstName).toBe(firstNameText);
          expect(user.lastName.getLastName).toBe(lastNameText);
          expect(user.birthday.getMilliseconds).toBe(birth.getTime());
          expect(user.createdAt.getMilliseconds).toBe(creationDateMilliseconds);
          expect(user.updatedAt.getMilliseconds).toBe(creationDateMilliseconds);
          expect(user.biography.getBiography).toBe(bio);
        });

        it('create two User instances with different ids and compare them using "equals" should return false', () => {
          // Arrange

          // Act
          const id_1 = 'id_1';
          const id_2 = 'id_2';
          const email = 'john@doe.com';
          const username = 'john_doe';
          const hash = 'password hash';
          const verificationStatus = true;
          const firstNameText = 'John';
          const lastNameText = 'Doe';
          const birth = new Date('2000-05-05');
          const creationDateMilliseconds = Date.now();
          const bio = 'A nice person.';

          const uniqueId_1 = UniqueId.create(id_1);
          const uniqueId_2 = UniqueId.create(id_2);
          const userEmail = Email.create(email);
          const userName = UserName.create(username);
          const passwordHash = PasswordHash.create(hash);
          const isVerified = IsVerified.create(verificationStatus);
          const firstName = FirstName.create(firstNameText);
          const lastName = LastName.create(lastNameText);
          const birthday = MillisecondsDate.createFromDate(birth);
          const creationDate = MillisecondsDate.createFromMilliseconds(
            creationDateMilliseconds,
          );
          const biography = Biography.create(bio);

          const user_1 = User.create(
            uniqueId_1,
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
          const user_2 = User.create(
            uniqueId_2,
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

          const result = user_1.equals(user_2);

          // Assert
          expect(result).toBe(false);
        });

        it('create two User instances with the same value and compare them using "equals" should return true', () => {
          // Arrange

          // Act
          const id = 'id';
          const email_1 = 'john@doe.com';
          const email_2 = 'johnny@doe.com';
          const username = 'john_doe';
          const hash = 'password hash';
          const verificationStatus = true;
          const firstNameText = 'John';
          const lastNameText = 'Doe';
          const birth = new Date('2000-05-05');
          const creationDateMilliseconds = Date.now();
          const bio = 'A nice person.';

          const uniqueId = UniqueId.create(id);
          const userEmail_1 = Email.create(email_1);
          const userEmail_2 = Email.create(email_2);
          const userName = UserName.create(username);
          const passwordHash = PasswordHash.create(hash);
          const isVerified = IsVerified.create(verificationStatus);
          const firstName = FirstName.create(firstNameText);
          const lastName = LastName.create(lastNameText);
          const birthday = MillisecondsDate.createFromDate(birth);
          const creationDate = MillisecondsDate.createFromMilliseconds(
            creationDateMilliseconds,
          );
          const biography = Biography.create(bio);

          const user_1 = User.create(
            uniqueId,
            userEmail_1,
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
          const user_2 = User.create(
            uniqueId,
            userEmail_2,
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

          const result = user_1.equals(user_2);

          // Assert
          expect(result).toBe(true);
        });
      });
    });
  });
});
