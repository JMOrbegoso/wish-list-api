import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { UnitOfWork } from '../../../../core/domain/repositories';
import { User } from '../../../../users/domain/entities';
import { GetUserByEmailQuery } from '..';
import { Email } from '../../../../users/domain/value-objects';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler
  implements IQueryHandler<GetUserByEmailQuery>
{
  constructor(private readonly unitOfWork: UnitOfWork) {}

  async execute(query: GetUserByEmailQuery): Promise<User> {
    const email = Email.create(query.email);

    return await this.unitOfWork.userRepository.getOneByEmail(email);
  }
}
