import { Entity } from '../../../../shared/domain/entities';
import {
  MillisecondsDate,
  UniqueId,
  WebUrl,
} from '../../../../shared/domain/value-objects';
import { WishDescription, WishTitle } from '../../value-objects';
import {
  InvalidWishStageCreatedAtError,
  InvalidWishStageDescriptionError,
  InvalidWishStageImageError,
  InvalidWishStageImagesError,
  InvalidWishStageTitleError,
  InvalidWishStageUrlError,
  InvalidWishStageUrlsError,
  TooManyWishStageImagesError,
  TooManyWishStageUrlsError,
} from './exceptions';

export class WishStage extends Entity {
  public static readonly MaxUrls = 5;
  public static readonly MaxImages = 5;

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

    if (!title) throw new InvalidWishStageTitleError();
    if (!description) throw new InvalidWishStageDescriptionError();
    if (!createdAt) throw new InvalidWishStageCreatedAtError();
    if (!urls) throw new InvalidWishStageUrlsError();
    if (urls.length > WishStage.MaxUrls) throw new TooManyWishStageUrlsError();
    urls.forEach((url) => {
      if (!url) throw new InvalidWishStageUrlError();
    });
    if (!imageUrls) throw new InvalidWishStageImagesError();
    if (imageUrls.length > WishStage.MaxImages)
      throw new TooManyWishStageImagesError();
    imageUrls.forEach((imageUrl) => {
      if (!imageUrl) throw new InvalidWishStageImageError();
    });

    this._title = title;
    this._description = description;
    this._createdAt = createdAt;
    this._urls = [...urls];
    this._imageUrls = [...imageUrls];
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
    return [...this._urls];
  }

  public get urlsLength(): number {
    return this._urls.length;
  }

  public get imageUrls(): WebUrl[] {
    return [...this._imageUrls];
  }

  public get imageUrlsLength(): number {
    return this._imageUrls.length;
  }

  public update(
    title: WishTitle,
    description: WishDescription,
    urls: WebUrl[] = [],
    imageUrls: WebUrl[] = [],
  ): void {
    if (!title) throw new InvalidWishStageTitleError();

    if (!description) throw new InvalidWishStageDescriptionError();

    if (!urls) throw new InvalidWishStageUrlsError();

    if (urls.length > WishStage.MaxUrls) throw new TooManyWishStageUrlsError();

    if (!imageUrls) throw new InvalidWishStageImagesError();

    if (imageUrls.length > WishStage.MaxImages)
      throw new TooManyWishStageImagesError();

    this._title = title;
    this._description = description;
    this._urls = urls;
    this._imageUrls = imageUrls;
  }
}
