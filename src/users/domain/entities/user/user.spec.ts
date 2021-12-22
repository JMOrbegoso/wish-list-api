import { MockedObject } from 'ts-jest/dist/utils/testing';
import { RefreshToken, User, VerificationCode } from '..';
import {
  MillisecondsDate,
  UniqueId,
  WebUrl,
} from '../../../../shared/domain/value-objects';
import {
  Biography,
  Email,
  FirstName,
  IsBlocked,
  IsVerified,
  LastName,
  PasswordHash,
  Role,
  Username,
} from '../../value-objects';

const validValues = [
  [
    {
      getId: 'id-0',
      equals: jest.fn(),
    } as MockedObject<UniqueId>,
    {
      getEmail: 'email0@email.com',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<Email>,
    {
      getUsername: 'John_Doe_0',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<Username>,
    {
      getPasswordHash: 'hash0',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<PasswordHash>,
    {
      getStatus: true,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<IsVerified>,
    {
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<VerificationCode>,
    {
      getStatus: false,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<IsBlocked>,
    {
      getFirstName: 'FirstName0',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<FirstName>,
    {
      getLastName: 'LastName0',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<LastName>,
    {
      getMilliseconds: 1,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
    {
      getMilliseconds: 2,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
    {
      getMilliseconds: 3,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
    {
      getBiography: 'A nice person 0.',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<Biography>,
    [] as MockedObject<Role[]>,
    [
      { id: { getId: 'refresh-token-id-0' } },
      { id: { getId: 'refresh-token-id-1' } },
      { id: { getId: 'refresh-token-id-2' } },
      { id: { getId: 'refresh-token-id-3' } },
      { id: { getId: 'refresh-token-id-4' } },
      { id: { getId: 'refresh-token-id-5' } },
    ] as MockedObject<RefreshToken[]>,
    {
      getUrl: 'https://www.example.com/0.jpg',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<WebUrl>,
    {
      getMilliseconds: 4,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
  ],
  [
    {
      getId: 'id-1',
      equals: jest.fn(),
    } as MockedObject<UniqueId>,
    {
      getEmail: 'email1@email.com',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<Email>,
    {
      getUsername: 'John_Doe_1',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<Username>,
    {
      getPasswordHash: 'hash1',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<PasswordHash>,
    {
      getStatus: true,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<IsVerified>,
    {
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<VerificationCode>,
    {
      getStatus: false,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<IsBlocked>,
    {
      getFirstName: 'FirstName1',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<FirstName>,
    {
      getLastName: 'LastName1',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<LastName>,
    {
      getMilliseconds: 1,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
    {
      getMilliseconds: 2,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
    {
      getMilliseconds: 3,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
    {
      getBiography: 'A nice person 1.',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<Biography>,
    [] as MockedObject<Role[]>,
    [
      { id: { getId: 'refresh-token-id-0' } },
      { id: { getId: 'refresh-token-id-1' } },
    ] as MockedObject<RefreshToken[]>,
    {
      getUrl: 'https://www.example.com/1.jpg',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<WebUrl>,
    {
      getMilliseconds: 4,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
  ],
  [
    {
      getId: 'id-2',
      equals: jest.fn(),
    } as MockedObject<UniqueId>,
    {
      getEmail: 'email2@email.com',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<Email>,
    {
      getUsername: 'John_Doe_2',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<Username>,
    {
      getPasswordHash: 'hash2',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<PasswordHash>,
    {
      getStatus: true,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<IsVerified>,
    {
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<VerificationCode>,
    {
      getStatus: false,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<IsBlocked>,
    {
      getFirstName: 'FirstName2',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<FirstName>,
    {
      getLastName: 'LastName2',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<LastName>,
    {
      getMilliseconds: 1,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
    {
      getMilliseconds: 2,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
    {
      getMilliseconds: 3,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
    {
      getBiography: 'A nice person 2.',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<Biography>,
    [] as MockedObject<Role[]>,
    [] as MockedObject<RefreshToken[]>,
    null,
    {
      getMilliseconds: 4,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
  ],
  [
    {
      getId: 'id-3',
      equals: jest.fn(),
    } as MockedObject<UniqueId>,
    {
      getEmail: 'email3@email.com',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<Email>,
    {
      getUsername: 'John_Doe_3',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<Username>,
    {
      getPasswordHash: 'hash3',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<PasswordHash>,
    {
      getStatus: true,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<IsVerified>,
    {
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<VerificationCode>,
    {
      getStatus: false,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<IsBlocked>,
    {
      getFirstName: 'FirstName3',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<FirstName>,
    {
      getLastName: 'LastName3',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<LastName>,
    {
      getMilliseconds: 1,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
    {
      getMilliseconds: 2,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
    {
      getMilliseconds: 3,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
    {
      getBiography: 'A nice person 3.',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<Biography>,
    [] as MockedObject<Role[]>,
    [] as MockedObject<RefreshToken[]>,
    {
      getUrl: 'https://www.example.com/3.jpg',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<WebUrl>,
    null,
  ],
  [
    {
      getId: 'id-4',
      equals: jest.fn(),
    } as MockedObject<UniqueId>,
    {
      getEmail: 'email4@email.com',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<Email>,
    {
      getUsername: 'John_Doe_4',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<Username>,
    {
      getPasswordHash: 'hash4',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<PasswordHash>,
    {
      getStatus: true,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<IsVerified>,
    {
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<VerificationCode>,
    {
      getStatus: false,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<IsBlocked>,
    {
      getFirstName: 'FirstName4',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<FirstName>,
    {
      getLastName: 'LastName4',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<LastName>,
    {
      getMilliseconds: 1,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
    {
      getMilliseconds: 2,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
    {
      getMilliseconds: 3,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
    {
      getBiography: 'A nice person 4.',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<Biography>,
    [] as MockedObject<Role[]>,
    [] as MockedObject<RefreshToken[]>,
    null,
    {
      getMilliseconds: 4,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
  ],
  [
    {
      getId: 'id-5',
      equals: jest.fn(),
    } as MockedObject<UniqueId>,
    {
      getEmail: 'email5@email.com',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<Email>,
    {
      getUsername: 'John_Doe_5',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<Username>,
    {
      getPasswordHash: 'hash5',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<PasswordHash>,
    {
      getStatus: true,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<IsVerified>,
    {
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<VerificationCode>,
    {
      getStatus: false,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<IsBlocked>,
    {
      getFirstName: 'FirstName5',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<FirstName>,
    {
      getLastName: 'LastName5',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<LastName>,
    {
      getMilliseconds: 1,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
    {
      getMilliseconds: 2,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
    {
      getMilliseconds: 3,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
    {
      getBiography: 'A nice person 5.',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<Biography>,
    [] as MockedObject<Role[]>,
    [] as MockedObject<RefreshToken[]>,
    {
      getUrl: 'https://www.example.com/5.jpg',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<WebUrl>,
    null,
  ],
  [
    {
      getId: 'id-6',
      equals: jest.fn(),
    } as MockedObject<UniqueId>,
    {
      getEmail: 'email6@email.com',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<Email>,
    {
      getUsername: 'John_Doe_6',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<Username>,
    {
      getPasswordHash: 'hash6',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<PasswordHash>,
    {
      getStatus: true,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<IsVerified>,
    {
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<VerificationCode>,
    {
      getStatus: false,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<IsBlocked>,
    {
      getFirstName: 'FirstName6',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<FirstName>,
    {
      getLastName: 'LastName6',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<LastName>,
    {
      getMilliseconds: 1,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
    {
      getMilliseconds: 2,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
    {
      getMilliseconds: 3,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
    {
      getBiography: 'A nice person 6.',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<Biography>,
    [] as MockedObject<Role[]>,
    [] as MockedObject<RefreshToken[]>,
    null,
    null,
  ],
  [
    {
      getId: 'id-7',
      equals: jest.fn(),
    } as MockedObject<UniqueId>,
    {
      getEmail: 'email7@email.com',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<Email>,
    {
      getUsername: 'John_Doe_7',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<Username>,
    {
      getPasswordHash: 'hash7',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<PasswordHash>,
    {
      getStatus: true,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<IsVerified>,
    {
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<VerificationCode>,
    {
      getStatus: false,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<IsBlocked>,
    {
      getFirstName: 'FirstName7',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<FirstName>,
    {
      getLastName: 'LastName7',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<LastName>,
    {
      getMilliseconds: 1,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
    {
      getMilliseconds: 2,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
    {
      getMilliseconds: 3,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
    {
      getBiography: 'A nice person 7.',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<Biography>,
    [] as MockedObject<Role[]>,
    [] as MockedObject<RefreshToken[]>,
    null,
    null,
  ],
];

describe('users', () => {
  describe('domain', () => {
    describe('entities', () => {
      describe('user', () => {
        test.each(validValues)(
          'should create an User with [id: %p], [email: %p], [username: %p], [passwordHash: %p], [isVerified: %p], [isBlocked: %p], [firstName: %p], [lastName: %p], [birthday: %p], [createdAt: %p], [updatedAt: %p], [biography: %p], [roles: %p], [refreshTokens: %p], [profilePicture: %p] and [deletedAt: %p]',
          (
            uniqueId: MockedObject<UniqueId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCode: MockedObject<VerificationCode>,
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<MillisecondsDate>,
            createdAt: MockedObject<MillisecondsDate>,
            updatedAt: MockedObject<MillisecondsDate>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
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
              verificationCode,
              isBlocked,
              firstName,
              lastName,
              birthday,
              createdAt,
              updatedAt,
              biography,
              roles,
              refreshTokens,
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
            expect(user.isVerified).toBe(isVerified.getStatus);
            expect(user.isBlocked).toBe(isBlocked.getStatus);
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
            for (let i = 0; i < roles.length; i++) {
              expect(user.roles[i]).toBe(roles[i]);
            }
            for (let i = 0; i < refreshTokens.length; i++) {
              expect(user.refreshTokens[i].id).toBe(refreshTokens[i].id);
            }
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
            verificationCode: MockedObject<VerificationCode>,
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<MillisecondsDate>,
            createdAt: MockedObject<MillisecondsDate>,
            updatedAt: MockedObject<MillisecondsDate>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
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
              verificationCode,
              isBlocked,
              firstName,
              lastName,
              birthday,
              createdAt,
              updatedAt,
              biography,
              roles,
              refreshTokens,
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
            verificationCode: MockedObject<VerificationCode>,
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<MillisecondsDate>,
            createdAt: MockedObject<MillisecondsDate>,
            updatedAt: MockedObject<MillisecondsDate>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
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
              verificationCode,
              isBlocked,
              firstName,
              lastName,
              birthday,
              createdAt,
              updatedAt,
              biography,
              roles,
              refreshTokens,
              profilePicture,
              deletedAt,
            );
            const newPasswordHashText = 'newHash';
            const newPasswordHash = {
              getPasswordHash: newPasswordHashText,
            } as MockedObject<PasswordHash>;

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
            verificationCode: MockedObject<VerificationCode>,
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<MillisecondsDate>,
            createdAt: MockedObject<MillisecondsDate>,
            updatedAt: MockedObject<MillisecondsDate>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
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
              verificationCode,
              isBlocked,
              firstName,
              lastName,
              birthday,
              createdAt,
              updatedAt,
              biography,
              roles,
              refreshTokens,
              profilePicture,
              deletedAt,
            );

            // Act
            user.verify();

            // Assert
            expect(user.isVerified).toBe(true);
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
            verificationCode: MockedObject<VerificationCode>,
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<MillisecondsDate>,
            createdAt: MockedObject<MillisecondsDate>,
            updatedAt: MockedObject<MillisecondsDate>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
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
              verificationCode,
              isBlocked,
              firstName,
              lastName,
              birthday,
              createdAt,
              updatedAt,
              biography,
              roles,
              refreshTokens,
              profilePicture,
              deletedAt,
            );

            // Act
            user.block();

            // Assert
            expect(user.isBlocked).toBe(true);
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
            verificationCode: MockedObject<VerificationCode>,
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<MillisecondsDate>,
            createdAt: MockedObject<MillisecondsDate>,
            updatedAt: MockedObject<MillisecondsDate>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
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
              verificationCode,
              isBlocked,
              firstName,
              lastName,
              birthday,
              createdAt,
              updatedAt,
              biography,
              roles,
              refreshTokens,
              profilePicture,
              deletedAt,
            );

            // Act
            user.unblock();

            // Assert
            expect(user.isBlocked).toBe(false);
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
            verificationCode: MockedObject<VerificationCode>,
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<MillisecondsDate>,
            createdAt: MockedObject<MillisecondsDate>,
            updatedAt: MockedObject<MillisecondsDate>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
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
              verificationCode,
              isBlocked,
              firstName,
              lastName,
              birthday,
              createdAt,
              updatedAt,
              biography,
              roles,
              refreshTokens,
              profilePicture,
              deletedAt,
            );

            const newFirstNameText = 'new FirstName';
            const newFirstName = {
              getFirstName: newFirstNameText,
            } as MockedObject<FirstName>;
            const newLastNameText = 'new LastName';
            const newLastName = {
              getLastName: newLastNameText,
            } as MockedObject<LastName>;
            const newBirthdayMillisecondsDate = new Date(2005, 1, 1).getTime();
            const newBirthday = {
              getMilliseconds: newBirthdayMillisecondsDate,
            } as MockedObject<MillisecondsDate>;
            const newBiographyText = 'new Biography';
            const newBiography = {
              getBiography: newBiographyText,
            } as MockedObject<Biography>;

            // Act
            user.updateProfile(
              newFirstName,
              newLastName,
              newBirthday,
              newBiography,
            );

            // Assert
            expect(user.firstName.getFirstName).toBe(newFirstName.getFirstName);
            expect(user.lastName.getLastName).toBe(newLastName.getLastName);
            expect(user.birthday.getMilliseconds).toBe(
              newBirthday.getMilliseconds,
            );
            expect(user.biography.getBiography).toBe(newBiography.getBiography);
          },
        );

        test.each(validValues)(
          'update User profile picture should change the property value',
          (
            uniqueId: MockedObject<UniqueId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCode: MockedObject<VerificationCode>,
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<MillisecondsDate>,
            createdAt: MockedObject<MillisecondsDate>,
            updatedAt: MockedObject<MillisecondsDate>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
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
              verificationCode,
              isBlocked,
              firstName,
              lastName,
              birthday,
              createdAt,
              updatedAt,
              biography,
              roles,
              refreshTokens,
              profilePicture,
              deletedAt,
            );

            const newProfilePicture = {
              getUrl: 'https://www.example.com/new_image.jpg',
            } as MockedObject<WebUrl>;

            // Act
            user.updateProfilePicture(newProfilePicture);

            // Assert
            expect(user.profilePicture.getUrl).toBe(newProfilePicture.getUrl);
          },
        );

        test.each(validValues)(
          'update User profile picture with null value should change the property value',
          (
            uniqueId: MockedObject<UniqueId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCode: MockedObject<VerificationCode>,
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<MillisecondsDate>,
            createdAt: MockedObject<MillisecondsDate>,
            updatedAt: MockedObject<MillisecondsDate>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
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
              verificationCode,
              isBlocked,
              firstName,
              lastName,
              birthday,
              createdAt,
              updatedAt,
              biography,
              roles,
              refreshTokens,
              profilePicture,
              deletedAt,
            );

            // Act
            user.updateProfilePicture();

            // Assert
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
            verificationCode: MockedObject<VerificationCode>,
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<MillisecondsDate>,
            createdAt: MockedObject<MillisecondsDate>,
            updatedAt: MockedObject<MillisecondsDate>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
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
              verificationCode,
              isBlocked,
              firstName,
              lastName,
              birthday,
              createdAt,
              updatedAt,
              biography,
              roles,
              refreshTokens,
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
            verificationCode: MockedObject<VerificationCode>,
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<MillisecondsDate>,
            createdAt: MockedObject<MillisecondsDate>,
            updatedAt: MockedObject<MillisecondsDate>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
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
              verificationCode,
              isBlocked,
              firstName,
              lastName,
              birthday,
              createdAt,
              updatedAt,
              biography,
              roles,
              refreshTokens,
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

        test.each(validValues)(
          'add role to a User who already has that role',
          (
            uniqueId: MockedObject<UniqueId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCode: MockedObject<VerificationCode>,
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<MillisecondsDate>,
            createdAt: MockedObject<MillisecondsDate>,
            updatedAt: MockedObject<MillisecondsDate>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<MillisecondsDate>,
          ) => {
            // Arrange
            const customRoles = [
              {
                getRole: 'Admin',
                equals: jest.fn().mockReturnValue(true),
              } as MockedObject<Role>,
            ];
            const roleToAdd = {
              getRole: 'Admin',
            } as MockedObject<Role>;
            const user = User.create(
              uniqueId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCode,
              isBlocked,
              firstName,
              lastName,
              birthday,
              createdAt,
              updatedAt,
              biography,
              customRoles,
              refreshTokens,
              profilePicture,
              deletedAt,
            );

            // Act
            user.addRole(roleToAdd);

            // Assert
            expect(user.roles.length).toBe(1);
            expect(user.roles[0]).toBe('Admin');
          },
        );

        test.each(validValues)(
          'add role to a User who has not that role',
          (
            uniqueId: MockedObject<UniqueId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCode: MockedObject<VerificationCode>,
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<MillisecondsDate>,
            createdAt: MockedObject<MillisecondsDate>,
            updatedAt: MockedObject<MillisecondsDate>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<MillisecondsDate>,
          ) => {
            // Arrange
            const customRoles = [
              {
                getRole: 'Admin',
                equals: jest.fn().mockReturnValue(false),
              } as MockedObject<Role>,
            ];
            const roleToAdd = {
              getRole: 'Moderator',
            } as MockedObject<Role>;
            const user = User.create(
              uniqueId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCode,
              isBlocked,
              firstName,
              lastName,
              birthday,
              createdAt,
              updatedAt,
              biography,
              customRoles,
              refreshTokens,
              profilePicture,
              deletedAt,
            );

            // Act
            user.addRole(roleToAdd);

            // Assert
            expect(user.roles.length).toBe(2);
            expect(user.roles[0]).toBe('Admin');
            expect(user.roles[1]).toBe('Moderator');
          },
        );

        test.each(validValues)(
          'remove role from an User who has not that role',
          (
            uniqueId: MockedObject<UniqueId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCode: MockedObject<VerificationCode>,
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<MillisecondsDate>,
            createdAt: MockedObject<MillisecondsDate>,
            updatedAt: MockedObject<MillisecondsDate>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<MillisecondsDate>,
          ) => {
            // Arrange
            const customRoles = [
              {
                getRole: 'Admin',
                equals: jest.fn().mockReturnValue(false),
              } as MockedObject<Role>,
            ];
            const roleToRemove = {
              getRole: 'Moderator',
            } as MockedObject<Role>;
            const user = User.create(
              uniqueId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCode,
              isBlocked,
              firstName,
              lastName,
              birthday,
              createdAt,
              updatedAt,
              biography,
              customRoles,
              refreshTokens,
              profilePicture,
              deletedAt,
            );

            // Act
            user.removeRole(roleToRemove);

            // Assert
            expect(user.roles.length).toBe(1);
            expect(user.roles[0]).toBe('Admin');
          },
        );

        test.each(validValues)(
          'remove role from an User who has that role',
          (
            uniqueId: MockedObject<UniqueId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCode: MockedObject<VerificationCode>,
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<MillisecondsDate>,
            createdAt: MockedObject<MillisecondsDate>,
            updatedAt: MockedObject<MillisecondsDate>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<MillisecondsDate>,
          ) => {
            // Arrange
            const customRoles = [
              {
                getRole: 'Admin',
                equals: jest.fn().mockReturnValue(true),
              } as MockedObject<Role>,
            ];
            const roleToRemove = {
              getRole: 'Admin',
            } as MockedObject<Role>;
            const user = User.create(
              uniqueId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCode,
              isBlocked,
              firstName,
              lastName,
              birthday,
              createdAt,
              updatedAt,
              biography,
              customRoles,
              refreshTokens,
              profilePicture,
              deletedAt,
            );

            // Act
            user.removeRole(roleToRemove);

            // Assert
            expect(user.roles.length).toBe(0);
          },
        );

        test.each(validValues)(
          'remove role from an User who has that role',
          (
            uniqueId: MockedObject<UniqueId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCode: MockedObject<VerificationCode>,
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<MillisecondsDate>,
            createdAt: MockedObject<MillisecondsDate>,
            updatedAt: MockedObject<MillisecondsDate>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<MillisecondsDate>,
          ) => {
            // Arrange
            const customRoles = [
              {
                getRole: 'Admin',
                equals: jest.fn().mockReturnValue(true),
              } as MockedObject<Role>,
              {
                getRole: 'Moderator',
                equals: jest.fn().mockReturnValue(false),
              } as MockedObject<Role>,
            ];
            const roleToRemove = {
              getRole: 'Admin',
            } as MockedObject<Role>;
            const user = User.create(
              uniqueId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCode,
              isBlocked,
              firstName,
              lastName,
              birthday,
              createdAt,
              updatedAt,
              biography,
              customRoles,
              refreshTokens,
              profilePicture,
              deletedAt,
            );

            // Act
            user.removeRole(roleToRemove);

            // Assert
            expect(user.roles.length).toBe(1);
            expect(user.roles[0]).toBe('Moderator');
          },
        );

        test.each(validValues)(
          'do changes on refreshTokens getter should make no changes on the original refreshTokens array',
          (
            uniqueId: MockedObject<UniqueId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCode: MockedObject<VerificationCode>,
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<MillisecondsDate>,
            createdAt: MockedObject<MillisecondsDate>,
            updatedAt: MockedObject<MillisecondsDate>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
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
              verificationCode,
              isBlocked,
              firstName,
              lastName,
              birthday,
              createdAt,
              updatedAt,
              biography,
              roles,
              refreshTokens,
              profilePicture,
              deletedAt,
            );

            // Act
            const refreshTokensLocal = user.refreshTokens;
            const newRefreshToken = {
              id: { getId: 'new-refresh-token-id' },
            } as MockedObject<RefreshToken>;
            refreshTokensLocal.push(newRefreshToken);

            // Assert
            expect(user.refreshTokens).toHaveLength(refreshTokens.length);
            expect(refreshTokensLocal).toHaveLength(refreshTokens.length + 1);

            for (let i = 0; i < refreshTokens.length; i++) {
              expect(user.refreshTokens[i].id).toBe(refreshTokens[i].id);
            }
          },
        );
      });
    });
  });
});
