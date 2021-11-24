import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from '..';
import { User } from '../../../../users/domain/entities';
import { UserRepository } from '../../../../users/domain/repositories';
import { OutputUserDto } from '../../dtos';
import { userToOutputUserDto } from '../../mappings';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetUsersQuery): Promise<OutputUserDto[]> {
    const {} = query;

    const users: User[] = await this.userRepository.getAll();

    return users.map((user) => userToOutputUserDto(user));
  }
}
