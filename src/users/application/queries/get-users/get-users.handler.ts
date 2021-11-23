import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from '..';
import { UnitOfWork } from '../../../../core/domain/repositories';
import { User } from '../../../../users/domain/entities';
import { OutputUserDto } from '../../dtos';
import { userToOutputUserDto } from '../../mappings';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(private readonly unitOfWork: UnitOfWork) {}

  async execute(query: GetUsersQuery): Promise<OutputUserDto[]> {
    const {} = query;

    const users: User[] = await this.unitOfWork.userRepository.getAll();

    return users.map((user) => userToOutputUserDto(user));
  }
}
