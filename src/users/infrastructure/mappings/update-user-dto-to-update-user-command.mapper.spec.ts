import { updateUserDtoToUpdateUserCommand } from '.';
import { UpdateUserDto } from '../dtos';

describe('users', () => {
  describe('infrastructure', () => {
    describe('mappings', () => {
      describe('UpdateUserDto to UpdateUserCommand', () => {
        const id = 'id';
        const firstNameText = 'John';
        const lastNameText = 'Doe';
        const birthDate = new Date('2000-05-05');
        const birthDateMilliseconds = birthDate.getTime();
        const bio = 'A nice person.';

        it('should map UpdateUserDto to an UpdateUserCommand keeping all the property values', () => {
          // Arrange
          const dto = new UpdateUserDto();
          dto.id = id;
          dto.firstName = firstNameText;
          dto.lastName = lastNameText;
          dto.birthday = birthDateMilliseconds;
          dto.biography = bio;
          dto.profilePicture = null;

          // Act
          const command = updateUserDtoToUpdateUserCommand(dto);

          // Assert
          expect(command.id).toBe(id);
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
