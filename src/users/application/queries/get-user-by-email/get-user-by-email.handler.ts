import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { UnitOfWork } from '../../../../core/domain/repositories';
import { User } from '../../../../users/domain/entities';
import { OutputUserDto } from '../../dtos';
import { Email } from '../../../../users/domain/value-objects';
import { Mapper } from '../../mappings';
import { GetUserByEmailQuery } from '..';

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

    return Mapper.toOutputUserDto(user);
  }
}
