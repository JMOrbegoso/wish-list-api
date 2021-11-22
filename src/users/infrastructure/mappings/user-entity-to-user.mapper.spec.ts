import { mocked } from 'ts-jest/utils';
import { userEntityToUser } from '.';
import { UserEntity } from '../persistence/entities';

const validValues = [
  [
    mocked<UserEntity>({
      id: 'id-0',
      email: 'email0@email.com',
      normalizedEmail: 'email0@email.com',
      username: 'John_Doe_0',
      normalizedUsername: 'john_doe_0',
      passwordHash: 'password0',
      isVerified: true,
      isBlocked: true,
      firstName: 'FirstName0',
      lastName: 'LastName0',
      birthday: new Date(2001, 5, 5),
      createdAt: new Date(1995, 5, 5),
      updatedAt: new Date(1990, 5, 5),
      biography: 'A nice person 0.',
      profilePicture: 'https://www.example.com/0.jpg',
      deletedAt: new Date(2000, 5, 5),
    } as unknown as UserEntity),
  ],
  [
    mocked<UserEntity>({
      id: 'id-1',
      email: 'email1@email.com',
      normalizedEmail: 'email1@email.com',
      username: 'John_Doe_1',
      normalizedUsername: 'john_doe_1',
      passwordHash: 'hash1',
      isVerified: true,
      isBlocked: false,
      firstName: 'FirstName1',
      lastName: 'LastName1',
      birthday: new Date(2001, 5, 5),
      createdAt: new Date(1995, 5, 5),
      updatedAt: new Date(1990, 5, 5),
      biography: 'A nice person 1.',
      profilePicture: 'https://www.example.com/1.jpg',
      deletedAt: new Date(2000, 5, 5),
    } as unknown as UserEntity),
  ],
  [
    mocked<UserEntity>({
      id: 'id-2',
      email: 'email2@email.com',
      normalizedEmail: 'email2@email.com',
      username: 'John_Doe_2',
      normalizedUsername: 'john_doe_2',
      passwordHash: 'hash2',
      isVerified: false,
      isBlocked: true,
      firstName: 'FirstName2',
      lastName: 'LastName2',
      birthday: new Date(2001, 5, 5),
      createdAt: new Date(1995, 5, 5),
      updatedAt: new Date(1990, 5, 5),
      biography: 'A nice person 2.',
      profilePicture: null,
      deletedAt: new Date(2000, 5, 5),
    } as unknown as UserEntity),
  ],
  [
    mocked<UserEntity>({
      id: 'id-3',
      email: 'email3@email.com',
      normalizedEmail: 'email3@email.com',
      username: 'John_Doe_3',
      normalizedUsername: 'john_doe_3',
      passwordHash: 'hash3',
      isVerified: false,
      isBlocked: false,
      firstName: 'FirstName3',
      lastName: 'LastName3',
      birthday: new Date(2001, 5, 5),
      createdAt: new Date(1995, 5, 5),
      updatedAt: new Date(1990, 5, 5),
      biography: 'A nice person 3.',
      profilePicture: null,
      deletedAt: new Date(2000, 5, 5),
    } as unknown as UserEntity),
  ],
  [
    mocked<UserEntity>({
      id: 'id-4',
      email: 'email4@email.com',
      normalizedEmail: 'email4@email.com',
      username: 'John_Doe_4',
      normalizedUsername: 'john_doe_4',
      passwordHash: 'hash4',
      isVerified: false,
      isBlocked: true,
      firstName: 'FirstName4',
      lastName: 'LastName4',
      birthday: new Date(2001, 5, 5),
      createdAt: new Date(1995, 5, 5),
      updatedAt: new Date(1990, 5, 5),
      biography: 'A nice person 4.',
      profilePicture: null,
      deletedAt: new Date(2000, 5, 5),
    } as unknown as UserEntity),
  ],
  [
    mocked<UserEntity>({
      id: 'id-5',
      email: 'email5@email.com',
      normalizedEmail: 'email5@email.com',
      username: 'John_Doe_5',
      normalizedUsername: 'john_doe_5',
      passwordHash: 'hash5',
      isVerified: true,
      isBlocked: false,
      firstName: 'FirstName5',
      lastName: 'lastname5',
      birthday: new Date(2001, 5, 5),
      createdAt: new Date(1995, 5, 5),
      updatedAt: new Date(1990, 5, 5),
      biography: 'A nice person 5.',
      profilePicture: 'https://www.example.com/5.jpg',
      deletedAt: new Date(2000, 5, 5),
    } as unknown as UserEntity),
  ],
  [
    mocked<UserEntity>({
      id: 'id-6',
      email: 'email6@email.com',
      normalizedEmail: 'email6@email.com',
      username: 'John_Doe_6',
      normalizedUsername: 'john_doe_6',
      passwordHash: 'hash6',
      isVerified: true,
      isBlocked: true,
      firstName: 'FirstName6',
      lastName: 'lastname6',
      birthday: new Date(2001, 5, 5),
      createdAt: new Date(1995, 5, 5),
      updatedAt: new Date(1990, 5, 5),
      biography: 'A nice person 6.',
      profilePicture: null,
      deletedAt: new Date(2000, 5, 5),
    } as unknown as UserEntity),
  ],
  [
    mocked<UserEntity>({
      id: 'id-7',
      email: 'email7@email.com',
      normalizedEmail: 'email7@email.com',
      username: 'John_Doe_7',
      normalizedUsername: 'john_doe_7',
      passwordHash: 'hash7',
      isVerified: false,
      isBlocked: false,
      firstName: 'FirstName7',
      lastName: 'LastName7',
      birthday: new Date(2001, 5, 5),
      createdAt: new Date(1995, 5, 5),
      updatedAt: new Date(1990, 5, 5),
      biography: 'A nice person 7.',
    } as unknown as UserEntity),
  ],
];

