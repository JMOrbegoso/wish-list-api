import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { UnitOfWork } from '../../../../core/domain/repositories';
import { User } from '../../../../users/domain/entities';
import { GetUserByUserNameQuery } from '..';
import { UserName } from '../../../../users/domain/value-objects';

@QueryHandler(GetUserByUserNameQuery)
export class GetUserByUserNameHandler
  implements IQueryHandler<GetUserByUserNameQuery>
{
  constructor(private readonly unitOfWork: UnitOfWork) {}

  async execute(query: GetUserByUserNameQuery): Promise<User> {
    const userName = UserName.create(query.username);

    return await this.unitOfWork.userRepository.getOneByUserName(userName);
  }
}
