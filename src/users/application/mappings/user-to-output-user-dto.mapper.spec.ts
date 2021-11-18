import { mocked } from 'ts-jest/utils';
import { userToOutputUserDto } from '.';
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
      userName: {
        getUserName: 'UserName0',
      },
      passwordHash: {
        getPasswordHash: 'hash0',
      },
      isVerified: {
        getStatus: true,
      },
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
        getMilliseconds: 1,
      },
      createdAt: {
        getMilliseconds: 2,
      },
      updatedAt: {
        getMilliseconds: 3,
      },
      biography: {
        getBiography: 'A nice person 0.',
      },
      profilePicture: {
        getUrl: 'https://www.example.com/0.jpg',
      },
      deletedAt: {
        getMilliseconds: 4,
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
      userName: {
        getUserName: 'UserName1',
      },
      passwordHash: {
        getPasswordHash: 'hash1',
      },
      isVerified: {
        getStatus: true,
      },
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
        getMilliseconds: 1,
      },
      createdAt: {
        getMilliseconds: 2,
      },
      updatedAt: {
        getMilliseconds: 3,
      },
      biography: null,
      profilePicture: {
        getUrl: 'https://www.example.com/1.jpg',
      },
      deletedAt: {
        getMilliseconds: 4,
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
      userName: {
        getUserName: 'UserName2',
      },
      passwordHash: {
        getPasswordHash: 'hash2',
      },
      isVerified: {
        getStatus: true,
      },
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
        getMilliseconds: 1,
      },
      createdAt: {
        getMilliseconds: 2,
      },
      updatedAt: {
        getMilliseconds: 3,
      },
      biography: {
        getBiography: 'A nice person 2.',
      },
      profilePicture: null,
      deletedAt: {
        getMilliseconds: 4,
      },
    } as unknown as User),
  ],
  [
    mocked<User>({
      id: {
        getId: 'id-3',
      },
      userName: {
        getEmail: 'email3@email.com',
      },
      email: {
        getUserName: 'UserName3',
      },
      passwordHash: {
        getPasswordHash: 'hash3',
      },
      isVerified: {
        getStatus: true,
      },
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
        getMilliseconds: 1,
      },
      createdAt: {
        getMilliseconds: 2,
      },
      updatedAt: {
        getMilliseconds: 3,
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
      userName: {
        getUserName: 'UserName4',
      },
      passwordHash: {
        getPasswordHash: 'hash4',
      },
      isVerified: {
        getStatus: true,
      },
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
        getMilliseconds: 1,
      },
      createdAt: {
        getMilliseconds: 2,
      },
      updatedAt: {
        getMilliseconds: 3,
      },
      biography: null,
      profilePicture: null,
      deletedAt: {
        getMilliseconds: 4,
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
      userName: {
        getUserName: 'UserName5',
      },
      passwordHash: {
        getPasswordHash: 'hash5',
      },
      isVerified: {
        getStatus: true,
      },
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
        getMilliseconds: 1,
      },
      createdAt: {
        getMilliseconds: 2,
      },
      updatedAt: {
        getMilliseconds: 3,
      },
      biography: null,
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
      userName: {
        getUserName: 'UserName6',
      },
      passwordHash: {
        getPasswordHash: 'hash6',
      },
      isVerified: {
        getStatus: true,
      },
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
        getMilliseconds: 1,
      },
      createdAt: {
        getMilliseconds: 2,
      },
      updatedAt: {
        getMilliseconds: 3,
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
      userName: {
        getUserName: 'UserName7',
      },
      passwordHash: {
        getPasswordHash: 'hash7',
      },
      isVerified: {
        getStatus: true,
      },
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
        getMilliseconds: 1,
      },
      createdAt: {
        getMilliseconds: 2,
      },
      updatedAt: {
        getMilliseconds: 3,
      },
      biography: null,
      profilePicture: null,
      deletedAt: null,
    } as unknown as User),
  ],
];

describe('users', () => {
  describe('application', () => {
    describe('mappings', () => {
      describe('User to OutputUserDto', () => {
        test.each(validValues)(
          'should map User to OutputUserDto keeping all the property values',
          (user: User) => {
            // Arrange

            // Act
            const dto = userToOutputUserDto(user);

            // Assert
            expect(dto.id).toBe(user.id.getId);
            expect(dto.email).toBe(user.email.getEmail);
            expect(dto.userName).toBe(user.userName.getUserName);
            expect(dto.isVerified).toBe(user.isVerified.getStatus);
            expect(dto.isBlocked).toBe(user.isBlocked.getStatus);
            expect(dto.firstName).toBe(user.firstName.getFirstName);
            expect(dto.lastName).toBe(user.lastName.getLastName);
            expect(dto.birthday).toBe(user.birthday.getMilliseconds);
            expect(dto.createdAt).toBe(user.createdAt.getMilliseconds);
            expect(dto.updatedAt).toBe(user.updatedAt.getMilliseconds);
            if (user.biography)
              expect(dto.biography).toBe(user.biography.getBiography);
            else expect(dto.biography).toBeUndefined();
            if (user.profilePicture)
              expect(dto.profilePicture).toBe(user.profilePicture.getUrl);
            else expect(dto.profilePicture).toBeUndefined();
            if (user.deletedAt)
              expect(dto.deletedAt).toBe(user.deletedAt.getMilliseconds);
            else expect(dto.deletedAt).toBeUndefined();
          },
        );
      });
    });
  });
});
