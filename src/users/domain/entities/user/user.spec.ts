import { User } from '..';
import {
  UniqueId,
  MillisecondsDate,
  WebUrl,
} from '../../../../core/domain/value-objects';
import {
  Email,
  UserName,
  PasswordHash,
  IsVerified,
  IsBlocked,
  FirstName,
  LastName,
  Biography,
} from '../../value-objects';

describe('users', () => {
  describe('domain', () => {
    describe('entities', () => {
      describe('user', () => {
        describe('creation', () => {
          it('should create a User instance and should store the value', () => {
            // Arrange

            // Act
            const id = 'id';
            const email = 'john@doe.com';
            const username = 'john_doe';
            const hash = 'password hash';
            const verificationStatus = true;
            const blockedStatus = true;
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
            const isBlocked = IsBlocked.create(blockedStatus);
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
              isBlocked,
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
            expect(user.createdAt.getMilliseconds).toBe(
              creationDateMilliseconds,
            );
            expect(user.updatedAt.getMilliseconds).toBe(
              creationDateMilliseconds,
            );
            expect(user.biography.getBiography).toBe(bio);
          });
        });

        describe('comparation', () => {
          it('create two User instances with different ids and compare them using "equals" should return false', () => {
            // Arrange

            // Act
            const id_1 = 'id_1';
            const id_2 = 'id_2';
            const email = 'john@doe.com';
            const username = 'john_doe';
            const hash = 'password hash';
            const verificationStatus = true;
            const blockedStatus = true;
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
            const isBlocked = IsBlocked.create(blockedStatus);
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
              isBlocked,
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
              isBlocked,
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
            const blockedStatus = true;
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
            const isBlocked = IsBlocked.create(blockedStatus);
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
              isBlocked,
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
              isBlocked,
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

        describe('update properties with the valid values should update them and update the updateAt property', () => {
          const id = 'id';
          const email = 'john@doe.com';
          const username = 'john_doe';
          const hash = 'password hash';
          const verificationStatus = true;
          const blockedStatus = true;
          const firstNameText = 'John';
          const lastNameText = 'Doe';
          const birth = new Date('2000-05-05');
          const creationDateMilliseconds = Date.now();
          const bio = 'A nice person.';
          const profilePictureUrl = 'https://www.example.com';

          const uniqueId = UniqueId.create(id);
          const userEmail = Email.create(email);
          const userName = UserName.create(username);
          const passwordHash = PasswordHash.create(hash);
          const isVerified = IsVerified.create(verificationStatus);
          const isBlocked = IsBlocked.create(blockedStatus);
          const firstName = FirstName.create(firstNameText);
          const lastName = LastName.create(lastNameText);
          const birthday = MillisecondsDate.createFromDate(birth);
          const creationDate = MillisecondsDate.createFromMilliseconds(
            creationDateMilliseconds,
          );
          const biography = Biography.create(bio);
          const profilePicture = WebUrl.create(profilePictureUrl);
          const deletedAtDate = MillisecondsDate.create();

          it('update email', () => {
            // Arrange
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
              profilePicture,
            );

            const originalId = user.id;
            const originalUserName = user.userName;
            const originalPasswordHash = user.passwordHash;
            const originalIsVerified = user.isVerified;
            const originalIsBlocked = user.isBlocked;
            const originalFirstName = user.firstName;
            const originalLastName = user.lastName;
            const originalBirthday = user.birthday;
            const originalCreatedAt = user.createdAt;
            const originalUpdatedAt = user.updatedAt;
            const originalBiography = user.biography;
            const originalProfilePicture = user.profilePicture;
            const originalDeletedAt = user.deletedAt;

            const newEmailText = 'new@email.com';
            const newEmail = Email.create(newEmailText);

            // Act
            user.email = newEmail;

            // Assert
            expect(user.email.getEmail).toBe(newEmailText);
            expect(user.updatedAt.getMilliseconds).not.toBe(
              originalUpdatedAt.getMilliseconds,
            );

            expect(user.id).toBe(originalId);
            expect(user.userName).toBe(originalUserName);
            expect(user.passwordHash).toBe(originalPasswordHash);
            expect(user.isVerified).toBe(originalIsVerified);
            expect(user.isBlocked).toBe(originalIsBlocked);
            expect(user.firstName).toBe(originalFirstName);
            expect(user.lastName).toBe(originalLastName);
            expect(user.birthday).toBe(originalBirthday);
            expect(user.createdAt).toBe(originalCreatedAt);
            expect(user.biography).toBe(originalBiography);
            expect(user.profilePicture).toBe(originalProfilePicture);
            expect(user.deletedAt).toBe(originalDeletedAt);
          });

          it('update username', () => {
            // Arrange
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
              profilePicture,
            );

            const originalId = user.id;
            const originalEmail = user.email;
            const originalPasswordHash = user.passwordHash;
            const originalIsVerified = user.isVerified;
            const originalIsBlocked = user.isBlocked;
            const originalFirstName = user.firstName;
            const originalLastName = user.lastName;
            const originalBirthday = user.birthday;
            const originalCreatedAt = user.createdAt;
            const originalUpdatedAt = user.updatedAt;
            const originalBiography = user.biography;
            const originalProfilePicture = user.profilePicture;
            const originalDeletedAt = user.deletedAt;

            const newUserNameText = 'new_username';
            const newUserName = UserName.create(newUserNameText);

            // Act
            user.userName = newUserName;

            // Assert
            expect(user.userName.getUserName).toBe(newUserNameText);
            expect(user.updatedAt.getMilliseconds).not.toBe(
              originalUpdatedAt.getMilliseconds,
            );

            expect(user.id).toBe(originalId);
            expect(user.email).toBe(originalEmail);
            expect(user.passwordHash).toBe(originalPasswordHash);
            expect(user.isVerified).toBe(originalIsVerified);
            expect(user.isBlocked).toBe(originalIsBlocked);
            expect(user.firstName).toBe(originalFirstName);
            expect(user.lastName).toBe(originalLastName);
            expect(user.birthday).toBe(originalBirthday);
            expect(user.createdAt).toBe(originalCreatedAt);
            expect(user.biography).toBe(originalBiography);
            expect(user.profilePicture).toBe(originalProfilePicture);
            expect(user.deletedAt).toBe(originalDeletedAt);
          });

          it('update passwordHash', () => {
            // Arrange
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
              profilePicture,
            );

            const originalId = user.id;
            const originalEmail = user.email;
            const originalUserName = user.userName;
            const originalIsVerified = user.isVerified;
            const originalIsBlocked = user.isBlocked;
            const originalFirstName = user.firstName;
            const originalLastName = user.lastName;
            const originalBirthday = user.birthday;
            const originalCreatedAt = user.createdAt;
            const originalUpdatedAt = user.updatedAt;
            const originalBiography = user.biography;
            const originalProfilePicture = user.profilePicture;
            const originalDeletedAt = user.deletedAt;

            const newPasswordHashText = 'new_password_hash';
            const newPasswordHash = PasswordHash.create(newPasswordHashText);

            // Act
            user.passwordHash = newPasswordHash;

            // Assert
            expect(user.passwordHash.getPasswordHash).toBe(newPasswordHashText);
            expect(user.updatedAt.getMilliseconds).not.toBe(
              originalUpdatedAt.getMilliseconds,
            );

            expect(user.id).toBe(originalId);
            expect(user.email).toBe(originalEmail);
            expect(user.userName).toBe(originalUserName);
            expect(user.isVerified).toBe(originalIsVerified);
            expect(user.isBlocked).toBe(originalIsBlocked);
            expect(user.firstName).toBe(originalFirstName);
            expect(user.lastName).toBe(originalLastName);
            expect(user.birthday).toBe(originalBirthday);
            expect(user.createdAt).toBe(originalCreatedAt);
            expect(user.biography).toBe(originalBiography);
            expect(user.profilePicture).toBe(originalProfilePicture);
            expect(user.deletedAt).toBe(originalDeletedAt);
          });

          it('update isVerified', () => {
            // Arrange
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
              profilePicture,
            );

            const originalId = user.id;
            const originalEmail = user.email;
            const originalUserName = user.userName;
            const originalPasswordHash = user.passwordHash;
            const originalIsBlocked = user.isBlocked;
            const originalFirstName = user.firstName;
            const originalLastName = user.lastName;
            const originalBirthday = user.birthday;
            const originalCreatedAt = user.createdAt;
            const originalUpdatedAt = user.updatedAt;
            const originalBiography = user.biography;
            const originalProfilePicture = user.profilePicture;
            const originalDeletedAt = user.deletedAt;

            const newIsVerifiedValue = !verificationStatus;
            const newIsVerified = IsVerified.create(newIsVerifiedValue);

            // Act
            user.isVerified = newIsVerified;

            // Assert
            expect(user.isVerified.getStatus).toBe(newIsVerifiedValue);
            expect(user.updatedAt.getMilliseconds).not.toBe(
              originalUpdatedAt.getMilliseconds,
            );

            expect(user.id).toBe(originalId);
            expect(user.email).toBe(originalEmail);
            expect(user.userName).toBe(originalUserName);
            expect(user.passwordHash).toBe(originalPasswordHash);
            expect(user.isBlocked).toBe(originalIsBlocked);
            expect(user.firstName).toBe(originalFirstName);
            expect(user.lastName).toBe(originalLastName);
            expect(user.birthday).toBe(originalBirthday);
            expect(user.createdAt).toBe(originalCreatedAt);
            expect(user.biography).toBe(originalBiography);
            expect(user.profilePicture).toBe(originalProfilePicture);
            expect(user.deletedAt).toBe(originalDeletedAt);
          });

          it('update isBlocked', () => {
            // Arrange
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
              profilePicture,
            );

            const originalId = user.id;
            const originalEmail = user.email;
            const originalUserName = user.userName;
            const originalPasswordHash = user.passwordHash;
            const originalIsVerified = user.isVerified;
            const originalFirstName = user.firstName;
            const originalLastName = user.lastName;
            const originalBirthday = user.birthday;
            const originalCreatedAt = user.createdAt;
            const originalUpdatedAt = user.updatedAt;
            const originalBiography = user.biography;
            const originalProfilePicture = user.profilePicture;
            const originalDeletedAt = user.deletedAt;

            const newIsBlockedValue = !blockedStatus;
            const newIsBlocked = IsBlocked.create(newIsBlockedValue);

            // Act
            user.isBlocked = newIsBlocked;

            // Assert
            expect(user.isBlocked.getStatus).toBe(newIsBlockedValue);
            expect(user.updatedAt.getMilliseconds).not.toBe(
              originalUpdatedAt.getMilliseconds,
            );

            expect(user.id).toBe(originalId);
            expect(user.email).toBe(originalEmail);
            expect(user.userName).toBe(originalUserName);
            expect(user.passwordHash).toBe(originalPasswordHash);
            expect(user.isVerified).toBe(originalIsVerified);
            expect(user.firstName).toBe(originalFirstName);
            expect(user.lastName).toBe(originalLastName);
            expect(user.birthday).toBe(originalBirthday);
            expect(user.createdAt).toBe(originalCreatedAt);
            expect(user.biography).toBe(originalBiography);
            expect(user.profilePicture).toBe(originalProfilePicture);
            expect(user.deletedAt).toBe(originalDeletedAt);
          });

          it('update firstName', () => {
            // Arrange
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
              profilePicture,
            );

            const originalId = user.id;
            const originalEmail = user.email;
            const originalUserName = user.userName;
            const originalPasswordHash = user.passwordHash;
            const originalIsVerified = user.isVerified;
            const originalIsBlocked = user.isBlocked;
            const originalLastName = user.lastName;
            const originalBirthday = user.birthday;
            const originalCreatedAt = user.createdAt;
            const originalUpdatedAt = user.updatedAt;
            const originalBiography = user.biography;
            const originalProfilePicture = user.profilePicture;
            const originalDeletedAt = user.deletedAt;

            const newFirstNameValue = 'new firstName';
            const newFirstName = FirstName.create(newFirstNameValue);

            // Act
            user.firstName = newFirstName;

            // Assert
            expect(user.firstName.getFirstName).toBe(newFirstNameValue);
            expect(user.updatedAt.getMilliseconds).not.toBe(
              originalUpdatedAt.getMilliseconds,
            );

            expect(user.id).toBe(originalId);
            expect(user.email).toBe(originalEmail);
            expect(user.userName).toBe(originalUserName);
            expect(user.passwordHash).toBe(originalPasswordHash);
            expect(user.isVerified).toBe(originalIsVerified);
            expect(user.isBlocked).toBe(originalIsBlocked);
            expect(user.lastName).toBe(originalLastName);
            expect(user.birthday).toBe(originalBirthday);
            expect(user.createdAt).toBe(originalCreatedAt);
            expect(user.biography).toBe(originalBiography);
            expect(user.profilePicture).toBe(originalProfilePicture);
            expect(user.deletedAt).toBe(originalDeletedAt);
          });

          it('update lastName', () => {
            // Arrange
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
              profilePicture,
            );

            const originalId = user.id;
            const originalEmail = user.email;
            const originalUserName = user.userName;
            const originalPasswordHash = user.passwordHash;
            const originalIsVerified = user.isVerified;
            const originalIsBlocked = user.isBlocked;
            const originalFirstName = user.firstName;
            const originalBirthday = user.birthday;
            const originalCreatedAt = user.createdAt;
            const originalUpdatedAt = user.updatedAt;
            const originalBiography = user.biography;
            const originalProfilePicture = user.profilePicture;
            const originalDeletedAt = user.deletedAt;

            const newLastNameValue = 'new lastName';
            const newLastName = LastName.create(newLastNameValue);

            // Act
            user.lastName = newLastName;

            // Assert
            expect(user.lastName.getLastName).toBe(newLastNameValue);
            expect(user.updatedAt.getMilliseconds).not.toBe(
              originalUpdatedAt.getMilliseconds,
            );

            expect(user.id).toBe(originalId);
            expect(user.email).toBe(originalEmail);
            expect(user.userName).toBe(originalUserName);
            expect(user.passwordHash).toBe(originalPasswordHash);
            expect(user.isVerified).toBe(originalIsVerified);
            expect(user.isBlocked).toBe(originalIsBlocked);
            expect(user.firstName).toBe(originalFirstName);
            expect(user.birthday).toBe(originalBirthday);
            expect(user.createdAt).toBe(originalCreatedAt);
            expect(user.biography).toBe(originalBiography);
            expect(user.profilePicture).toBe(originalProfilePicture);
            expect(user.deletedAt).toBe(originalDeletedAt);
          });

          it('update birthday', () => {
            // Arrange
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
              profilePicture,
            );

            const originalId = user.id;
            const originalEmail = user.email;
            const originalUserName = user.userName;
            const originalPasswordHash = user.passwordHash;
            const originalIsVerified = user.isVerified;
            const originalIsBlocked = user.isBlocked;
            const originalFirstName = user.firstName;
            const originalLastName = user.lastName;
            const originalCreatedAt = user.createdAt;
            const originalUpdatedAt = user.updatedAt;
            const originalBiography = user.biography;
            const originalProfilePicture = user.profilePicture;
            const originalDeletedAt = user.deletedAt;

            const newBirthdayValue = new Date('2010-01-01').getTime();
            const newBirthday =
              MillisecondsDate.createFromMilliseconds(newBirthdayValue);

            // Act
            user.birthday = newBirthday;

            // Assert
            expect(user.birthday.getMilliseconds).toBe(newBirthdayValue);
            expect(user.updatedAt.getMilliseconds).not.toBe(
              originalUpdatedAt.getMilliseconds,
            );

            expect(user.id).toBe(originalId);
            expect(user.email).toBe(originalEmail);
            expect(user.userName).toBe(originalUserName);
            expect(user.passwordHash).toBe(originalPasswordHash);
            expect(user.isVerified).toBe(originalIsVerified);
            expect(user.isBlocked).toBe(originalIsBlocked);
            expect(user.firstName).toBe(originalFirstName);
            expect(user.lastName).toBe(originalLastName);
            expect(user.biography).toBe(originalBiography);
            expect(user.createdAt).toBe(originalCreatedAt);
            expect(user.profilePicture).toBe(originalProfilePicture);
            expect(user.deletedAt).toBe(originalDeletedAt);
          });

          it('update biography', () => {
            // Arrange
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
              profilePicture,
            );

            const originalId = user.id;
            const originalEmail = user.email;
            const originalUserName = user.userName;
            const originalPasswordHash = user.passwordHash;
            const originalIsVerified = user.isVerified;
            const originalIsBlocked = user.isBlocked;
            const originalFirstName = user.firstName;
            const originalLastName = user.lastName;
            const originalBirthday = user.birthday;
            const originalCreatedAt = user.createdAt;
            const originalUpdatedAt = user.updatedAt;
            const originalProfilePicture = user.profilePicture;
            const originalDeletedAt = user.deletedAt;

            const newBiographyValue = 'new biography';
            const newBiography = Biography.create(newBiographyValue);

            // Act
            user.biography = newBiography;

            // Assert
            expect(user.biography.getBiography).toBe(newBiographyValue);
            expect(user.updatedAt.getMilliseconds).not.toBe(
              originalUpdatedAt.getMilliseconds,
            );

            expect(user.id).toBe(originalId);
            expect(user.email).toBe(originalEmail);
            expect(user.userName).toBe(originalUserName);
            expect(user.passwordHash).toBe(originalPasswordHash);
            expect(user.isVerified).toBe(originalIsVerified);
            expect(user.isBlocked).toBe(originalIsBlocked);
            expect(user.firstName).toBe(originalFirstName);
            expect(user.lastName).toBe(originalLastName);
            expect(user.birthday).toBe(originalBirthday);
            expect(user.createdAt).toBe(originalCreatedAt);
            expect(user.profilePicture).toBe(originalProfilePicture);
            expect(user.deletedAt).toBe(originalDeletedAt);
          });

          it('update biography with null', () => {
            // Arrange
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
              profilePicture,
            );

            const originalId = user.id;
            const originalEmail = user.email;
            const originalUserName = user.userName;
            const originalPasswordHash = user.passwordHash;
            const originalIsVerified = user.isVerified;
            const originalIsBlocked = user.isBlocked;
            const originalFirstName = user.firstName;
            const originalLastName = user.lastName;
            const originalBirthday = user.birthday;
            const originalCreatedAt = user.createdAt;
            const originalUpdatedAt = user.updatedAt;
            const originalProfilePicture = user.profilePicture;
            const originalDeletedAt = user.deletedAt;

            // Act
            user.biography = null;

            // Assert
            expect(user.biography).toBe(null);
            expect(user.updatedAt.getMilliseconds).not.toBe(
              originalUpdatedAt.getMilliseconds,
            );

            expect(user.id).toBe(originalId);
            expect(user.email).toBe(originalEmail);
            expect(user.userName).toBe(originalUserName);
            expect(user.passwordHash).toBe(originalPasswordHash);
            expect(user.isVerified).toBe(originalIsVerified);
            expect(user.isBlocked).toBe(originalIsBlocked);
            expect(user.firstName).toBe(originalFirstName);
            expect(user.lastName).toBe(originalLastName);
            expect(user.birthday).toBe(originalBirthday);
            expect(user.createdAt).toBe(originalCreatedAt);
            expect(user.profilePicture).toBe(originalProfilePicture);
            expect(user.deletedAt).toBe(originalDeletedAt);
          });

          it('update profilePicture', () => {
            // Arrange
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
              profilePicture,
            );

            const originalId = user.id;
            const originalEmail = user.email;
            const originalUserName = user.userName;
            const originalPasswordHash = user.passwordHash;
            const originalIsVerified = user.isVerified;
            const originalIsBlocked = user.isBlocked;
            const originalFirstName = user.firstName;
            const originalLastName = user.lastName;
            const originalBirthday = user.birthday;
            const originalCreatedAt = user.createdAt;
            const originalUpdatedAt = user.updatedAt;
            const originalBiography = user.biography;
            const originalDeletedAt = user.deletedAt;

            const newProfilePictureValue = 'https://www.example.net';
            const newProfilePicture = WebUrl.create(newProfilePictureValue);

            // Act
            user.profilePicture = newProfilePicture;

            // Assert
            expect(user.profilePicture.getUrl).toBe(newProfilePictureValue);
            expect(user.updatedAt.getMilliseconds).not.toBe(
              originalUpdatedAt.getMilliseconds,
            );

            expect(user.id).toBe(originalId);
            expect(user.email).toBe(originalEmail);
            expect(user.userName).toBe(originalUserName);
            expect(user.passwordHash).toBe(originalPasswordHash);
            expect(user.isVerified).toBe(originalIsVerified);
            expect(user.isBlocked).toBe(originalIsBlocked);
            expect(user.firstName).toBe(originalFirstName);
            expect(user.lastName).toBe(originalLastName);
            expect(user.birthday).toBe(originalBirthday);
            expect(user.createdAt).toBe(originalCreatedAt);
            expect(user.biography).toBe(originalBiography);
            expect(user.deletedAt).toBe(originalDeletedAt);
          });

          it('update profilePicture with null', () => {
            // Arrange
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
              profilePicture,
            );

            const originalId = user.id;
            const originalEmail = user.email;
            const originalUserName = user.userName;
            const originalPasswordHash = user.passwordHash;
            const originalIsVerified = user.isVerified;
            const originalIsBlocked = user.isBlocked;
            const originalFirstName = user.firstName;
            const originalLastName = user.lastName;
            const originalBirthday = user.birthday;
            const originalCreatedAt = user.createdAt;
            const originalUpdatedAt = user.updatedAt;
            const originalBiography = user.biography;
            const originalDeletedAt = user.deletedAt;

            // Act
            user.profilePicture = null;

            // Assert
            expect(user.profilePicture).toBe(null);
            expect(user.updatedAt.getMilliseconds).not.toBe(
              originalUpdatedAt.getMilliseconds,
            );

            expect(user.id).toBe(originalId);
            expect(user.email).toBe(originalEmail);
            expect(user.userName).toBe(originalUserName);
            expect(user.passwordHash).toBe(originalPasswordHash);
            expect(user.isVerified).toBe(originalIsVerified);
            expect(user.isBlocked).toBe(originalIsBlocked);
            expect(user.firstName).toBe(originalFirstName);
            expect(user.lastName).toBe(originalLastName);
            expect(user.birthday).toBe(originalBirthday);
            expect(user.createdAt).toBe(originalCreatedAt);
            expect(user.biography).toBe(originalBiography);
            expect(user.deletedAt).toBe(originalDeletedAt);
          });

          it('update deletedAt', () => {
            // Arrange
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
              profilePicture,
              deletedAtDate,
            );

            const originalId = user.id;
            const originalEmail = user.email;
            const originalUserName = user.userName;
            const originalPasswordHash = user.passwordHash;
            const originalIsVerified = user.isVerified;
            const originalIsBlocked = user.isBlocked;
            const originalFirstName = user.firstName;
            const originalLastName = user.lastName;
            const originalBirthday = user.birthday;
            const originalCreatedAt = user.createdAt;
            const originalUpdatedAt = user.updatedAt;
            const originalBiography = user.biography;
            const originalProfilePicture = user.profilePicture;

            const newDeletedAtValue = new Date('2010-01-01').getTime();
            const newDeletedAt =
              MillisecondsDate.createFromMilliseconds(newDeletedAtValue);

            // Act
            user.deletedAt = newDeletedAt;

            // Assert
            expect(user.deletedAt.getMilliseconds).toBe(newDeletedAtValue);
            expect(user.updatedAt.getMilliseconds).not.toBe(
              originalUpdatedAt.getMilliseconds,
            );

            expect(user.id).toBe(originalId);
            expect(user.email).toBe(originalEmail);
            expect(user.userName).toBe(originalUserName);
            expect(user.passwordHash).toBe(originalPasswordHash);
            expect(user.isVerified).toBe(originalIsVerified);
            expect(user.isBlocked).toBe(originalIsBlocked);
            expect(user.firstName).toBe(originalFirstName);
            expect(user.lastName).toBe(originalLastName);
            expect(user.birthday).toBe(originalBirthday);
            expect(user.createdAt).toBe(originalCreatedAt);
            expect(user.biography).toBe(originalBiography);
            expect(user.profilePicture).toBe(originalProfilePicture);
          });

          it('update deletedAt with null value', () => {
            // Arrange
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
              profilePicture,
              deletedAtDate,
            );

            const originalId = user.id;
            const originalEmail = user.email;
            const originalUserName = user.userName;
            const originalPasswordHash = user.passwordHash;
            const originalIsVerified = user.isVerified;
            const originalIsBlocked = user.isBlocked;
            const originalFirstName = user.firstName;
            const originalLastName = user.lastName;
            const originalBirthday = user.birthday;
            const originalCreatedAt = user.createdAt;
            const originalUpdatedAt = user.updatedAt;
            const originalBiography = user.biography;
            const originalProfilePicture = user.profilePicture;

            // Act
            user.deletedAt = null;

            // Assert
            expect(user.deletedAt).toBe(null);
            expect(user.updatedAt.getMilliseconds).not.toBe(
              originalUpdatedAt.getMilliseconds,
            );

            expect(user.id).toBe(originalId);
            expect(user.email).toBe(originalEmail);
            expect(user.userName).toBe(originalUserName);
            expect(user.passwordHash).toBe(originalPasswordHash);
            expect(user.isVerified).toBe(originalIsVerified);
            expect(user.isBlocked).toBe(originalIsBlocked);
            expect(user.firstName).toBe(originalFirstName);
            expect(user.lastName).toBe(originalLastName);
            expect(user.birthday).toBe(originalBirthday);
            expect(user.createdAt).toBe(originalCreatedAt);
            expect(user.biography).toBe(originalBiography);
            expect(user.profilePicture).toBe(originalProfilePicture);
          });
        });
      });
    });
  });
});
