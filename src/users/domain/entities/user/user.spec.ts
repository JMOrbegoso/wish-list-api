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
  Username,
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
    mocked<Username>({
      getUsername: 'John_Doe_0',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as Username),
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
    mocked<Username>({
      getUsername: 'John_Doe_1',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as Username),
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
    mocked<Biography>({
      getBiography: 'A nice person 1.',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as Biography),
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
    mocked<Username>({
      getUsername: 'John_Doe_2',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as Username),
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
    mocked<Username>({
      getUsername: 'John_Doe_3',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as Username),
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
    mocked<Username>({
      getUsername: 'John_Doe_4',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as Username),
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
    mocked<Biography>({
      getBiography: 'A nice person 4.',
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
      getId: 'id-5',
      equals: jest.fn(),
    } as unknown as UniqueId),
    mocked<Email>({
      getEmail: 'email5@email.com',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as Email),
    mocked<Username>({
      getUsername: 'John_Doe_5',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as Username),
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
    mocked<Biography>({
      getBiography: 'A nice person 5.',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as Biography),
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
    mocked<Username>({
      getUsername: 'John_Doe_6',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as Username),
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
    mocked<Username>({
      getUsername: 'John_Doe_7',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as Username),
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
    mocked<Biography>({
      getBiography: 'A nice person 7.',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as Biography),
    null,
    null,
  ],
];

describe('users', () => {
  describe('domain', () => {
    describe('entities', () => {
      describe('user', () => {
        test.each(validValues)(
          'should create an User with [id: %p], [email: %p], [username: %p], [passwordHash: %p], [isVerified: %p], [isBlocked: %p], [firstName: %p], [lastName: %p], [birthday: %p], [createdAt: %p], [updatedAt: %p], [biography: %p], [profilePicture: %p] and [deletedAt: %p]',
          (
            uniqueId: MockedObject<UniqueId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
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
              username,
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
            expect(user.username.getUsername).toBe(username.getUsername);
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
            expect(user.biography.getBiography).toBe(biography.getBiography);
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
            username: MockedObject<Username>,
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
              username,
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
          'update password of User should change the property value',
          (
            uniqueId: MockedObject<UniqueId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
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
              username,
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
            const newPasswordHashText = 'newHash';
            const newPasswordHash = mocked<PasswordHash>({
              getPasswordHash: newPasswordHashText,
            } as unknown as PasswordHash);

            // Act
            user.updatePasswordHash(newPasswordHash);

            // Assert
            expect(user.passwordHash.getPasswordHash).toBe(newPasswordHashText);
          },
        );

        test.each(validValues)(
          'verify User should change the property value',
          (
            uniqueId: MockedObject<UniqueId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
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
              username,
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
            user.verify();

            // Assert
            expect(user.isVerified.getStatus).toBe(true);
          },
        );

        test.each(validValues)(
          'block User should change the property value',
          (
            uniqueId: MockedObject<UniqueId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
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
              username,
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
            user.block();

            // Assert
            expect(user.isBlocked.getStatus).toBe(true);
          },
        );

        test.each(validValues)(
          'unblock User should change the property value',
          (
            uniqueId: MockedObject<UniqueId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
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
              username,
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
            user.unblock();

            // Assert
            expect(user.isBlocked.getStatus).toBe(false);
          },
        );

        test.each(validValues)(
          'update User profile should change the property values',
          (
            uniqueId: MockedObject<UniqueId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
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
              username,
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

            const newFirstNameText = 'new FirstName';
            const newFirstName = mocked<FirstName>({
              getFirstName: newFirstNameText,
            } as unknown as FirstName);
            const newLastNameText = 'new LastName';
            const newLastName = mocked<LastName>({
              getLastName: newLastNameText,
            } as unknown as LastName);
            const newBirthdayMillisecondsDate = new Date(2005, 1, 1).getTime();
            const newBirthday = mocked<MillisecondsDate>({
              getMilliseconds: newBirthdayMillisecondsDate,
            } as unknown as MillisecondsDate);
            const newBiographyText = 'new Biography';
            const newBiography = mocked<Biography>({
              getBiography: newBiographyText,
            } as unknown as Biography);
            const newProfilePictureText = 'https://www.example.com/new.jpg';
            const newProfilePicture = mocked<WebUrl>({
              getUrl: newProfilePictureText,
            } as unknown as WebUrl);

            // Act
            user.updateProfile(
              newFirstName,
              newLastName,
              newBirthday,
              newBiography,
              newProfilePicture,
            );

            // Assert
            expect(user.firstName.getFirstName).toBe(newFirstName.getFirstName);
            expect(user.lastName.getLastName).toBe(newLastName.getLastName);
            expect(user.birthday.getMilliseconds).toBe(
              newBirthday.getMilliseconds,
            );
            expect(user.biography.getBiography).toBe(newBiography.getBiography);
            if (newProfilePicture)
              expect(user.profilePicture.getUrl).toBe(newProfilePicture.getUrl);
            else expect(user.profilePicture).toBeNull();
          },
        );

        test.each(validValues)(
          'update User profile (with nulls) should change the property values',
          (
            uniqueId: MockedObject<UniqueId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
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
              username,
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

            const newFirstNameText = 'new FirstName';
            const newFirstName = mocked<FirstName>({
              getFirstName: newFirstNameText,
            } as unknown as FirstName);
            const newLastNameText = 'new LastName';
            const newLastName = mocked<LastName>({
              getLastName: newLastNameText,
            } as unknown as LastName);
            const newBirthdayMillisecondsDate = new Date(2005, 1, 1).getTime();
            const newBirthday = mocked<MillisecondsDate>({
              getMilliseconds: newBirthdayMillisecondsDate,
            } as unknown as MillisecondsDate);
            const newBiographyText = 'new Biography';
            const newBiography = mocked<Biography>({
              getBiography: newBiographyText,
            } as unknown as Biography);

            // Act
            user.updateProfile(
              newFirstName,
              newLastName,
              newBirthday,
              newBiography,
              null,
            );

            // Assert
            expect(user.firstName.getFirstName).toBe(newFirstName.getFirstName);
            expect(user.lastName.getLastName).toBe(newLastName.getLastName);
            expect(user.birthday.getMilliseconds).toBe(
              newBirthday.getMilliseconds,
            );
            expect(user.biography.getBiography).toBe(newBiography.getBiography);
            expect(user.profilePicture).toBeNull();
          },
        );

        test.each(validValues)(
          'delete User should change the property value',
          (
            uniqueId: MockedObject<UniqueId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
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
              username,
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
            user.delete();

            // Assert
            expect(user.deletedAt).not.toBeNull();
            expect(user.isDeleted).toBe(true);
          },
        );

        test.each(validValues)(
          'undelete User should change the property value',
          (
            uniqueId: MockedObject<UniqueId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
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
              username,
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
            user.undelete();

            // Assert
            expect(user.deletedAt).toBeNull();
            expect(user.isDeleted).toBe(false);
          },
        );
      });
    });
  });
});
