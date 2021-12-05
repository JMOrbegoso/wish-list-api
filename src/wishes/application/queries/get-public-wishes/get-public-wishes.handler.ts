import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPublicWishesQuery } from '..';
import { WishRepository } from '../../../domain/repositories';
import { OutputWishDto } from '../../dtos';
import { wishToOutputWishDto } from '../../mappings';

@QueryHandler(GetPublicWishesQuery)
export class GetPublicWishesHandler
  implements IQueryHandler<GetPublicWishesQuery>
{
  constructor(private readonly wishRepository: WishRepository) {}

  async execute(query: GetPublicWishesQuery): Promise<OutputWishDto[]> {
    const {} = query;

    const wishes = await this.wishRepository.getAllPublicWishes();

    return wishes.map((wish) => wishToOutputWishDto(wish));
  }
}
