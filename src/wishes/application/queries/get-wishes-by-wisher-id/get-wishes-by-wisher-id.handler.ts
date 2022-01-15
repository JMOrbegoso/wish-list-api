import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetWishesByWisherIdQuery } from '..';
import { WisherId } from '../../../domain/entities';
import { WishRepository } from '../../../domain/repositories';
import { OutputWishDto } from '../../dtos';
import { wishToOutputWishDto } from '../../mappings';

@QueryHandler(GetWishesByWisherIdQuery)
export class GetWishesByWisherIdHandler
  implements IQueryHandler<GetWishesByWisherIdQuery>
{
  constructor(private readonly wishRepository: WishRepository) {}

  async execute(query: GetWishesByWisherIdQuery): Promise<OutputWishDto[]> {
    const wisherId = WisherId.create(query.id);

    const wishes = await this.wishRepository.getAllWishesByWisher(wisherId);

    return wishes.map((wish) => wishToOutputWishDto(wish));
  }
}
