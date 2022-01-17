import { MockedObject } from 'ts-jest/dist/utils/testing';
import {
  RefreshToken,
  RefreshTokenId,
  User,
  UserId,
  VerificationCode,
} from '..';
import { InvalidEntityIdError } from '../../../../shared/domain/entities';
import { DateTime, WebUrl } from '../../../../shared/domain/value-objects';
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
import {
  BlockedUserCannotBeUpdatedError,
  BlockedUserCannotGenerateNewVerificationCodesError,
  DeletedUserCannotBeUpdatedError,
  DeletedUserCannotGenerateNewVerificationCodesError,
  DuplicatedUserRefreshTokenError,
  InvalidUserBiographyError,
  InvalidUserBirthdayError,
  InvalidUserBlockedStatusError,
  InvalidUserCreatedAtError,
  InvalidUserEmailError,
  InvalidUserFirstNameError,
  InvalidUserLastNameError,
  InvalidUserPasswordHashError,
  InvalidUserRefreshTokenError,
  InvalidUserRefreshTokensError,
  InvalidUserRoleError,
  InvalidUserRolesError,
  InvalidUserUpdatedAtError,
  InvalidUserUsernameError,
  InvalidUserVerificationCodeError,
  InvalidUserVerificationCodesError,
  InvalidUserVerificationStatusError,
  RefreshTokenNotFoundError,
  UnverifiedUserCannotBeUpdatedError,
  VerifiedUserCannotGenerateNewVerificationCodesError,
} from './exceptions';

