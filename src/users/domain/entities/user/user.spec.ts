import { MockedObject } from 'ts-jest/dist/utils/testing';
import {
  BlockedUserCannotBeUpdatedError,
  DeletedUserCannotBeUpdatedError,
  DuplicatedRefreshTokenError,
  InvalidRefreshTokenError,
  InvalidRefreshTokensError,
  InvalidVerificationCodeError,
  RefreshToken,
  RefreshTokenNotFoundError,
  UnverifiedUserCannotBeUpdatedError,
  User,
  VerificationCode,
} from '..';
import {
  InvalidMillisecondsDateError,
  InvalidUniqueIdError,
  MillisecondsDate,
  UniqueId,
  WebUrl,
} from '../../../../shared/domain/value-objects';
import {
  Biography,
  Email,
  FirstName,
  InvalidBiographyError,
  InvalidBlockedStatusError,
  InvalidEmailError,
  InvalidFirstNameError,
  InvalidLastNameError,
  InvalidPasswordHashError,
  InvalidRoleError,
  InvalidRolesError,
  InvalidUsernameError,
  InvalidVerificationStatusError,
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
          'create a User with invalid id should throw error',
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

            // Assert
            expect(() =>
              User.create(
                null,
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
              ),
            ).toThrowError(InvalidUniqueIdError);
          },
        );

        test.each(validValues)(
          'create a User with invalid email should throw error',
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

            // Assert
            expect(() =>
              User.create(
                uniqueId,
                null,
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
              ),
            ).toThrowError(InvalidEmailError);
          },
        );

        test.each(validValues)(
          'create a User with invalid username should throw error',
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

            // Assert
            expect(() =>
              User.create(
                uniqueId,
                email,
                null,
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
              ),
            ).toThrowError(InvalidUsernameError);
          },
        );

        test.each(validValues)(
          'create a User with invalid passwordHash should throw error',
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

            // Assert
            expect(() =>
              User.create(
                uniqueId,
                email,
                username,
                null,
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
              ),
            ).toThrowError(InvalidPasswordHashError);
          },
        );

        test.each(validValues)(
          'create a User with invalid isVerified should throw error',
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

            // Assert
            expect(() =>
              User.create(
                uniqueId,
                email,
                username,
                passwordHash,
                null,
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
              ),
            ).toThrowError(InvalidVerificationStatusError);
          },
        );

        test.each(validValues)(
          'create a User with invalid verificationCode should throw error',
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

            // Assert
            expect(() =>
              User.create(
                uniqueId,
                email,
                username,
                passwordHash,
                isVerified,
                null,
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
              ),
            ).toThrowError(InvalidVerificationCodeError);
          },
        );

        test.each(validValues)(
          'create a User with invalid isBlocked should throw error',
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

            // Assert
            expect(() =>
              User.create(
                uniqueId,
                email,
                username,
                passwordHash,
                isVerified,
                verificationCode,
                null,
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
              ),
            ).toThrowError(InvalidBlockedStatusError);
          },
        );

        test.each(validValues)(
          'create a User with invalid firstName should throw error',
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

            // Assert
            expect(() =>
              User.create(
                uniqueId,
                email,
                username,
                passwordHash,
                isVerified,
                verificationCode,
                isBlocked,
                null,
                lastName,
                birthday,
                createdAt,
                updatedAt,
                biography,
                roles,
                refreshTokens,
                profilePicture,
                deletedAt,
              ),
            ).toThrowError(InvalidFirstNameError);
          },
        );

        test.each(validValues)(
          'create a User with invalid lastName should throw error',
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

            // Assert
            expect(() =>
              User.create(
                uniqueId,
                email,
                username,
                passwordHash,
                isVerified,
                verificationCode,
                isBlocked,
                firstName,
                null,
                birthday,
                createdAt,
                updatedAt,
                biography,
                roles,
                refreshTokens,
                profilePicture,
                deletedAt,
              ),
            ).toThrowError(InvalidLastNameError);
          },
        );

        test.each(validValues)(
          'create a User with invalid birthday should throw error',
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

            // Assert
            expect(() =>
              User.create(
                uniqueId,
                email,
                username,
                passwordHash,
                isVerified,
                verificationCode,
                isBlocked,
                firstName,
                lastName,
                null,
                createdAt,
                updatedAt,
                biography,
                roles,
                refreshTokens,
                profilePicture,
                deletedAt,
              ),
            ).toThrowError(InvalidMillisecondsDateError);
          },
        );

        test.each(validValues)(
          'create a User with invalid createdAt should throw error',
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

            // Assert
            expect(() =>
              User.create(
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
                null,
                updatedAt,
                biography,
                roles,
                refreshTokens,
                profilePicture,
                deletedAt,
              ),
            ).toThrowError(InvalidMillisecondsDateError);
          },
        );

        test.each(validValues)(
          'create a User with invalid updatedAt should throw error',
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

            // Assert
            expect(() =>
              User.create(
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
                null,
                biography,
                roles,
                refreshTokens,
                profilePicture,
                deletedAt,
              ),
            ).toThrowError(InvalidMillisecondsDateError);
          },
        );

        test.each(validValues)(
          'create a User with invalid biography should throw error',
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

            // Assert
            expect(() =>
              User.create(
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
                null,
                roles,
                refreshTokens,
                profilePicture,
                deletedAt,
              ),
            ).toThrowError(InvalidBiographyError);
          },
        );

        test.each(validValues)(
          'create a User with invalid roles should throw error',
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

            // Assert
            expect(() =>
              User.create(
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
                null,
                refreshTokens,
                profilePicture,
                deletedAt,
              ),
            ).toThrowError(InvalidRolesError);
          },
        );

        test.each(validValues)(
          'create a User with a invalid role inside a valid roles array should throw error',
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
            roles = [{} as Role, null];

            // Act

            // Assert
            expect(() =>
              User.create(
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
              ),
            ).toThrowError(InvalidRoleError);
          },
        );

        test.each(validValues)(
          'create a User with invalid refreshTokens should throw error',
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

            // Assert
            expect(() =>
              User.create(
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
                null,
                profilePicture,
                deletedAt,
              ),
            ).toThrowError(InvalidRefreshTokensError);
          },
        );

        test.each(validValues)(
          'create a User with a invalid refreshToken inside a valid refreshTokens array should throw error',
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
            refreshTokens = [{} as RefreshToken, null];

            // Act

            // Assert
            expect(() =>
              User.create(
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
              ),
            ).toThrowError(InvalidRefreshTokenError);
          },
        );

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
          'make changes on refreshTokens getter should make no changes on the original refreshTokens array',
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
            const originalId = 'refresh-token-id';
            refreshTokens = [
              {
                id: { getId: originalId },
              } as MockedObject<RefreshToken>,
            ];
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
            user.refreshTokens.push({
              id: { getId: 'new-refresh-token-1' },
            } as MockedObject<RefreshToken>);
            user.refreshTokens[0] = {
              id: { getId: 'new-refresh-token-2' },
            } as MockedObject<RefreshToken>;

            // Assert
            expect(user.refreshTokens).toHaveLength(1);
            expect(user.refreshTokens[0].id.getId).toBe(originalId);
          },
        );

        test.each(validValues)(
          'get RefreshToken from a User that do not have it should return null',
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
            const refreshTokenUniqueId = {
              equals: jest.fn().mockReturnValue(false),
            } as MockedObject<UniqueId>;
            const refreshToken = {
              id: refreshTokenUniqueId as UniqueId,
            } as MockedObject<RefreshToken>;
            refreshTokens = [refreshToken];

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
            const refreshTokenUniqueIdToFind = {} as MockedObject<UniqueId>;
            const refreshTokenFound = user.getRefreshToken(
              refreshTokenUniqueIdToFind,
            );

            // Assert
            expect(refreshTokenFound).toBeNull();
          },
        );

        test.each(validValues)(
          'get RefreshToken from a User that have it should return it',
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
            const refreshTokenUniqueId1 = {
              equals: jest.fn().mockReturnValue(false),
            } as MockedObject<UniqueId>;
            const refreshToken1 = {
              id: refreshTokenUniqueId1 as UniqueId,
            } as MockedObject<RefreshToken>;

            const refreshTokenUniqueId2 = {
              equals: jest.fn().mockReturnValue(true),
            } as MockedObject<UniqueId>;
            const refreshToken2 = {
              id: refreshTokenUniqueId2 as UniqueId,
              ipAddress: '1.1.1.1',
            } as MockedObject<RefreshToken>;

            refreshTokens = [refreshToken1, refreshToken2];

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
            const refreshTokenUniqueIdToFind = {} as MockedObject<UniqueId>;
            const refreshTokenFound = user.getRefreshToken(
              refreshTokenUniqueIdToFind,
            );

            // Assert
            expect(refreshTokenFound.ipAddress).toBe('1.1.1.1');
          },
        );

        test.each(validValues)(
          'add RefreshToken to a deleted User should throw exception',
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
            deletedAt = {
              getMilliseconds: 4,
            } as MockedObject<MillisecondsDate>;

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
            const refreshToken = {} as MockedObject<RefreshToken>;
            // Assert
            expect(() => user.addRefreshToken(refreshToken)).toThrowError(
              DeletedUserCannotBeUpdatedError,
            );
          },
        );

        test.each(validValues)(
          'add RefreshToken to a blocked User should throw exception',
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
            isBlocked = {
              getStatus: true,
            } as MockedObject<IsBlocked>;
            deletedAt = null;

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
            const refreshToken = {} as MockedObject<RefreshToken>;

            // Assert
            expect(() => user.addRefreshToken(refreshToken)).toThrowError(
              BlockedUserCannotBeUpdatedError,
            );
          },
        );

        test.each(validValues)(
          'add RefreshToken to a unverified User should throw exception',
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
            isVerified = {
              getStatus: false,
            } as MockedObject<IsVerified>;
            isBlocked = {
              getStatus: false,
            } as MockedObject<IsBlocked>;
            deletedAt = null;

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
            const refreshToken = {} as MockedObject<RefreshToken>;

            // Assert
            expect(() => user.addRefreshToken(refreshToken)).toThrowError(
              UnverifiedUserCannotBeUpdatedError,
            );
          },
        );

        test.each(validValues)(
          'add a null RefreshToken to a User should throw exception',
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
            isVerified = {
              getStatus: true,
            } as MockedObject<IsVerified>;
            isBlocked = {
              getStatus: false,
            } as MockedObject<IsBlocked>;
            deletedAt = null;

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

            // Assert
            expect(() => user.addRefreshToken(null)).toThrowError(
              InvalidRefreshTokenError,
            );
          },
        );

        test.each(validValues)(
          'add a RefreshToken to a User that already have it should throw exception',
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
            const refreshToken = {
              equals: jest.fn().mockReturnValue(true),
            } as MockedObject<RefreshToken>;
            refreshTokens = [refreshToken];
            isVerified = {
              getStatus: true,
            } as MockedObject<IsVerified>;
            isBlocked = {
              getStatus: false,
            } as MockedObject<IsBlocked>;
            deletedAt = null;

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
            const newRefreshToken = {} as MockedObject<RefreshToken>;

            // Assert
            expect(() => user.addRefreshToken(newRefreshToken)).toThrowError(
              DuplicatedRefreshTokenError,
            );
          },
        );

        test.each(validValues)(
          'add a RefreshToken to a User should add it',
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
            const refreshToken = {
              equals: jest.fn().mockReturnValue(false),
            } as MockedObject<RefreshToken>;
            refreshTokens = [refreshToken];
            isVerified = {
              getStatus: true,
            } as MockedObject<IsVerified>;
            isBlocked = {
              getStatus: false,
            } as MockedObject<IsBlocked>;
            deletedAt = null;

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
            const newRefreshToken = {} as MockedObject<RefreshToken>;
            user.addRefreshToken(newRefreshToken);

            // Assert
            expect(refreshToken.equals.mock.calls.length).toBe(1);
          },
        );

        test.each(validValues)(
          'replace RefreshToken of a deleted User should throw exception',
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
            deletedAt = {
              getMilliseconds: 4,
            } as MockedObject<MillisecondsDate>;

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

            // Assert
            expect(() => user.replaceRefreshToken(null, null)).toThrowError(
              DeletedUserCannotBeUpdatedError,
            );
          },
        );

        test.each(validValues)(
          'replace a RefreshToken of a blocked User should throw exception',
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
            isBlocked = {
              getStatus: true,
            } as MockedObject<IsBlocked>;
            deletedAt = null;

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

            // Assert
            expect(() => user.replaceRefreshToken(null, null)).toThrowError(
              BlockedUserCannotBeUpdatedError,
            );
          },
        );

        test.each(validValues)(
          'replace a RefreshToken of a unverified User should throw exception',
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
            isVerified = {
              getStatus: false,
            } as MockedObject<IsVerified>;
            isBlocked = {
              getStatus: false,
            } as MockedObject<IsBlocked>;
            deletedAt = null;

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

            // Assert
            expect(() => user.replaceRefreshToken(null, null)).toThrowError(
              UnverifiedUserCannotBeUpdatedError,
            );
          },
        );

        test.each(validValues)(
          'replace a null RefreshToken of a User should throw exception',
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
            isVerified = {
              getStatus: true,
            } as MockedObject<IsVerified>;
            isBlocked = {
              getStatus: false,
            } as MockedObject<IsBlocked>;
            deletedAt = null;

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

            // Assert
            expect(() => user.replaceRefreshToken(null, null)).toThrowError(
              InvalidRefreshTokenError,
            );
          },
        );

        test.each(validValues)(
          'replace a RefreshToken to a User that not have it should throw exception',
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
            const refreshTokenUniqueId = {
              equals: jest.fn().mockReturnValue(false),
            } as MockedObject<UniqueId>;
            const refreshTokenToReplace = {
              id: refreshTokenUniqueId as UniqueId,
            } as MockedObject<RefreshToken>;
            refreshTokens = [refreshTokenToReplace];
            isVerified = {
              getStatus: true,
            } as MockedObject<IsVerified>;
            isBlocked = {
              getStatus: false,
            } as MockedObject<IsBlocked>;
            deletedAt = null;

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
            const newRefreshToken = {} as MockedObject<RefreshToken>;

            // Assert
            expect(() =>
              user.replaceRefreshToken(null, newRefreshToken),
            ).toThrowError(RefreshTokenNotFoundError);
          },
        );

        test.each(validValues)(
          'replace a RefreshToken to a User that already have it should throw exception',
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
            const refreshTokenUniqueId = {
              equals: jest.fn().mockReturnValue(true),
            } as MockedObject<UniqueId>;
            const refreshTokenToReplace = {
              id: refreshTokenUniqueId as UniqueId,
              equals: jest.fn().mockReturnValue(true),
            } as MockedObject<RefreshToken>;
            refreshTokens = [refreshTokenToReplace];
            isVerified = {
              getStatus: true,
            } as MockedObject<IsVerified>;
            isBlocked = {
              getStatus: false,
            } as MockedObject<IsBlocked>;
            deletedAt = null;

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
            const newRefreshToken = {} as MockedObject<RefreshToken>;

            // Assert
            expect(() =>
              user.replaceRefreshToken(null, newRefreshToken),
            ).toThrowError(DuplicatedRefreshTokenError);
          },
        );

        test.each(validValues)(
          'replace a RefreshToken of a User should update it',
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
            const refreshTokenUniqueId = {
              equals: jest.fn().mockReturnValue(true),
            } as MockedObject<UniqueId>;
            const refreshTokenToReplace = {
              id: refreshTokenUniqueId as UniqueId,
              equals: jest.fn().mockReturnValue(false),
              replace: jest.fn(),
            } as MockedObject<RefreshToken>;
            refreshTokens = [refreshTokenToReplace];
            isVerified = {
              getStatus: true,
            } as MockedObject<IsVerified>;
            isBlocked = {
              getStatus: false,
            } as MockedObject<IsBlocked>;
            deletedAt = null;

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
            const newRefreshToken = {} as MockedObject<RefreshToken>;
            user.replaceRefreshToken(refreshTokenToReplace.id, newRefreshToken);

            // Assert
            expect(refreshTokenToReplace.replace.mock.calls.length).toBe(1);
          },
        );
      });
    });
  });
});
