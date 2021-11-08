import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { UnitOfWork } from '../../../../core/domain/repositories';
import { User } from '../../../../users/domain/entities';
import { GetUsersQuery } from '..';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(private readonly unitOfWork: UnitOfWork) {}

  async execute(query: GetUsersQuery): Promise<User[]> {
    const {} = query;

    return await this.unitOfWork.userRepository.getAll();
  }
}
