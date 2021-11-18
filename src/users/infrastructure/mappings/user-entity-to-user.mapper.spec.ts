import { userEntityToUser } from '.';
import { UserEntity } from '../persistence/entities';

describe('users', () => {
  describe('infrastructure', () => {
    describe('mappings', () => {
      describe('UserEntity to User', () => {
        const id = 'id';
        const email = 'john@DOE.com';
        const username = 'John_Doe';
        const hash = 'password hash';
        const verificationStatus = true;
        const blockedStatus = true;
        const firstNameText = 'John';
        const lastNameText = 'Doe';
        const birthDate = new Date('2000-05-05');
        const birthDateMilliseconds = birthDate.getTime();
        const creationDate = new Date();
        const creationDateMilliseconds = creationDate.getTime();
        const bio = 'A nice person.';

        it('should map UserEntity to User keeping all the property values', () => {
          // Arrange
          const userEntity = new UserEntity();
          userEntity.id = id;
          userEntity.email = email;
          userEntity.userName = username;
          userEntity.passwordHash = hash;
          userEntity.isVerified = verificationStatus;
          userEntity.isBlocked = blockedStatus;
          userEntity.firstName = firstNameText;
          userEntity.lastName = lastNameText;
          userEntity.birthday = birthDate;
          userEntity.createdAt = creationDate;
          userEntity.updatedAt = creationDate;
          userEntity.biography = bio;
          userEntity.profilePicture = null;
          userEntity.deletedAt = null;

          // Act
          const user = userEntityToUser(userEntity);

          // Assert
          expect(user.id.getId).toBe(id);
          expect(user.email.getEmail).toBe(email);
          expect(user.userName.getUserName).toBe(username);
          expect(user.passwordHash.getPasswordHash).toBe(hash);
          expect(user.isVerified.getStatus).toBe(verificationStatus);
          expect(user.isBlocked.getStatus).toBe(blockedStatus);
          expect(user.firstName.getFirstName).toBe(firstNameText);
          expect(user.lastName.getLastName).toBe(lastNameText);
          expect(user.birthday.getMilliseconds).toBe(birthDateMilliseconds);
          expect(user.createdAt.getMilliseconds).toBe(creationDateMilliseconds);
          expect(user.updatedAt.getMilliseconds).toBe(creationDateMilliseconds);
          expect(user.biography.getBiography).toBe(bio);
          expect(user.profilePicture).toBeNull();
          expect(user.deletedAt).toBeNull();
        });
      });
    });
  });
});
