import { UniqueIdGeneratorService } from '../../application/services/unique-id-generator.service';
import { ObjectId } from '@mikro-orm/mongodb';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UniqueIdGeneratorServiceMongoDb
  implements UniqueIdGeneratorService
{
  public generateId(): string {
    const objectId = new ObjectId();
    return objectId.toString();
  }
}
