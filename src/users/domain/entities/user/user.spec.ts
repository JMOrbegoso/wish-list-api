import { mocked } from 'ts-jest/utils';
import { MockedObject } from 'ts-jest/dist/utils/testing';
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

const validValues = [
  [
    mocked<UniqueId>({
      getId: 'id-0',
      equals: jest.fn(),
    } as unknown as UniqueId),
    mocked<Email>({
      getEmail: 'email0@email.com',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as Email),
    mocked<UserName>({
      getUserName: 'UserName0',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as UserName),
    mocked<PasswordHash>({
      getPasswordHash: 'hash0',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as PasswordHash),
    mocked<IsVerified>({
      getStatus: true,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as IsVerified),
    mocked<IsBlocked>({
      getStatus: false,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as IsBlocked),
    mocked<FirstName>({
      getFirstName: 'FirstName0',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as FirstName),
    mocked<LastName>({
      getLastName: 'LastName0',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as LastName),
    mocked<MillisecondsDate>({
      getMilliseconds: 1,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as MillisecondsDate),
    mocked<MillisecondsDate>({
      getMilliseconds: 2,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as MillisecondsDate),
    mocked<MillisecondsDate>({
      getMilliseconds: 3,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as MillisecondsDate),
    mocked<Biography>({
      getBiography: 'A nice person 0.',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as Biography),
    mocked<WebUrl>({
      getUrl: 'https://www.example.com/0.jpg',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as WebUrl),
    mocked<MillisecondsDate>({
      getMilliseconds: 4,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as MillisecondsDate),
  ],
  [
    mocked<UniqueId>({
      getId: 'id-1',
      equals: jest.fn(),
    } as unknown as UniqueId),
    mocked<Email>({
      getEmail: 'email1@email.com',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as Email),
    mocked<UserName>({
      getUserName: 'UserName1',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as UserName),
    mocked<PasswordHash>({
      getPasswordHash: 'hash1',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as PasswordHash),
    mocked<IsVerified>({
      getStatus: true,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as IsVerified),
    mocked<IsBlocked>({
      getStatus: false,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as IsBlocked),
    mocked<FirstName>({
      getFirstName: 'FirstName1',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as FirstName),
    mocked<LastName>({
      getLastName: 'LastName1',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as LastName),
    mocked<MillisecondsDate>({
      getMilliseconds: 1,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as MillisecondsDate),
    mocked<MillisecondsDate>({
      getMilliseconds: 2,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as MillisecondsDate),
    mocked<MillisecondsDate>({
      getMilliseconds: 3,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as MillisecondsDate),
    null,
    mocked<WebUrl>({
      getUrl: 'https://www.example.com/1.jpg',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as WebUrl),
    mocked<MillisecondsDate>({
      getMilliseconds: 4,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as MillisecondsDate),
  ],
  [
    mocked<UniqueId>({
      getId: 'id-2',
      equals: jest.fn(),
    } as unknown as UniqueId),
    mocked<Email>({
      getEmail: 'email2@email.com',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as Email),
    mocked<UserName>({
      getUserName: 'UserName2',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as UserName),
    mocked<PasswordHash>({
      getPasswordHash: 'hash2',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as PasswordHash),
    mocked<IsVerified>({
      getStatus: true,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as IsVerified),
    mocked<IsBlocked>({
      getStatus: false,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as IsBlocked),
    mocked<FirstName>({
      getFirstName: 'FirstName2',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as FirstName),
    mocked<LastName>({
      getLastName: 'LastName2',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as LastName),
    mocked<MillisecondsDate>({
      getMilliseconds: 1,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as MillisecondsDate),
    mocked<MillisecondsDate>({
      getMilliseconds: 2,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as MillisecondsDate),
    mocked<MillisecondsDate>({
      getMilliseconds: 3,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as MillisecondsDate),
    mocked<Biography>({
      getBiography: 'A nice person 2.',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as Biography),
    null,
    mocked<MillisecondsDate>({
      getMilliseconds: 4,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as MillisecondsDate),
  ],
  [
    mocked<UniqueId>({
      getId: 'id-3',
      equals: jest.fn(),
    } as unknown as UniqueId),
    mocked<Email>({
      getEmail: 'email3@email.com',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as Email),
    mocked<UserName>({
      getUserName: 'UserName3',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as UserName),
    mocked<PasswordHash>({
      getPasswordHash: 'hash3',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as PasswordHash),
    mocked<IsVerified>({
      getStatus: true,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as IsVerified),
    mocked<IsBlocked>({
      getStatus: false,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as IsBlocked),
    mocked<FirstName>({
      getFirstName: 'FirstName3',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as FirstName),
    mocked<LastName>({
      getLastName: 'LastName3',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as LastName),
    mocked<MillisecondsDate>({
      getMilliseconds: 1,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as MillisecondsDate),
    mocked<MillisecondsDate>({
      getMilliseconds: 2,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as MillisecondsDate),
    mocked<MillisecondsDate>({
      getMilliseconds: 3,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as MillisecondsDate),
    mocked<Biography>({
      getBiography: 'A nice person 3.',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as Biography),
    mocked<WebUrl>({
      getUrl: 'https://www.example.com/3.jpg',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as WebUrl),
    null,
  ],
  [
    mocked<UniqueId>({
      getId: 'id-4',
      equals: jest.fn(),
    } as unknown as UniqueId),
    mocked<Email>({
      getEmail: 'email4@email.com',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as Email),
    mocked<UserName>({
      getUserName: 'UserName4',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as UserName),
    mocked<PasswordHash>({
      getPasswordHash: 'hash4',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as PasswordHash),
    mocked<IsVerified>({
      getStatus: true,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as IsVerified),
    mocked<IsBlocked>({
      getStatus: false,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as IsBlocked),
    mocked<FirstName>({
      getFirstName: 'FirstName4',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as FirstName),
    mocked<LastName>({
      getLastName: 'LastName4',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as LastName),
    mocked<MillisecondsDate>({
      getMilliseconds: 1,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as MillisecondsDate),
    mocked<MillisecondsDate>({
      getMilliseconds: 2,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as MillisecondsDate),
    mocked<MillisecondsDate>({
      getMilliseconds: 3,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as MillisecondsDate),
    null,
    null,
    mocked<MillisecondsDate>({
      getMilliseconds: 4,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as MillisecondsDate),
  ],
  [
    mocked<UniqueId>({
      getId: 'id-5',
      equals: jest.fn(),
    } as unknown as UniqueId),
    mocked<Email>({
      getEmail: 'email5@email.com',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as Email),
    mocked<UserName>({
      getUserName: 'UserName5',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as UserName),
    mocked<PasswordHash>({
      getPasswordHash: 'hash5',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as PasswordHash),
    mocked<IsVerified>({
      getStatus: true,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as IsVerified),
    mocked<IsBlocked>({
      getStatus: false,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as IsBlocked),
    mocked<FirstName>({
      getFirstName: 'FirstName5',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as FirstName),
    mocked<LastName>({
      getLastName: 'LastName5',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as LastName),
    mocked<MillisecondsDate>({
      getMilliseconds: 1,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as MillisecondsDate),
    mocked<MillisecondsDate>({
      getMilliseconds: 2,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as MillisecondsDate),
    mocked<MillisecondsDate>({
      getMilliseconds: 3,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as MillisecondsDate),
    null,
    mocked<WebUrl>({
      getUrl: 'https://www.example.com/5.jpg',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as WebUrl),
    null,
  ],
  [
    mocked<UniqueId>({
      getId: 'id-6',
      equals: jest.fn(),
    } as unknown as UniqueId),
    mocked<Email>({
      getEmail: 'email6@email.com',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as Email),
    mocked<UserName>({
      getUserName: 'UserName6',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as UserName),
    mocked<PasswordHash>({
      getPasswordHash: 'hash6',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as PasswordHash),
    mocked<IsVerified>({
      getStatus: true,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as IsVerified),
    mocked<IsBlocked>({
      getStatus: false,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as IsBlocked),
    mocked<FirstName>({
      getFirstName: 'FirstName6',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as FirstName),
    mocked<LastName>({
      getLastName: 'LastName6',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as LastName),
    mocked<MillisecondsDate>({
      getMilliseconds: 1,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as MillisecondsDate),
    mocked<MillisecondsDate>({
      getMilliseconds: 2,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as MillisecondsDate),
    mocked<MillisecondsDate>({
      getMilliseconds: 3,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as MillisecondsDate),
    mocked<Biography>({
      getBiography: 'A nice person 6.',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as Biography),
    null,
    null,
  ],
  [
    mocked<UniqueId>({
      getId: 'id-7',
      equals: jest.fn(),
    } as unknown as UniqueId),
    mocked<Email>({
      getEmail: 'email7@email.com',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as Email),
    mocked<UserName>({
      getUserName: 'UserName7',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as UserName),
    mocked<PasswordHash>({
      getPasswordHash: 'hash7',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as PasswordHash),
    mocked<IsVerified>({
      getStatus: true,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as IsVerified),
    mocked<IsBlocked>({
      getStatus: false,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as IsBlocked),
    mocked<FirstName>({
      getFirstName: 'FirstName7',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as FirstName),
    mocked<LastName>({
      getLastName: 'LastName7',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as LastName),
    mocked<MillisecondsDate>({
      getMilliseconds: 1,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as MillisecondsDate),
    mocked<MillisecondsDate>({
      getMilliseconds: 2,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as MillisecondsDate),
    mocked<MillisecondsDate>({
      getMilliseconds: 3,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as MillisecondsDate),
    null,
    null,
    null,
  ],
];

describe('users', () => {
  describe('domain', () => {
    describe('entities', () => {
      describe('user', () => {
        test.each(validValues)(
          'should create an User with [id: %p], [email: %p], [userName: %p], [passwordHash: %p], [isVerified: %p], [isBlocked: %p], [firstName: %p], [lastName: %p], [birthday: %p], [createdAt: %p], [updatedAt: %p], [biography: %p], [profilePicture: %p] and [deletedAt: %p]',
          (
            uniqueId: MockedObject<UniqueId>,
            email: MockedObject<Email>,
            userName: MockedObject<UserName>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<MillisecondsDate>,
            createdAt: MockedObject<MillisecondsDate>,
            updatedAt: MockedObject<MillisecondsDate>,
            biography: MockedObject<Biography>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<MillisecondsDate>,
          ) => {
            // Arrange

            // Act
            const user = User.create(
              uniqueId,
              email,
              userName,
              passwordHash,
              isVerified,
              isBlocked,
              firstName,
              lastName,
              birthday,
              createdAt,
              updatedAt,
              biography,
              profilePicture,
              deletedAt,
            );

            // Assert
            expect(user.id.getId).toBe(uniqueId.getId);
            expect(user.email.getEmail).toBe(email.getEmail);
            expect(user.userName.getUserName).toBe(userName.getUserName);
            expect(user.passwordHash.getPasswordHash).toBe(
              passwordHash.getPasswordHash,
            );
            expect(user.isVerified.getStatus).toBe(isVerified.getStatus);
            expect(user.isBlocked.getStatus).toBe(isBlocked.getStatus);
            expect(user.firstName.getFirstName).toBe(firstName.getFirstName);
            expect(user.lastName.getLastName).toBe(lastName.getLastName);
            expect(user.birthday.getMilliseconds).toBe(
              birthday.getMilliseconds,
            );
            expect(user.createdAt.getMilliseconds).toBe(
              createdAt.getMilliseconds,
            );
            expect(user.updatedAt.getMilliseconds).toBe(
              updatedAt.getMilliseconds,
            );
            if (biography)
              expect(user.biography.getBiography).toBe(biography.getBiography);
            else expect(user.biography).toBeNull();
            if (profilePicture)
              expect(user.profilePicture.getUrl).toBe(profilePicture.getUrl);
            else expect(user.profilePicture).toBeNull();
            if (deletedAt)
              expect(user.deletedAt.getMilliseconds).toBe(
                deletedAt.getMilliseconds,
              );
            else expect(user.deletedAt).toBeNull();
          },
        );

        test.each(validValues)(
          'comparing two entities should call "equals" method from UniqueId',
          (
            uniqueId: MockedObject<UniqueId>,
            email: MockedObject<Email>,
            userName: MockedObject<UserName>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<MillisecondsDate>,
            createdAt: MockedObject<MillisecondsDate>,
            updatedAt: MockedObject<MillisecondsDate>,
            biography: MockedObject<Biography>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<MillisecondsDate>,
          ) => {
            // Arrange
            const user = User.create(
              uniqueId,
              email,
              userName,
              passwordHash,
              isVerified,
              isBlocked,
              firstName,
              lastName,
              birthday,
              createdAt,
              updatedAt,
              biography,
              profilePicture,
              deletedAt,
            );

            // Act
            user.equals(user);

            // Assert
            expect(uniqueId.equals.mock.calls).toHaveLength(1);
          },
        );

        test.each(validValues)(
          'update a property with the same value should make no changes',
          (
            uniqueId: MockedObject<UniqueId>,
            email: MockedObject<Email>,
            userName: MockedObject<UserName>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<MillisecondsDate>,
            createdAt: MockedObject<MillisecondsDate>,
            updatedAt: MockedObject<MillisecondsDate>,
            biography: MockedObject<Biography>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<MillisecondsDate>,
          ) => {
            // Arrange
            const user = User.create(
              uniqueId,
              email,
              userName,
              passwordHash,
              isVerified,
              isBlocked,
              firstName,
              lastName,
              birthday,
              createdAt,
              updatedAt,
              biography,
              profilePicture,
              deletedAt,
            );

            // Act
            user.email = email;
            user.userName = userName;
            user.passwordHash = passwordHash;
            user.isVerified = isVerified;
            user.isBlocked = isBlocked;
            user.firstName = firstName;
            user.lastName = lastName;
            user.birthday = birthday;
            user.biography = biography;
            user.profilePicture = profilePicture;
            user.deletedAt = deletedAt;

            // Assert
            expect(user.id.getId).toBe(uniqueId.getId);
            expect(user.email.getEmail).toBe(email.getEmail);
            expect(user.userName.getUserName).toBe(userName.getUserName);
            expect(user.passwordHash.getPasswordHash).toBe(
              passwordHash.getPasswordHash,
            );
            expect(user.isVerified.getStatus).toBe(isVerified.getStatus);
            expect(user.isBlocked.getStatus).toBe(isBlocked.getStatus);
            expect(user.firstName.getFirstName).toBe(firstName.getFirstName);
            expect(user.lastName.getLastName).toBe(lastName.getLastName);
            expect(user.birthday.getMilliseconds).toBe(
              birthday.getMilliseconds,
            );
            expect(user.createdAt.getMilliseconds).toBe(
              createdAt.getMilliseconds,
            );
            expect(user.updatedAt.getMilliseconds).toBe(
              updatedAt.getMilliseconds,
            );
            if (user.biography)
              expect(user.biography.getBiography).toBe(biography.getBiography);
            else expect(user.biography).toBeNull();
            if (user.profilePicture)
              expect(user.profilePicture.getUrl).toBe(profilePicture.getUrl);
            else expect(user.profilePicture).toBeNull();
            if (user.deletedAt)
              expect(user.deletedAt.getMilliseconds).toBe(
                deletedAt.getMilliseconds,
              );
            else expect(user.deletedAt).toBeNull();
          },
        );

        test.each(validValues)(
          'update a property with a different value should make changes and update updatedAt property',
          (
            uniqueId: MockedObject<UniqueId>,
            newEmail: MockedObject<Email>,
            newUserName: MockedObject<UserName>,
            newPasswordHash: MockedObject<PasswordHash>,
            newIsVerified: MockedObject<IsVerified>,
            newIsBlocked: MockedObject<IsBlocked>,
            newFirstName: MockedObject<FirstName>,
            newLastName: MockedObject<LastName>,
            newBirthday: MockedObject<MillisecondsDate>,
            createdAt: MockedObject<MillisecondsDate>,
            updatedAt: MockedObject<MillisecondsDate>,
            newBiography: MockedObject<Biography>,
            newProfilePicture: MockedObject<WebUrl>,
            newDeletedAt: MockedObject<MillisecondsDate>,
          ) => {
            // Arrange
            const oldEmail = mocked<Email>({
              getEmail: 'Old email',
              equals: jest.fn().mockReturnValue(false),
            } as unknown as Email);
            const oldUserName = mocked<UserName>({
              getUserName: 'Old UserName',
              equals: jest.fn().mockReturnValue(false),
            } as unknown as UserName);
            const oldPasswordHash = mocked<PasswordHash>({
              getPasswordHash: 'Old hash',
              equals: jest.fn().mockReturnValue(false),
            } as unknown as PasswordHash);
            const oldIsVerified = mocked<IsVerified>({
              getStatus: false,
              equals: jest.fn().mockReturnValue(false),
            } as unknown as IsVerified);
            const oldIsBlocked = mocked<IsBlocked>({
              getStatus: true,
              equals: jest.fn().mockReturnValue(false),
            } as unknown as IsBlocked);
            const oldFirstName = mocked<FirstName>({
              getFirstName: 'Old FirstName',
              equals: jest.fn().mockReturnValue(false),
            } as unknown as FirstName);
            const oldLastName = mocked<LastName>({
              getLastName: 'Old LastName',
              equals: jest.fn().mockReturnValue(false),
            } as unknown as LastName);
            const oldBirthday = mocked<MillisecondsDate>({
              getMilliseconds: 1,
              equals: jest.fn().mockReturnValue(false),
            } as unknown as MillisecondsDate);
            const oldCreatedAt = mocked<MillisecondsDate>({
              getMilliseconds: 2,
              equals: jest.fn().mockReturnValue(false),
            } as unknown as MillisecondsDate);
            const oldBiography = mocked<Biography>({
              getBiography: 'Old biography.',
              equals: jest.fn().mockReturnValue(false),
            } as unknown as Biography);
            const oldProfilePicture = mocked<WebUrl>({
              getUrl: 'https://www.example.com/Old.jpg',
              equals: jest.fn().mockReturnValue(false),
            } as unknown as WebUrl);
            const oldDeletedAt = mocked<MillisecondsDate>({
              getMilliseconds: 4,
              equals: jest.fn().mockReturnValue(false),
            } as unknown as MillisecondsDate);

            const user = User.create(
              uniqueId,
              oldEmail,
              oldUserName,
              oldPasswordHash,
              oldIsVerified,
              oldIsBlocked,
              oldFirstName,
              oldLastName,
              oldBirthday,
              oldCreatedAt,
              updatedAt,
              oldBiography,
              oldProfilePicture,
              oldDeletedAt,
            );

            // Act
            user.email = newEmail;
            user.userName = newUserName;
            user.passwordHash = newPasswordHash;
            user.isVerified = newIsVerified;
            user.isBlocked = newIsBlocked;
            user.firstName = newFirstName;
            user.lastName = newLastName;
            user.birthday = newBirthday;
            user.biography = newBiography;
            user.profilePicture = newProfilePicture;
            user.deletedAt = newDeletedAt;

            // Assert
            expect(user.id.getId).toBe(uniqueId.getId);
            expect(user.email.getEmail).toBe(newEmail.getEmail);
            expect(user.userName.getUserName).toBe(newUserName.getUserName);
            expect(user.passwordHash.getPasswordHash).toBe(
              newPasswordHash.getPasswordHash,
            );
            expect(user.isVerified.getStatus).toBe(newIsVerified.getStatus);
            expect(user.isBlocked.getStatus).toBe(newIsBlocked.getStatus);
            expect(user.firstName.getFirstName).toBe(newFirstName.getFirstName);
            expect(user.lastName.getLastName).toBe(newLastName.getLastName);
            expect(user.birthday.getMilliseconds).toBe(
              newBirthday.getMilliseconds,
            );
            expect(user.createdAt.getMilliseconds).toBe(
              createdAt.getMilliseconds,
            );
            expect(user.updatedAt.getMilliseconds).not.toBe(
              updatedAt.getMilliseconds,
            );
            if (newBiography)
              expect(user.biography.getBiography).toBe(
                newBiography.getBiography,
              );
            else expect(user.biography).toBeNull();
            if (newProfilePicture)
              expect(user.profilePicture.getUrl).toBe(newProfilePicture.getUrl);
            else expect(user.profilePicture).toBeNull();
            if (newDeletedAt)
              expect(user.deletedAt.getMilliseconds).toBe(
                newDeletedAt.getMilliseconds,
              );
            else expect(user.deletedAt).toBeNull();
          },
        );
      });
    });
  });
});
