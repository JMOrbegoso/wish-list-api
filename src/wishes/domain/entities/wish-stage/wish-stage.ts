import { Entity } from '../../../../core/domain/entities';
import {
  UniqueId,
  MillisecondsDate,
  WebUrl,
} from '../../../../core/domain/value-objects';
import { WishTitle, WishDescription } from '../../value-objects';

export class WishStage extends Entity {
  private _title: WishTitle;
  private _description: WishDescription;
  private _createdAt: MillisecondsDate;
  private _urls: WebUrl[];
  private _imageUrls: WebUrl[];

  private constructor(
    id: UniqueId,
    title: WishTitle,
    description: WishDescription,
    createdAt: MillisecondsDate,
    urls: WebUrl[],
    imageUrls: WebUrl[],
  ) {
    super(id);

    this._title = title;
    this._description = description;
    this._createdAt = createdAt;
    this._urls = urls;
    this._imageUrls = imageUrls;
  }

  public static create(
    id: UniqueId,
    title: WishTitle,
    description: WishDescription,
    createdAt: MillisecondsDate,
    urls: WebUrl[] = [],
    imageUrls: WebUrl[] = [],
  ): WishStage {
    return new WishStage(id, title, description, createdAt, urls, imageUrls);
  }

  public get id(): UniqueId {
    return this._id;
  }

  public get title(): WishTitle {
    return this._title;
  }

  public get description(): WishDescription {
    return this._description;
  }

  public get createdAt(): MillisecondsDate {
    return this._createdAt;
  }

  public get urls(): WebUrl[] {
    return this._urls;
  }

  public get imageUrls(): WebUrl[] {
    return this._imageUrls;
  }
}