describe('users', () => {
  describe('infrastructure', () => {
    describe('mappings', () => {
      describe('UserEntity to User', () => {
        test.each(validValues)(
          'should map User to UserEntity keeping all the property values',
          (userEntity: UserEntity) => {
            // Arrange

            // Act
            const user = userEntityToUser(userEntity);

            // Assert
            expect(user.id.getId).toBe(userEntity.id);
            expect(user.email.getEmail).toBe(userEntity.email);
            expect(user.email.getNormalizedEmail).toBe(
              userEntity.normalizedEmail,
            );
            expect(user.username.getUsername).toBe(userEntity.username);
            expect(user.username.getNormalizedUsername).toBe(
              userEntity.normalizedUsername,
            );
            expect(user.passwordHash.getPasswordHash).toBe(
              userEntity.passwordHash,
            );
            expect(user.isVerified).toBe(userEntity.isVerified);
            expect(user.isBlocked).toBe(userEntity.isBlocked);
            expect(user.firstName.getFirstName).toBe(userEntity.firstName);
            expect(user.lastName.getLastName).toBe(userEntity.lastName);
            expect(user.birthday.getMilliseconds).toBe(
              new Date(userEntity.birthday).getTime(),
            );
            expect(user.createdAt.getMilliseconds).toBe(
              new Date(userEntity.createdAt).getTime(),
            );
            expect(user.updatedAt.getMilliseconds).toBe(
              new Date(userEntity.updatedAt).getTime(),
            );
            expect(user.biography.getBiography).toBe(userEntity.biography);
            if (userEntity.profilePicture)
              expect(user.profilePicture.getUrl).toBe(
                userEntity.profilePicture,
              );
            else expect(user.profilePicture).toBeNull();
            if (userEntity.deletedAt)
              expect(user.deletedAt.getMilliseconds).toBe(
                new Date(userEntity.deletedAt).getTime(),
              );
            else expect(user.deletedAt).toBeNull();
          },
        );
      });
    });
  });
});
