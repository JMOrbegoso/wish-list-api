import { ObjectId } from '@mikro-orm/mongodb';
import { MockedObject } from 'ts-jest/dist/utils/testing';
import { User } from '../../domain/entities';
import {
  RefreshTokenEntity,
  VerificationCodeEntity,
} from '../persistence/entities';
import { userToUserEntity } from '.';

describe('users', () => {
  describe('infrastructure', () => {
    describe('mappings', () => {
      describe('User to UserEntity', () => {
        const validVerificationCodeEntities = [
          {
            id: 'id-0',
            createdAt: new Date(2021, 5, 5),
            duration: 100,
          } as MockedObject<VerificationCodeEntity>,
          {
            id: 'id-1',
            createdAt: new Date(2021, 5, 5),
            duration: 100,
          } as MockedObject<VerificationCodeEntity>,
          {
            id: 'id-2',
            createdAt: new Date(2021, 5, 5),
            duration: 100,
          } as MockedObject<VerificationCodeEntity>,
          {
            id: 'id-3',
            createdAt: new Date(2021, 5, 5),
            duration: 100,
          } as MockedObject<VerificationCodeEntity>,
        ];

        const validRefreshTokenEntities = [
          {
            id: 'id-0',
            createdAt: new Date(2021, 5, 5),
            duration: 100,
            ipAddress: '192.168.0.1',
            replacedAt: null,
            replacedBy: null,
            revokedAt: null,
          } as MockedObject<RefreshTokenEntity>,
          {
            id: 'id-1',
            createdAt: new Date(2021, 5, 5),
            duration: 100,
            ipAddress: '192.168.0.1',
            replacedAt: null,
            replacedBy: null,
            revokedAt: new Date(2021, 5, 5),
          } as MockedObject<RefreshTokenEntity>,
          {
            id: 'id-2',
            createdAt: new Date(2021, 5, 5),
            duration: 100,
            ipAddress: '192.168.0.1',
            replacedAt: new Date(2021, 5, 5),
            replacedBy: 'id-1',
            revokedAt: null,
          } as MockedObject<RefreshTokenEntity>,
          {
            id: 'id-3',
            createdAt: new Date(2021, 5, 5),
            duration: 100,
            ipAddress: '192.168.0.1',
            replacedAt: new Date(2021, 5, 5),
            replacedBy: 'id-1',
            revokedAt: new Date(2021, 5, 5),
          } as MockedObject<RefreshTokenEntity>,
        ];

        const validValues = [
          [
            {
              id: {
                value: 'id-0',
              },
              email: {
                getEmail: 'email0@email.com',
              },
              username: {
                getUsername: 'John_Doe_0',
              },
              passwordHash: {
                getPasswordHash: 'hash0',
              },
              isVerified: true,
              isBlocked: false,
              firstName: {
                getFirstName: 'FirstName0',
              },
              lastName: {
                getLastName: 'LastName0',
              },
              birthday: {
                getDate: new Date(1990, 5, 5),
              },
              createdAt: {
                getDate: new Date(1995, 5, 5),
              },
              updatedAt: {
                getDate: new Date(2000, 5, 5),
              },
              biography: {
                getBiography: 'A nice person 0.',
              },
              roles: ['Admin'],
              profilePicture: {
                getUrl: 'https://www.example.com/0.jpg',
              },
              deletedAt: {
                getDate: new Date(2001, 5, 5),
              },
            } as MockedObject<User>,
            [
              validVerificationCodeEntities[0],
              validVerificationCodeEntities[1],
              validVerificationCodeEntities[2],
              validVerificationCodeEntities[3],
            ] as MockedObject<VerificationCodeEntity[]>,
            [
              validRefreshTokenEntities[0],
              validRefreshTokenEntities[1],
              validRefreshTokenEntities[2],
              validRefreshTokenEntities[3],
            ] as MockedObject<RefreshTokenEntity[]>,
          ],
          [
            {
              id: {
                value: 'id-1',
              },
              email: {
                getEmail: 'email1@email.com',
              },
              username: {
                getUsername: 'John_Doe_1',
              },
              passwordHash: {
                getPasswordHash: 'hash1',
              },
              isVerified: true,
              isBlocked: false,
              firstName: {
                getFirstName: 'FirstName1',
              },
              lastName: {
                getLastName: 'LastName1',
              },
              birthday: {
                getDate: new Date(1990, 5, 5),
              },
              createdAt: {
                getDate: new Date(1995, 5, 5),
              },
              updatedAt: {
                getDate: new Date(2000, 5, 5),
              },
              biography: {
                getBiography: 'A nice person 1.',
              },
              roles: ['Admin', 'Moderator'],
              profilePicture: {
                getUrl: 'https://www.example.com/1.jpg',
              },
              deletedAt: {
                getDate: new Date(2001, 5, 5),
              },
            } as MockedObject<User>,
            [
              validVerificationCodeEntities[0],
              validVerificationCodeEntities[3],
            ] as MockedObject<VerificationCodeEntity[]>,
            [
              validRefreshTokenEntities[0],
              validRefreshTokenEntities[3],
            ] as MockedObject<RefreshTokenEntity[]>,
          ],
          [
            {
              id: {
                value: 'id-2',
              },
              email: {
                getEmail: 'email2@email.com',
              },
              username: {
                getUsername: 'John_Doe_2',
              },
              passwordHash: {
                getPasswordHash: 'hash2',
              },
              isVerified: true,
              isBlocked: false,
              firstName: {
                getFirstName: 'FirstName2',
              },
              lastName: {
                getLastName: 'LastName2',
              },
              birthday: {
                getDate: new Date(1990, 5, 5),
              },
              createdAt: {
                getDate: new Date(1995, 5, 5),
              },
              updatedAt: {
                getDate: new Date(2000, 5, 5),
              },
              biography: {
                getBiography: 'A nice person 2.',
              },
              roles: ['Admin', 'Moderator'],
              profilePicture: null,
              deletedAt: {
                getDate: new Date(2001, 5, 5),
              },
            } as MockedObject<User>,
            [
              validVerificationCodeEntities[1],
              validVerificationCodeEntities[2],
              validVerificationCodeEntities[3],
            ] as MockedObject<VerificationCodeEntity[]>,
            [
              validRefreshTokenEntities[1],
              validRefreshTokenEntities[2],
              validRefreshTokenEntities[3],
            ] as MockedObject<RefreshTokenEntity[]>,
          ],
          [
            {
              id: {
                value: 'id-3',
              },
              email: {
                getEmail: 'email3@email.com',
              },
              username: {
                getUsername: 'John_Doe_3',
              },
              passwordHash: {
                getPasswordHash: 'hash3',
              },
              isVerified: true,
              isBlocked: false,
              firstName: {
                getFirstName: 'FirstName3',
              },
              lastName: {
                getLastName: 'LastName3',
              },
              birthday: {
                getDate: new Date(1990, 5, 5),
              },
              createdAt: {
                getDate: new Date(1995, 5, 5),
              },
              updatedAt: {
                getDate: new Date(2000, 5, 5),
              },
              biography: {
                getBiography: 'A nice person 3.',
              },
              roles: ['Admin', 'Moderator'],
              profilePicture: {
                getUrl: 'https://www.example.com/3.jpg',
              },
              deletedAt: null,
            } as MockedObject<User>,
            [
              validVerificationCodeEntities[0],
              validVerificationCodeEntities[1],
              validVerificationCodeEntities[2],
            ] as MockedObject<VerificationCodeEntity[]>,
            [
              validRefreshTokenEntities[0],
              validRefreshTokenEntities[1],
              validRefreshTokenEntities[2],
            ] as MockedObject<RefreshTokenEntity[]>,
          ],
          [
            {
              id: {
                value: 'id-4',
              },
              email: {
                getEmail: 'email4@email.com',
              },
              username: {
                getUsername: 'John_Doe_4',
              },
              passwordHash: {
                getPasswordHash: 'hash4',
              },
              isVerified: true,
              isBlocked: false,
              firstName: {
                getFirstName: 'FirstName4',
              },
              lastName: {
                getLastName: 'LastName4',
              },
              birthday: {
                getDate: new Date(1990, 5, 5),
              },
              createdAt: {
                getDate: new Date(1995, 5, 5),
              },
              updatedAt: {
                getDate: new Date(2000, 5, 5),
              },
              biography: {
                getBiography: 'A nice person 4.',
              },
              roles: ['Admin', 'Moderator'],
              profilePicture: null,
              deletedAt: {
                getDate: new Date(2001, 5, 5),
              },
            } as MockedObject<User>,
            [
              validVerificationCodeEntities[1],
              validVerificationCodeEntities[3],
            ] as MockedObject<VerificationCodeEntity[]>,
            [
              validRefreshTokenEntities[1],
              validRefreshTokenEntities[3],
            ] as MockedObject<RefreshTokenEntity[]>,
          ],
          [
            {
              id: {
                value: 'id-5',
              },
              email: {
                getEmail: 'email5@email.com',
              },
              username: {
                getUsername: 'John_Doe_5',
              },
              passwordHash: {
                getPasswordHash: 'hash5',
              },
              isVerified: true,
              isBlocked: false,
              firstName: {
                getFirstName: 'FirstName5',
              },
              lastName: {
                getLastName: 'LastName5',
              },
              birthday: {
                getDate: new Date(1990, 5, 5),
              },
              createdAt: {
                getDate: new Date(1995, 5, 5),
              },
              updatedAt: {
                getDate: new Date(2000, 5, 5),
              },
              biography: {
                getBiography: 'A nice person 5.',
              },
              roles: ['Admin', 'Moderator'],
              profilePicture: {
                getUrl: 'https://www.example.com/5.jpg',
              },
              deletedAt: null,
            } as MockedObject<User>,
            [validVerificationCodeEntities[0]] as MockedObject<
              VerificationCodeEntity[]
            >,
            [validRefreshTokenEntities[0]] as MockedObject<
              RefreshTokenEntity[]
            >,
          ],
          [
            {
              id: {
                value: 'id-6',
              },
              email: {
                getEmail: 'email6@email.com',
              },
              username: {
                getUsername: 'John_Doe_6',
              },
              passwordHash: {
                getPasswordHash: 'hash6',
              },
              isVerified: true,
              isBlocked: false,
              firstName: {
                getFirstName: 'FirstName6',
              },
              lastName: {
                getLastName: 'LastName6',
              },
              birthday: {
                getDate: new Date(1990, 5, 5),
              },
              createdAt: {
                getDate: new Date(1995, 5, 5),
              },
              updatedAt: {
                getDate: new Date(2000, 5, 5),
              },
              biography: {
                getBiography: 'A nice person 6.',
              },
              roles: ['Admin', 'Moderator', 'Basic'],
              profilePicture: null,
              deletedAt: null,
            } as MockedObject<User>,
            [validVerificationCodeEntities[3]] as MockedObject<
              VerificationCodeEntity[]
            >,
            [validRefreshTokenEntities[3]] as MockedObject<
              RefreshTokenEntity[]
            >,
          ],
          [
            {
              id: {
                value: 'id-7',
              },
              email: {
                getEmail: 'email7@email.com',
              },
              username: {
                getUsername: 'John_Doe_7',
              },
              passwordHash: {
                getPasswordHash: 'hash7',
              },
              isVerified: true,
              isBlocked: false,
              firstName: {
                getFirstName: 'FirstName7',
              },
              lastName: {
                getLastName: 'LastName7',
              },
              birthday: {
                getDate: new Date(1990, 5, 5),
              },
              createdAt: {
                getDate: new Date(1995, 5, 5),
              },
              updatedAt: {
                getDate: new Date(2000, 5, 5),
              },
              biography: {
                getBiography: 'A nice person 7.',
              },
              roles: [],
              profilePicture: null,
              deletedAt: null,
            } as MockedObject<User>,
            [] as MockedObject<VerificationCodeEntity[]>,
            [] as MockedObject<RefreshTokenEntity[]>,
          ],
        ];

        test.each(validValues)(
          'should map User to UserEntity keeping all the property values',
          (
            user: MockedObject<User>,
            verificationCodeEntities: MockedObject<VerificationCodeEntity[]>,
            refreshTokenEntities: MockedObject<RefreshTokenEntity[]>,
          ) => {
            // Arrange

            // Act
            const userEntity = userToUserEntity(
              user,
              verificationCodeEntities,
              refreshTokenEntities,
            );

            // Assert
            expect(userEntity.id).toBe(user.id.value);
            expect(userEntity.email).toBe(user.email.getEmail);
            expect(userEntity.normalizedEmail).toBe(
              user.email.getNormalizedEmail,
            );
            expect(userEntity.username).toBe(user.username.getUsername);
            expect(userEntity.normalizedUsername).toBe(
              user.username.getNormalizedUsername,
            );
            expect(userEntity.passwordHash).toBe(
              user.passwordHash.getPasswordHash,
            );
            expect(userEntity.isVerified).toBe(user.isVerified);
            expect(userEntity.isBlocked).toBe(user.isBlocked);
            expect(userEntity.firstName).toBe(user.firstName.getFirstName);
            expect(userEntity.lastName).toBe(user.lastName.getLastName);
            expect(userEntity.birthday).toBe(user.birthday.getDate);
            expect(userEntity.createdAt).toBe(user.createdAt.getDate);
            expect(userEntity.updatedAt).toBe(user.updatedAt.getDate);
            expect(userEntity.biography).toBe(user.biography.getBiography);

            if (user.profilePicture)
              expect(userEntity.profilePicture).toBe(
                user.profilePicture.getUrl,
              );
            else expect(userEntity.profilePicture).toBeNull();

            if (user.deletedAt)
              expect(userEntity.deletedAt).toBe(user.deletedAt.getDate);
            else expect(userEntity.deletedAt).toBeNull();

            for (let i = 0; i < user.roles.length; i++) {
              expect(userEntity.roles[i]).toBe(user.roles[i]);
            }

            for (let i = 0; i < verificationCodeEntities.length; i++) {
              expect(userEntity.verificationCodes.getItems()[i].id).toBe(
                verificationCodeEntities[i].id,
              );
            }

            for (let i = 0; i < refreshTokenEntities.length; i++) {
              expect(userEntity.refreshTokens.getItems()[i].id).toBe(
                refreshTokenEntities[i].id,
              );
            }
          },
        );
      });
    });
  });
});