const validValues = [
  [
    {
      value: 'id-0',
      equals: jest.fn(),
    } as MockedObject<UserId>,
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
    [
      {
        id: { value: 'verification-code-0' },
        equals: jest.fn().mockReturnValue(true),
      } as MockedObject<VerificationCode>,
    ],
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
    } as MockedObject<DateTime>,
    {
      getMilliseconds: 2,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<DateTime>,
    {
      getMilliseconds: 3,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<DateTime>,
    {
      getBiography: 'A nice person 0.',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<Biography>,
    [] as MockedObject<Role[]>,
    [
      { id: { value: 'refresh-token-id-0' } },
      { id: { value: 'refresh-token-id-1' } },
      { id: { value: 'refresh-token-id-2' } },
      { id: { value: 'refresh-token-id-3' } },
      { id: { value: 'refresh-token-id-4' } },
      { id: { value: 'refresh-token-id-5' } },
    ] as MockedObject<RefreshToken[]>,
    {
      getUrl: 'https://www.example.com/0.jpg',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<WebUrl>,
    {
      getMilliseconds: 4,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<DateTime>,
  ],
  [
    {
      value: 'id-1',
      equals: jest.fn(),
    } as MockedObject<UserId>,
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
    [
      {
        id: { value: 'verification-code-1' },
        equals: jest.fn().mockReturnValue(true),
      } as MockedObject<VerificationCode>,
    ],
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
    } as MockedObject<DateTime>,
    {
      getMilliseconds: 2,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<DateTime>,
    {
      getMilliseconds: 3,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<DateTime>,
    {
      getBiography: 'A nice person 1.',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<Biography>,
    [] as MockedObject<Role[]>,
    [
      { id: { value: 'refresh-token-id-0' } },
      { id: { value: 'refresh-token-id-1' } },
    ] as MockedObject<RefreshToken[]>,
    {
      getUrl: 'https://www.example.com/1.jpg',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<WebUrl>,
    {
      getMilliseconds: 4,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<DateTime>,
  ],
  [
    {
      value: 'id-2',
      equals: jest.fn(),
    } as MockedObject<UserId>,
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
    [
      {
        id: { value: 'verification-code-2' },
        equals: jest.fn().mockReturnValue(true),
      } as MockedObject<VerificationCode>,
    ],
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
    } as MockedObject<DateTime>,
    {
      getMilliseconds: 2,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<DateTime>,
    {
      getMilliseconds: 3,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<DateTime>,
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
    } as MockedObject<DateTime>,
  ],
  [
    {
      value: 'id-3',
      equals: jest.fn(),
    } as MockedObject<UserId>,
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
    [
      {
        id: { value: 'verification-code-3' },
        equals: jest.fn().mockReturnValue(true),
      } as MockedObject<VerificationCode>,
    ],
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
    } as MockedObject<DateTime>,
    {
      getMilliseconds: 2,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<DateTime>,
    {
      getMilliseconds: 3,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<DateTime>,
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
      value: 'id-4',
      equals: jest.fn(),
    } as MockedObject<UserId>,
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
    [
      {
        id: { value: 'verification-code-4' },
        equals: jest.fn().mockReturnValue(true),
      } as MockedObject<VerificationCode>,
    ],
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
    } as MockedObject<DateTime>,
    {
      getMilliseconds: 2,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<DateTime>,
    {
      getMilliseconds: 3,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<DateTime>,
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
    } as MockedObject<DateTime>,
  ],
  [
    {
      value: 'id-5',
      equals: jest.fn(),
    } as MockedObject<UserId>,
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
    [
      {
        id: { value: 'verification-code-5' },
        equals: jest.fn().mockReturnValue(true),
      } as MockedObject<VerificationCode>,
    ],
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
    } as MockedObject<DateTime>,
    {
      getMilliseconds: 2,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<DateTime>,
    {
      getMilliseconds: 3,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<DateTime>,
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
      value: 'id-6',
      equals: jest.fn(),
    } as MockedObject<UserId>,
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
    [
      {
        id: { value: 'verification-code-6' },
        equals: jest.fn().mockReturnValue(true),
      } as MockedObject<VerificationCode>,
    ],
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
    } as MockedObject<DateTime>,
    {
      getMilliseconds: 2,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<DateTime>,
    {
      getMilliseconds: 3,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<DateTime>,
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
      value: 'id-7',
      equals: jest.fn(),
    } as MockedObject<UserId>,
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
    [
      {
        id: { value: 'verification-code-7' },
        equals: jest.fn().mockReturnValue(true),
      } as MockedObject<VerificationCode>,
    ],
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
    } as MockedObject<DateTime>,
    {
      getMilliseconds: 2,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<DateTime>,
    {
      getMilliseconds: 3,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<DateTime>,
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
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
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
                verificationCodes,
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
            ).toThrowError(InvalidEntityIdError);
          },
        );

        test.each(validValues)(
          'create a User with invalid email should throw error',
          (
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange

            // Act

            // Assert
            expect(() =>
              User.create(
                userId,
                null,
                username,
                passwordHash,
                isVerified,
                verificationCodes,
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
            ).toThrowError(InvalidUserEmailError);
          },
        );

        test.each(validValues)(
          'create a User with invalid username should throw error',
          (
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange

            // Act

            // Assert
            expect(() =>
              User.create(
                userId,
                email,
                null,
                passwordHash,
                isVerified,
                verificationCodes,
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
            ).toThrowError(InvalidUserUsernameError);
          },
        );

        test.each(validValues)(
          'create a User with invalid passwordHash should throw error',
          (
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange

            // Act

            // Assert
            expect(() =>
              User.create(
                userId,
                email,
                username,
                null,
                isVerified,
                verificationCodes,
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
            ).toThrowError(InvalidUserPasswordHashError);
          },
        );

        test.each(validValues)(
          'create a User with invalid isVerified should throw error',
          (
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange

            // Act

            // Assert
            expect(() =>
              User.create(
                userId,
                email,
                username,
                passwordHash,
                null,
                verificationCodes,
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
            ).toThrowError(InvalidUserVerificationStatusError);
          },
        );

        test.each(validValues)(
          'create a User with invalid verificationCode should throw error',
          (
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange

            // Act

            // Assert
            expect(() =>
              User.create(
                userId,
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
            ).toThrowError(InvalidUserVerificationCodesError);
          },
        );

        test.each(validValues)(
          'create a User with a invalid refreshToken inside a valid refreshTokens array should throw error',
          (
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange
            verificationCodes = [{} as MockedObject<VerificationCode>, null];

            // Act

            // Assert
            expect(() =>
              User.create(
                userId,
                email,
                username,
                passwordHash,
                isVerified,
                verificationCodes,
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
            ).toThrowError(InvalidUserVerificationCodeError);
          },
        );

        test.each(validValues)(
          'create a User with invalid isBlocked should throw error',
          (
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange

            // Act

            // Assert
            expect(() =>
              User.create(
                userId,
                email,
                username,
                passwordHash,
                isVerified,
                verificationCodes,
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
            ).toThrowError(InvalidUserBlockedStatusError);
          },
        );

        test.each(validValues)(
          'create a User with invalid firstName should throw error',
          (
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange

            // Act

            // Assert
            expect(() =>
              User.create(
                userId,
                email,
                username,
                passwordHash,
                isVerified,
                verificationCodes,
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
            ).toThrowError(InvalidUserFirstNameError);
          },
        );

        test.each(validValues)(
          'create a User with invalid lastName should throw error',
          (
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange

            // Act

            // Assert
            expect(() =>
              User.create(
                userId,
                email,
                username,
                passwordHash,
                isVerified,
                verificationCodes,
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
            ).toThrowError(InvalidUserLastNameError);
          },
        );

        test.each(validValues)(
          'create a User with invalid birthday should throw error',
          (
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange

            // Act

            // Assert
            expect(() =>
              User.create(
                userId,
                email,
                username,
                passwordHash,
                isVerified,
                verificationCodes,
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
            ).toThrowError(InvalidUserBirthdayError);
          },
        );

        test.each(validValues)(
          'create a User with invalid createdAt should throw error',
          (
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange

            // Act

            // Assert
            expect(() =>
              User.create(
                userId,
                email,
                username,
                passwordHash,
                isVerified,
                verificationCodes,
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
            ).toThrowError(InvalidUserCreatedAtError);
          },
        );

        test.each(validValues)(
          'create a User with invalid updatedAt should throw error',
          (
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange

            // Act

            // Assert
            expect(() =>
              User.create(
                userId,
                email,
                username,
                passwordHash,
                isVerified,
                verificationCodes,
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
            ).toThrowError(InvalidUserUpdatedAtError);
          },
        );

        test.each(validValues)(
          'create a User with invalid biography should throw error',
          (
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange

            // Act

            // Assert
            expect(() =>
              User.create(
                userId,
                email,
                username,
                passwordHash,
                isVerified,
                verificationCodes,
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
            ).toThrowError(InvalidUserBiographyError);
          },
        );

        test.each(validValues)(
          'create a User with invalid roles should throw error',
          (
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange

            // Act

            // Assert
            expect(() =>
              User.create(
                userId,
                email,
                username,
                passwordHash,
                isVerified,
                verificationCodes,
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
            ).toThrowError(InvalidUserRolesError);
          },
        );

        test.each(validValues)(
          'create a User with a invalid role inside a valid roles array should throw error',
          (
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange
            roles = [{} as Role, null];

            // Act

            // Assert
            expect(() =>
              User.create(
                userId,
                email,
                username,
                passwordHash,
                isVerified,
                verificationCodes,
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
            ).toThrowError(InvalidUserRoleError);
          },
        );

        test.each(validValues)(
          'create a User with invalid refreshTokens should throw error',
          (
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange

            // Act

            // Assert
            expect(() =>
              User.create(
                userId,
                email,
                username,
                passwordHash,
                isVerified,
                verificationCodes,
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
            ).toThrowError(InvalidUserRefreshTokensError);
          },
        );

        test.each(validValues)(
          'create a User with a invalid refreshToken inside a valid refreshTokens array should throw error',
          (
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange
            refreshTokens = [{} as RefreshToken, null];

            // Act

            // Assert
            expect(() =>
              User.create(
                userId,
                email,
                username,
                passwordHash,
                isVerified,
                verificationCodes,
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
            ).toThrowError(InvalidUserRefreshTokenError);
          },
        );

        test.each(validValues)(
          'should create an User with [id: %p], [email: %p], [username: %p], [passwordHash: %p], [isVerified: %p], [verificationCodes: %p], [isBlocked: %p], [firstName: %p], [lastName: %p], [birthday: %p], [createdAt: %p], [updatedAt: %p], [biography: %p]',
          (
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
          ) => {
            // Arrange

            // Act
            const user = User.create(
              userId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCodes,
              isBlocked,
              firstName,
              lastName,
              birthday,
              createdAt,
              updatedAt,
              biography,
            );

            // Assert
            expect(user.id.value).toBe(userId.value);
            expect(user.email.getEmail).toBe(email.getEmail);
            expect(user.username.getUsername).toBe(username.getUsername);
            expect(user.passwordHash.getPasswordHash).toBe(
              passwordHash.getPasswordHash,
            );
            expect(user.isVerified).toBe(isVerified.getStatus);
            for (let i = 0; i < verificationCodes.length; i++) {
              expect(user.verificationCodes[i].id.value).toBe(
                verificationCodes[i].id.value,
              );
            }
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

            expect(user.roles.length).toBe(0);
            expect(user.refreshTokens.length).toBe(0);
            expect(user.deletedAt).toBeNull();
            expect(user.profilePicture).toBeNull();
          },
        );

        test.each(validValues)(
          'should create an User with [id: %p], [email: %p], [username: %p], [passwordHash: %p], [isVerified: %p], [verificationCodes: %p], [isBlocked: %p], [firstName: %p], [lastName: %p], [birthday: %p], [createdAt: %p], [updatedAt: %p], [biography: %p], [roles: %p], [refreshTokens: %p], [profilePicture: %p] and [deletedAt: %p]',
          (
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange

            // Act
            const user = User.create(
              userId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCodes,
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
            expect(user.id.value).toBe(userId.value);
            expect(user.email.getEmail).toBe(email.getEmail);
            expect(user.username.getUsername).toBe(username.getUsername);
            expect(user.passwordHash.getPasswordHash).toBe(
              passwordHash.getPasswordHash,
            );
            expect(user.isVerified).toBe(isVerified.getStatus);
            for (let i = 0; i < verificationCodes.length; i++) {
              expect(user.verificationCodes[i].id.value).toBe(
                verificationCodes[i].id.value,
              );
            }
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
          'comparing two entities should call "equals" method from UserId',
          (
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange
            const user = User.create(
              userId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCodes,
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
            expect(userId.equals.mock.calls).toHaveLength(1);
          },
        );

        test.each(validValues)(
          'update password of User should change the property value',
          (
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange
            const user = User.create(
              userId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCodes,
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
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange
            const user = User.create(
              userId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCodes,
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
          'make changes on verificationCodes getter should make no changes on the original verificationCodes array',
          (
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange
            const originalId = 'original-verification-code-id';
            verificationCodes = [
              {
                id: { value: originalId },
              } as MockedObject<VerificationCode>,
            ];
            const user = User.create(
              userId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCodes,
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
            user.verificationCodes.push({
              id: { value: 'new-verification-code-1' },
            } as MockedObject<VerificationCode>);
            user.verificationCodes[0] = {
              id: { value: 'new-verification-code-2' },
            } as MockedObject<VerificationCode>;

            // Assert
            expect(user.verificationCodes.length).toBe(1);
            expect(user.verificationCodes[0].id.value).toBe(originalId);
          },
        );

        test.each(validValues)(
          'add a new verification code in a deleted User should throw error',
          (
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange
            const originalId = 'original-verification-code-id';
            verificationCodes = [
              {
                id: { value: originalId },
              } as MockedObject<VerificationCode>,
            ];
            deletedAt = {
              getMilliseconds: 4,
            } as MockedObject<DateTime>;
            const user = User.create(
              userId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCodes,
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
            const newId = 'new-verification-code-id';
            const newVerificationCode = {
              id: { value: newId },
            } as MockedObject<VerificationCode>;

            // Assert
            expect(() =>
              user.addVerificationCode(newVerificationCode),
            ).toThrowError(DeletedUserCannotGenerateNewVerificationCodesError);
          },
        );

        test.each(validValues)(
          'add a new verification code in a blocked User should throw error',
          (
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange
            const originalId = 'original-verification-code-id';
            verificationCodes = [
              {
                id: { value: originalId },
              } as MockedObject<VerificationCode>,
            ];
            isBlocked = {
              getStatus: true,
            } as MockedObject<IsBlocked>;
            deletedAt = null;

            const user = User.create(
              userId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCodes,
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
            const newId = 'new-verification-code-id';
            const newVerificationCode = {
              id: { value: newId },
            } as MockedObject<VerificationCode>;

            // Assert
            expect(() =>
              user.addVerificationCode(newVerificationCode),
            ).toThrowError(BlockedUserCannotGenerateNewVerificationCodesError);
          },
        );

        test.each(validValues)(
          'add a new verification code in a already verified User should throw error',
          (
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange
            const originalId = 'original-verification-code-id';
            verificationCodes = [
              {
                id: { value: originalId },
              } as MockedObject<VerificationCode>,
            ];
            isBlocked = {
              getStatus: false,
            } as MockedObject<IsBlocked>;
            isVerified = {
              getStatus: true,
            } as MockedObject<IsVerified>;
            deletedAt = null;

            const user = User.create(
              userId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCodes,
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
            const newId = 'new-verification-code-id';
            const newVerificationCode = {
              id: { value: newId },
            } as MockedObject<VerificationCode>;

            // Assert
            expect(() =>
              user.addVerificationCode(newVerificationCode),
            ).toThrowError(VerifiedUserCannotGenerateNewVerificationCodesError);
          },
        );

        test.each(validValues)(
          'add a null verification code in an User should throw error',
          (
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange
            const originalId = 'original-verification-code-id';
            verificationCodes = [
              {
                id: { value: originalId },
              } as MockedObject<VerificationCode>,
            ];
            isBlocked = {
              getStatus: false,
            } as MockedObject<IsBlocked>;
            isVerified = {
              getStatus: false,
            } as MockedObject<IsVerified>;
            deletedAt = null;

            const user = User.create(
              userId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCodes,
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
            expect(() => user.addVerificationCode(null)).toThrowError(
              InvalidUserVerificationCodeError,
            );
          },
        );

        test.each(validValues)(
          'add a new verification code in an User should update the verificationCode array',
          (
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange
            const originalId = 'original-verification-code-id';
            verificationCodes = [
              {
                id: { value: originalId },
              } as MockedObject<VerificationCode>,
            ];
            isBlocked = {
              getStatus: false,
            } as MockedObject<IsBlocked>;
            isVerified = {
              getStatus: false,
            } as MockedObject<IsVerified>;
            deletedAt = null;

            const user = User.create(
              userId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCodes,
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
            const newId = 'new-verification-code-id';
            const newVerificationCode = {
              id: { value: newId },
            } as MockedObject<VerificationCode>;
            user.addVerificationCode(newVerificationCode);

            // Assert
            expect(user.verificationCodes.length).toBe(2);
            expect(user.verificationCodes[0].id.value).toBe(originalId);
            expect(user.verificationCodes[1].id.value).toBe(newId);
          },
        );

        test.each(validValues)(
          'block User should change the property value',
          (
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange
            const user = User.create(
              userId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCodes,
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
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange
            const user = User.create(
              userId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCodes,
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
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange
            const user = User.create(
              userId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCodes,
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
            const newBirthday = {
              getMilliseconds: new Date(2005, 1, 1).getTime(),
            } as MockedObject<DateTime>;
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
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange
            const user = User.create(
              userId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCodes,
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
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange
            const user = User.create(
              userId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCodes,
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
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange
            const user = User.create(
              userId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCodes,
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
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange
            const user = User.create(
              userId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCodes,
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
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
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
              userId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCodes,
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
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
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
              userId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCodes,
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
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
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
              userId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCodes,
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
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
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
              userId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCodes,
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
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
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
              userId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCodes,
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
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange
            const originalId = 'refresh-token-id';
            refreshTokens = [
              {
                id: { value: originalId },
              } as MockedObject<RefreshToken>,
            ];
            const user = User.create(
              userId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCodes,
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
              id: { value: 'new-refresh-token-1' },
            } as MockedObject<RefreshToken>);
            user.refreshTokens[0] = {
              id: { value: 'new-refresh-token-2' },
            } as MockedObject<RefreshToken>;

            // Assert
            expect(user.refreshTokens.length).toBe(1);
            expect(user.refreshTokens[0].id.value).toBe(originalId);
          },
        );

        test.each(validValues)(
          'get RefreshToken from a User that do not have it should return null',
          (
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange
            const refreshTokenId = {
              equals: jest.fn().mockReturnValue(false),
            } as MockedObject<RefreshTokenId>;
            const refreshToken = {
              id: refreshTokenId as RefreshTokenId,
            } as MockedObject<RefreshToken>;
            refreshTokens = [refreshToken];

            const user = User.create(
              userId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCodes,
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
            const refreshTokenIdToFind = {} as RefreshTokenId;
            const refreshTokenFound =
              user.getRefreshToken(refreshTokenIdToFind);

            // Assert
            expect(refreshTokenFound).toBeNull();
          },
        );

        test.each(validValues)(
          'get RefreshToken from a User that have it should return it',
          (
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange
            const refreshTokenId1 = {
              equals: jest.fn().mockReturnValue(false),
            } as MockedObject<RefreshTokenId>;
            const refreshToken1 = {
              id: refreshTokenId1 as RefreshTokenId,
            } as MockedObject<RefreshToken>;

            const refreshTokenId2 = {
              equals: jest.fn().mockReturnValue(true),
            } as MockedObject<RefreshTokenId>;
            const refreshToken2 = {
              id: refreshTokenId2 as RefreshTokenId,
              ipAddress: '1.1.1.1',
            } as MockedObject<RefreshToken>;

            refreshTokens = [refreshToken1, refreshToken2];

            const user = User.create(
              userId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCodes,
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
            const refreshTokenIdToFind = {} as MockedObject<RefreshTokenId>;
            const refreshTokenFound =
              user.getRefreshToken(refreshTokenIdToFind);

            // Assert
            expect(refreshTokenFound.ipAddress).toBe('1.1.1.1');
          },
        );

        test.each(validValues)(
          'add RefreshToken to a deleted User should throw exception',
          (
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange
            deletedAt = {
              getMilliseconds: 4,
            } as MockedObject<DateTime>;

            const user = User.create(
              userId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCodes,
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
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange
            isBlocked = {
              getStatus: true,
            } as MockedObject<IsBlocked>;
            deletedAt = null;

            const user = User.create(
              userId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCodes,
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
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
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
              userId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCodes,
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
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
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
              userId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCodes,
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
              InvalidUserRefreshTokenError,
            );
          },
        );

        test.each(validValues)(
          'add a RefreshToken to a User that already have it should throw exception',
          (
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
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
              userId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCodes,
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
              DuplicatedUserRefreshTokenError,
            );
          },
        );

        test.each(validValues)(
          'add a RefreshToken to a User should add it',
          (
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
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
              userId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCodes,
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
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange
            deletedAt = {
              getMilliseconds: 4,
            } as MockedObject<DateTime>;

            const user = User.create(
              userId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCodes,
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
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange
            isBlocked = {
              getStatus: true,
            } as MockedObject<IsBlocked>;
            deletedAt = null;

            const user = User.create(
              userId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCodes,
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
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
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
              userId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCodes,
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
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
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
              userId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCodes,
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
              InvalidUserRefreshTokenError,
            );
          },
        );

        test.each(validValues)(
          'replace a RefreshToken to a User that not have it should throw exception',
          (
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange
            const refreshTokenId = {
              equals: jest.fn().mockReturnValue(false),
            } as MockedObject<RefreshTokenId>;
            const refreshTokenToReplace = {
              id: refreshTokenId as RefreshTokenId,
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
              userId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCodes,
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
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange
            const refreshTokenId = {
              equals: jest.fn().mockReturnValue(true),
            } as MockedObject<RefreshTokenId>;
            const refreshTokenToReplace = {
              id: refreshTokenId as RefreshTokenId,
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
              userId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCodes,
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
            ).toThrowError(DuplicatedUserRefreshTokenError);
          },
        );

        test.each(validValues)(
          'replace a RefreshToken of a User should update it',
          (
            userId: MockedObject<UserId>,
            email: MockedObject<Email>,
            username: MockedObject<Username>,
            passwordHash: MockedObject<PasswordHash>,
            isVerified: MockedObject<IsVerified>,
            verificationCodes: MockedObject<VerificationCode>[],
            isBlocked: MockedObject<IsBlocked>,
            firstName: MockedObject<FirstName>,
            lastName: MockedObject<LastName>,
            birthday: MockedObject<DateTime>,
            createdAt: MockedObject<DateTime>,
            updatedAt: MockedObject<DateTime>,
            biography: MockedObject<Biography>,
            roles: MockedObject<Role[]>,
            refreshTokens: MockedObject<RefreshToken[]>,
            profilePicture: MockedObject<WebUrl>,
            deletedAt: MockedObject<DateTime>,
          ) => {
            // Arrange
            const refreshTokenId = {
              equals: jest.fn().mockReturnValue(true),
            } as MockedObject<RefreshTokenId>;
            const refreshTokenToReplace = {
              id: refreshTokenId as RefreshTokenId,
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
              userId,
              email,
              username,
              passwordHash,
              isVerified,
              verificationCodes,
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
