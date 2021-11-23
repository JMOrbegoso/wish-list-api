import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { UnitOfWork } from '../../../../core/domain/repositories';
import { User } from '../../../../users/domain/entities';
import { OutputUserDto } from '../../dtos';
import { Username } from '../../../../users/domain/value-objects';
import { userToOutputUserDto } from '../../mappings';
import { GetUserByUsernameQuery } from '..';

@QueryHandler(GetUserByUsernameQuery)
export class GetUserByUsernameHandler
  implements IQueryHandler<GetUserByUsernameQuery>
{
  constructor(private readonly unitOfWork: UnitOfWork) {}

  async execute(query: GetUserByUsernameQuery): Promise<OutputUserDto> {
    const username = Username.create(query.username);

    const user: User = await this.unitOfWork.userRepository.getOneByUsername(
      username,
    );

    if (!user) throw new NotFoundException();

    return userToOutputUserDto(user);
  }
}
