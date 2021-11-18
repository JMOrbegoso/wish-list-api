import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { UnitOfWork } from '../../../../core/domain/repositories';
import { User } from '../../../../users/domain/entities';
import { OutputUserDto } from '../../dtos';
import { UserName } from '../../../../users/domain/value-objects';
import { Mapper } from '../../mappings';
import { GetUserByUserNameQuery } from '..';

@QueryHandler(GetUserByUserNameQuery)
export class GetUserByUserNameHandler
  implements IQueryHandler<GetUserByUserNameQuery>
{
  constructor(private readonly unitOfWork: UnitOfWork) {}

  async execute(query: GetUserByUserNameQuery): Promise<OutputUserDto> {
    const userName = UserName.create(query.username);

    const user: User = await this.unitOfWork.userRepository.getOneByUserName(
      userName,
    );

    return Mapper.toOutputUserDto(user);
  }
}
