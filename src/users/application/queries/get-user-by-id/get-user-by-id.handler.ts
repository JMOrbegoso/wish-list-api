import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByIdQuery } from '..';
import { UnitOfWork } from '../../../../core/domain/repositories';
import { UniqueId } from '../../../../core/domain/value-objects';
import { User } from '../../../../users/domain/entities';
import { OutputUserDto } from '../../dtos';
import { userToOutputUserDto } from '../../mappings';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(private readonly unitOfWork: UnitOfWork) {}

  async execute(query: GetUserByIdQuery): Promise<OutputUserDto> {
    const id = UniqueId.create(query.id);

    const user: User = await this.unitOfWork.userRepository.getOne(id);

    if (!user) throw new NotFoundException();

    return userToOutputUserDto(user);
  }
}
