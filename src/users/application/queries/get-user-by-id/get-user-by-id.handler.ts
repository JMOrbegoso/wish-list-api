import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { UnitOfWork } from '../../../../core/domain/repositories';
import { User } from '../../../../users/domain/entities';
import { GetUserByIdQuery } from '..';
import { UniqueId } from '../../../../core/domain/value-objects';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(private readonly unitOfWork: UnitOfWork) {}

  async execute(query: GetUserByIdQuery): Promise<User> {
    const id = UniqueId.create(query.id);

    return await this.unitOfWork.userRepository.getOne(id);
  }
}
