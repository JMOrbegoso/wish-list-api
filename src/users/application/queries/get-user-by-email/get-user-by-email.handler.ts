import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByEmailQuery } from '..';
import { UnitOfWork } from '../../../../core/domain/repositories';
import { User } from '../../../../users/domain/entities';
import { Email } from '../../../../users/domain/value-objects';
import { OutputUserDto } from '../../dtos';
import { userToOutputUserDto } from '../../mappings';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler
  implements IQueryHandler<GetUserByEmailQuery>
{
  constructor(private readonly unitOfWork: UnitOfWork) {}

  async execute(query: GetUserByEmailQuery): Promise<OutputUserDto> {
    const email = Email.create(query.email);

    const user: User = await this.unitOfWork.userRepository.getOneByEmail(
      email,
    );

    if (!user) throw new NotFoundException();

    return userToOutputUserDto(user);
  }
}
