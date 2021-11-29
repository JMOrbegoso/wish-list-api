import { ObjectId } from '@mikro-orm/mongodb';
import { Injectable } from '@nestjs/common';
import { UniqueId } from '../../../core/domain/value-objects';
import { UniqueIdGeneratorService } from '../../application/services/unique-id-generator.service';

@Injectable()
export class UniqueIdGeneratorServiceMongoDb
  implements UniqueIdGeneratorService
{
  public generateId(): UniqueId {
    const objectId = new ObjectId();
    const id = objectId.toString();
    return UniqueId.create(id);
  }
}
