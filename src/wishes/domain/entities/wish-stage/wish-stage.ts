import { Entity } from '../../../../core/domain/entities';
import {
  UniqueId,
  MillisecondsDate,
  WebUrl,
} from '../../../../core/domain/value-objects';
import { WishTitle, WishDescription } from '../../value-objects';

export class WishStage extends Entity {
  private title: WishTitle;
  private description: WishDescription;
  private createdAt: MillisecondsDate;
  private urls: WebUrl[];
  private imageUrls: WebUrl[];

  private constructor(
    id: UniqueId,
    title: WishTitle,
    description: WishDescription,
    createdAt: MillisecondsDate,
    urls: WebUrl[],
    imageUrls: WebUrl[],
  ) {
    super(id);

    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
    this.urls = urls;
    this.imageUrls = imageUrls;
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

  public get getId(): UniqueId {
    return this.id;
  }

  public get getTitle(): WishTitle {
    return this.title;
  }

  public get getDescription(): WishDescription {
    return this.description;
  }

  public get getCreatedAtDate(): MillisecondsDate {
    return this.createdAt;
  }

  public get getUrls(): WebUrl[] {
    return this.urls;
  }

  public get getImageUrls(): WebUrl[] {
    return this.imageUrls;
  }
}
