import { mocked } from 'ts-jest/utils';
import { userToUserEntity } from '.';
import { User } from '../../domain/entities';

const validValues = [
  [
    mocked<User>({
      id: {
        getId: 'id-0',
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
      isBlocked: {
        getStatus: false,
      },
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
      profilePicture: {
        getUrl: 'https://www.example.com/0.jpg',
      },
      deletedAt: {
        getDate: new Date(2001, 5, 5),
      },
    } as unknown as User),
  ],
  [
    mocked<User>({
      id: {
        getId: 'id-1',
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
      isBlocked: {
        getStatus: false,
      },
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
      profilePicture: {
        getUrl: 'https://www.example.com/1.jpg',
      },
      deletedAt: {
        getDate: new Date(2001, 5, 5),
      },
    } as unknown as User),
  ],
  [
    mocked<User>({
      id: {
        getId: 'id-2',
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
      isBlocked: {
        getStatus: false,
      },
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
      profilePicture: null,
      deletedAt: {
        getDate: new Date(2001, 5, 5),
      },
    } as unknown as User),
  ],
  [
    mocked<User>({
      id: {
        getId: 'id-3',
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
      isBlocked: {
        getStatus: false,
      },
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
      profilePicture: {
        getUrl: 'https://www.example.com/3.jpg',
      },
      deletedAt: null,
    } as unknown as User),
  ],
  [
    mocked<User>({
      id: {
        getId: 'id-4',
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
      isBlocked: {
        getStatus: false,
      },
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
      profilePicture: null,
      deletedAt: {
        getDate: new Date(2001, 5, 5),
      },
    } as unknown as User),
  ],
  [
    mocked<User>({
      id: {
        getId: 'id-5',
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
      isBlocked: {
        getStatus: false,
      },
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
      profilePicture: {
        getUrl: 'https://www.example.com/5.jpg',
      },
      deletedAt: null,
    } as unknown as User),
  ],
  [
    mocked<User>({
      id: {
        getId: 'id-6',
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
      isBlocked: {
        getStatus: false,
      },
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
      profilePicture: null,
      deletedAt: null,
    } as unknown as User),
  ],
  [
    mocked<User>({
      id: {
        getId: 'id-7',
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
      isBlocked: {
        getStatus: false,
      },
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
      profilePicture: null,
      deletedAt: null,
    } as unknown as User),
  ],
];

describe('users', () => {
  describe('infrastructure', () => {
    describe('mappings', () => {
      describe('User to UserEntity', () => {
        test.each(validValues)(
          'should map User to UserEntity keeping all the property values',
          (user: User) => {
            // Arrange

            // Act
            const userEntity = userToUserEntity(user);

            // Assert
            expect(userEntity.id).toBe(user.id.getId);
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
            expect(userEntity.isBlocked).toBe(user.isBlocked.getStatus);
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
          },
        );
      });
    });
  });
});
