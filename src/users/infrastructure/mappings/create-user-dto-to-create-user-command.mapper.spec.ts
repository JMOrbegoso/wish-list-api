import { createUserDtoToCreateUserCommand } from '.';
import { CreateUserDto } from '../dtos';

describe('users', () => {
  describe('infrastructure', () => {
    describe('mappings', () => {
      describe('CreateUserDto to CreateUserCommand', () => {
        const id = 'id';
        const email = 'john@DOE.com';
        const username = 'John_Doe';
        const password = 'password';
        const firstNameText = 'John';
        const lastNameText = 'Doe';
        const birthDate = new Date('2000-05-05');
        const birthDateMilliseconds = birthDate.getTime();
        const bio = 'A nice person.';

        it('should map CreateUserDto to a CreateUserCommand keeping all the property values', () => {
          // Arrange
          const dto = new CreateUserDto();
          dto.id = id;
          dto.email = email;
          dto.userName = username;
          dto.password = password;
          dto.firstName = firstNameText;
          dto.lastName = lastNameText;
          dto.birthday = birthDateMilliseconds;
          dto.biography = bio;
          dto.profilePicture = null;

          // Act
          const command = createUserDtoToCreateUserCommand(dto);

          // Assert
          expect(command.id).toBe(id);
          expect(command.email).toBe(email);
          expect(command.userName).toBe(username);
          expect(command.password).toBe(password);
          expect(command.firstName).toBe(firstNameText);
          expect(command.lastName).toBe(lastNameText);
          expect(command.birthday).toBe(birthDateMilliseconds);
          expect(command.biography).toBe(bio);
          expect(command.profilePicture).toBeNull();
        });
      });
    });
  });
});
