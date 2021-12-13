import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetWishesByWisherIdQuery } from '..';
import { UniqueId } from '../../../../shared/domain/value-objects';
import { WishRepository } from '../../../domain/repositories';
import { OutputWishDto } from '../../dtos';
import { wishToOutputWishDto } from '../../mappings';

@QueryHandler(GetWishesByWisherIdQuery)
export class GetWishesByWisherIdHandler
  implements IQueryHandler<GetWishesByWisherIdQuery>
{
  constructor(private readonly wishRepository: WishRepository) {}

  async execute(query: GetWishesByWisherIdQuery): Promise<OutputWishDto[]> {
    const id = UniqueId.create(query.id);

    const wishes = await this.wishRepository.getAllWishesByWisher(id);

    return wishes.map((wish) => wishToOutputWishDto(wish));
  }
}
