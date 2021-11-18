import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { UnitOfWork } from '../../../../core/domain/repositories';
import { User } from '../../../../users/domain/entities';
import { OutputUserDto } from '../../dtos';
import { Mapper } from '../../mappings';
import { GetUsersQuery } from '..';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(private readonly unitOfWork: UnitOfWork) {}

  async execute(query: GetUsersQuery): Promise<OutputUserDto[]> {
    const {} = query;

    const users: User[] = await this.unitOfWork.userRepository.getAll();

    return users.map((user) => Mapper.toOutputUserDto(user));
  }
}
