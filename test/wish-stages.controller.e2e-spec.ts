import { ObjectId } from '@mikro-orm/mongodb';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoClient, Db as MongoDatabase } from 'mongodb';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import mikroOrmConfig from '../src/mikro-orm.config';
import { Wish } from '../src/wishes/domain/entities';
import { WishDescription, WishTitle } from '../src/wishes/domain/value-objects';
import {
  CreateWishStageDto,
  UpdateWishStageDto,
} from '../src/wishes/infrastructure/dto';
import {
  WishEntity,
  WishStageEntity,
} from '../src/wishes/infrastructure/persistence/entities';
import {
  Seed,
  assertWish,
  assertWishStage,
  dropDatabase,
  getAccessToken,
  seedDatabaseItems,
} from './helpers';

describe('WishStagesController (e2e)', () => {
  let app: INestApplication;
  let mongoClient: MongoClient;
  let database: MongoDatabase;
  // Access tokens
  let accessTokenBasicUser: string;
  let accessTokenModeratorUser: string;
  let accessTokenAdminUser: string;
  // Seed
  let seed: Seed;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    mongoClient = await MongoClient.connect(mikroOrmConfig.clientUrl, {
      useUnifiedTopology: true,
    });
    database = mongoClient.db(mikroOrmConfig.dbName);

    await dropDatabase(database);
  });

  beforeEach(async () => {
    seed = await seedDatabaseItems(database);

    accessTokenBasicUser = await getAccessToken(app, seed.basicUser);
    accessTokenModeratorUser = await getAccessToken(app, seed.moderatorUser);
    accessTokenAdminUser = await getAccessToken(app, seed.adminUser);
  });

  afterEach(async () => {
    await dropDatabase(database);
  });

  afterAll(async () => {
    await app.close();
    await mongoClient.close();
  });

  describe('/wish-stages', () => {
    describe('POST', () => {
      const id = new ObjectId().toString();
      const title = 'Brand new wish stage';
      const description = 'Nice wish stage.';
      const urls = [
        'https://www.example.com/new-stage/',
        'https://www.example.com/new-wish-stage/',
        'https://www.example.com/new-wish-stage-1/',
      ];
      const imageUrls = [
        'https://www.example.com/new-stage/1.jpg',
        'https://www.example.com/new-stage/2.jpg',
      ];

      describe(`should return 400`, () => {
        it(`id should not be empty`, () => {
          return request(app.getHttpServer())
            .post('/wish-stages')
            .send({
              wishId: seed.publicWish_1._id.toString(),
              title,
              description,
              urls,
              imageUrls,
            } as CreateWishStageDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/id should not be empty/i),
                ),
              ).toBeTruthy(),
            );
        });

        it(`id must be a mongodb id`, () => {
          return request(app.getHttpServer())
            .post('/wish-stages')
            .send({
              id: 'wish-stage-id',
              wishId: seed.publicWish_1._id.toString(),
              title,
              description,
              urls,
              imageUrls,
            } as CreateWishStageDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/id must be a mongodb id/i),
                ),
              ).toBeTruthy(),
            );
        });

        it(`title should not be empty`, () => {
          return request(app.getHttpServer())
            .post('/wish-stages')
            .send({
              id,
              wishId: seed.publicWish_1._id.toString(),
              description,
              urls,
              imageUrls,
            } as CreateWishStageDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/title should not be empty/i),
                ),
              ).toBeTruthy(),
            );
        });

        it(`title must be a string`, () => {
          return request(app.getHttpServer())
            .post('/wish-stages')
            .send({
              id,
              wishId: seed.publicWish_1._id.toString(),
              title: 1000,
              description,
              urls,
              imageUrls,
            } as unknown as CreateWishStageDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/title must be a string/i),
                ),
              ).toBeTruthy(),
            );
        });

        it(`title is too long`, () => {
          return request(app.getHttpServer())
            .post('/wish-stages')
            .send({
              id,
              wishId: seed.publicWish_1._id.toString(),
              title: 'a'.repeat(WishTitle.MaxLength + 1),
              description,
              urls,
              imageUrls,
            } as CreateWishStageDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/title must be shorter than or equal to /i),
                ),
              ).toBeTruthy(),
            );
        });

        it(`description should not be empty`, () => {
          return request(app.getHttpServer())
            .post('/wish-stages')
            .send({
              id,
              wishId: seed.publicWish_1._id.toString(),
              title,
              urls,
              imageUrls,
            } as CreateWishStageDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/description should not be empty/i),
                ),
              ).toBeTruthy(),
            );
        });

        it(`description must be a string`, () => {
          return request(app.getHttpServer())
            .post('/wish-stages')
            .send({
              id,
              wishId: seed.publicWish_1._id.toString(),
              title,
              description: 1000,
              urls,
              imageUrls,
            } as unknown as CreateWishStageDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/description must be a string/i),
                ),
              ).toBeTruthy(),
            );
        });

        it(`description is too long`, () => {
          return request(app.getHttpServer())
            .post('/wish-stages')
            .send({
              id,
              wishId: seed.publicWish_1._id.toString(),
              title,
              description: 'a'.repeat(WishDescription.MaxLength + 1),
              urls,
              imageUrls,
            } as CreateWishStageDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/description must be shorter than or equal to /i),
                ),
              ).toBeTruthy(),
            );
        });

        it(`urls must be an array`, () => {
          return request(app.getHttpServer())
            .post('/wish-stages')
            .send({
              id,
              wishId: seed.publicWish_1._id.toString(),
              title,
              description,
              urls: 'https://www.example.com',
              imageUrls,
            } as unknown as CreateWishStageDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/urls must be an array/i),
                ),
              ).toBeTruthy(),
            );
        });

        it(`urls have so many elements`, () => {
          return request(app.getHttpServer())
            .post('/wish-stages')
            .send({
              id,
              wishId: seed.publicWish_1._id.toString(),
              title,
              description,
              urls: Array(Wish.MaxUrls + 1).fill('https://www.example.com'),
              imageUrls,
            } as CreateWishStageDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/urls must contain not more than /i),
                ),
              ).toBeTruthy(),
            );
        });

        it(`each value in urls must be a string`, () => {
          return request(app.getHttpServer())
            .post('/wish-stages')
            .send({
              id,
              wishId: seed.publicWish_1._id.toString(),
              title,
              description,
              urls: [
                'https://www.example.com',
                1000,
                'https://www.example.com',
              ],
              imageUrls,
            } as CreateWishStageDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/each value in urls must be a string/i),
                ),
              ).toBeTruthy(),
            );
        });

        it(`imageUrls must be an array`, () => {
          return request(app.getHttpServer())
            .post('/wish-stages')
            .send({
              id,
              wishId: seed.publicWish_1._id.toString(),
              title,
              description,
              urls,
              imageUrls: 'https://www.example.com/1.jpg',
            } as unknown as CreateWishStageDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/imageUrls must be an array/i),
                ),
              ).toBeTruthy(),
            );
        });

        it(`imageUrls have so many elements`, () => {
          return request(app.getHttpServer())
            .post('/wish-stages')
            .send({
              id,
              wishId: seed.publicWish_1._id.toString(),
              title,
              description,
              urls,
              imageUrls: Array(Wish.MaxUrls + 1).fill(
                'https://www.example.com',
              ),
            } as CreateWishStageDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/imageUrls must contain not more than /i),
                ),
              ).toBeTruthy(),
            );
        });

        it(`each value in imageUrls must be a string`, () => {
          return request(app.getHttpServer())
            .post('/wish-stages')
            .send({
              id,
              wishId: seed.publicWish_1._id.toString(),
              title,
              description,
              urls,
              imageUrls: [
                'https://www.example.com/1.jpg',
                1000,
                'https://www.example.com/1.jpg',
              ],
            } as CreateWishStageDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/each value in imageUrls must be a string/i),
                ),
              ).toBeTruthy(),
            );
        });

        it(`id already in use`, () => {
          return request(app.getHttpServer())
            .post('/wish-stages')
            .send({
              id: seed.wishStage_1_of_PublicWish_1._id.toString(),
              wishId: seed.publicWish_1._id.toString(),
              title,
              description,
              urls,
              imageUrls,
            } as CreateWishStageDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) => expect(body.message).toMatch(/in use/i));
        });
      });

      describe(`should return 401`, () => {
        it(`unauthenticated request`, () => {
          return request(app.getHttpServer())
            .post('/wish-stages')
            .send({
              id,
              wishId: 'wish-id',
              title,
              description,
              urls,
              imageUrls,
            } as CreateWishStageDto)
            .expect(401);
        });
      });

      describe(`should return 403`, () => {
        it(`publicWish_1 does not belong to the adminUser`, () => {
          return request(app.getHttpServer())
            .post('/wish-stages')
            .send({
              id,
              wishId: seed.publicWish_1._id.toString(),
              title,
              description,
              urls,
              imageUrls,
            } as CreateWishStageDto)
            .auth(accessTokenAdminUser, { type: 'bearer' })
            .expect(403);
        });

        it(`publicWish_1 does not belong to the moderatorUser`, () => {
          return request(app.getHttpServer())
            .post('/wish-stages')
            .send({
              id,
              wishId: seed.publicWish_1._id.toString(),
              title,
              description,
              urls,
              imageUrls,
            } as CreateWishStageDto)
            .auth(accessTokenModeratorUser, { type: 'bearer' })
            .expect(403);
        });

        it(`publicWish_2 does not belong to the basicUser`, () => {
          return request(app.getHttpServer())
            .post('/wish-stages')
            .send({
              id,
              wishId: seed.publicWish_2._id.toString(),
              title,
              description,
              urls,
              imageUrls,
            } as CreateWishStageDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(403);
        });
      });

      describe(`should return 201`, () => {
        it(`wish stages created successfully`, () => {
          const wishId = seed.publicWish_1._id.toString();
          return request(app.getHttpServer())
            .post('/wish-stages')
            .send({
              id,
              wishId,
              title,
              description,
              urls,
              imageUrls,
            } as CreateWishStageDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(201)
            .expect(async () => {
              const wishStagesDb: WishStageEntity[] = await database
                .collection('wish-stages')
                .find()
                .toArray();

              expect(wishStagesDb).toHaveLength(6);

              const wishStageCreated = wishStagesDb.find(
                (u) => u._id.toString() === id,
              );

              expect(wishStageCreated).toBeTruthy();

              expect(wishStageCreated._id.toString()).toBe(id);
              expect(wishStageCreated.wish.toString()).toBe(wishId);
              expect(wishStageCreated.title).toBe(title);
              expect(wishStageCreated.description).toBe(description);
              expect(wishStageCreated.createdAt).toBeTruthy();
              expect(wishStageCreated.urls).toHaveLength(urls.length);
              expect(wishStageCreated.imageUrls).toHaveLength(imageUrls.length);

              for (let i = 0; i < urls.length; i++)
                expect(wishStageCreated.urls[i]).toBe(urls[i]);

              for (let i = 0; i < imageUrls.length; i++)
                expect(wishStageCreated.imageUrls[i]).toBe(imageUrls[i]);
            });
        });
      });
    });
  });

  describe('/wish-stages/{id}', () => {
    describe('PATCH', () => {
      const title = 'New name';
      const description = 'New description.';
      const urls = [
        'https://www.example.com/new-url/1',
        'https://www.example.com/new-url/2',
        'https://www.example.com/new-url/3',
      ];
      const imageUrls = [
        'https://www.example.com/new-url/1.jpg',
        'https://www.example.com/new-url/2.jpg',
      ];

      describe(`should return 401`, () => {
        it(`unauthenticated request`, () => {
          const id = 'wish-stage-id';
          return request(app.getHttpServer())
            .patch(`/wish-stages/${id}`)
            .send({
              id,
              title,
              description,
              urls,
              imageUrls,
            } as UpdateWishStageDto)
            .expect(401);
        });
      });

      describe(`should return 400`, () => {
        it(`title should not be empty`, () => {
          const id = seed.wishStage_1_of_PublicWish_1._id.toString();
          return request(app.getHttpServer())
            .patch(`/wish-stages/${id}`)
            .send({
              id,
              description,
              urls,
              imageUrls,
            } as UpdateWishStageDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/title should not be empty/i),
                ),
              ).toBeTruthy(),
            );
        });

        it(`title must be a string`, () => {
          const id = seed.wishStage_1_of_PublicWish_1._id.toString();
          return request(app.getHttpServer())
            .patch(`/wish-stages/${id}`)
            .send({
              id,
              title: 1000,
              description,
              urls,
              imageUrls,
            } as unknown as UpdateWishStageDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/title must be a string/i),
                ),
              ).toBeTruthy(),
            );
        });

        it(`title is too long`, () => {
          const id = seed.wishStage_1_of_PublicWish_1._id.toString();
          return request(app.getHttpServer())
            .patch(`/wish-stages/${id}`)
            .send({
              id,
              title: 'a'.repeat(WishTitle.MaxLength + 1),
              description,
              urls,
              imageUrls,
            } as UpdateWishStageDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/title must be shorter than or equal to /i),
                ),
              ).toBeTruthy(),
            );
        });

        it(`description should not be empty`, () => {
          const id = seed.wishStage_1_of_PublicWish_1._id.toString();
          return request(app.getHttpServer())
            .patch(`/wish-stages/${id}`)
            .send({
              id,
              title,
              urls,
              imageUrls,
            } as UpdateWishStageDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/description should not be empty/i),
                ),
              ).toBeTruthy(),
            );
        });

        it(`description must be a string`, () => {
          const id = seed.wishStage_1_of_PublicWish_1._id.toString();
          return request(app.getHttpServer())
            .patch(`/wish-stages/${id}`)
            .send({
              id,
              title,
              description: 1000,
              urls,
              imageUrls,
            } as unknown as UpdateWishStageDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/description must be a string/i),
                ),
              ).toBeTruthy(),
            );
        });

        it(`description is too long`, () => {
          const id = seed.wishStage_1_of_PublicWish_1._id.toString();
          return request(app.getHttpServer())
            .patch(`/wish-stages/${id}`)
            .send({
              id,
              title,
              description: 'a'.repeat(WishDescription.MaxLength + 1),
              urls,
              imageUrls,
            } as UpdateWishStageDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/description must be shorter than or equal to /i),
                ),
              ).toBeTruthy(),
            );
        });

        it(`urls must be an array`, () => {
          const id = seed.wishStage_1_of_PublicWish_1._id.toString();
          return request(app.getHttpServer())
            .patch(`/wish-stages/${id}`)
            .send({
              id,
              title,
              description,
              urls: 'https://www.example.com',
              imageUrls,
            } as unknown as UpdateWishStageDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/urls must be an array/i),
                ),
              ).toBeTruthy(),
            );
        });

        it(`urls have so many elements`, () => {
          const id = seed.wishStage_1_of_PublicWish_1._id.toString();
          return request(app.getHttpServer())
            .patch(`/wish-stages/${id}`)
            .send({
              id,
              title,
              description,
              urls: Array(Wish.MaxUrls + 1).fill('https://www.example.com'),
              imageUrls,
            } as UpdateWishStageDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/urls must contain not more than /i),
                ),
              ).toBeTruthy(),
            );
        });

        it(`each value in urls must be a string`, () => {
          const id = seed.wishStage_1_of_PublicWish_1._id.toString();
          return request(app.getHttpServer())
            .patch(`/wish-stages/${id}`)
            .send({
              id,
              title,
              description,
              urls: [
                'https://www.example.com',
                1000,
                'https://www.example.com',
              ],
              imageUrls,
            } as UpdateWishStageDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/each value in urls must be a string/i),
                ),
              ).toBeTruthy(),
            );
        });

        it(`imageUrls must be an array`, () => {
          const id = seed.wishStage_1_of_PublicWish_1._id.toString();
          return request(app.getHttpServer())
            .patch(`/wish-stages/${id}`)
            .send({
              id,
              title,
              description,
              urls,
              imageUrls: 'https://www.example.com/1.jpg',
            } as unknown as UpdateWishStageDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/imageUrls must be an array/i),
                ),
              ).toBeTruthy(),
            );
        });

        it(`imageUrls have so many elements`, () => {
          const id = seed.wishStage_1_of_PublicWish_1._id.toString();
          return request(app.getHttpServer())
            .patch(`/wish-stages/${id}`)
            .send({
              id,
              title,
              description,
              urls,
              imageUrls: Array(Wish.MaxUrls + 1).fill(
                'https://www.example.com',
              ),
            } as UpdateWishStageDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/imageUrls must contain not more than /i),
                ),
              ).toBeTruthy(),
            );
        });

        it(`each value in imageUrls must be a string`, () => {
          const id = seed.wishStage_1_of_PublicWish_1._id.toString();
          return request(app.getHttpServer())
            .patch(`/wish-stages/${id}`)
            .send({
              id,
              title,
              description,
              urls,
              imageUrls: [
                'https://www.example.com/1.jpg',
                1000,
                'https://www.example.com/1.jpg',
              ],
            } as UpdateWishStageDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/each value in imageUrls must be a string/i),
                ),
              ).toBeTruthy(),
            );
        });

        it(`ids are different`, () => {
          const id = 'wish-stage-id-1';
          return request(app.getHttpServer())
            .patch(`/wish-stages/${id}`)
            .send({
              id: 'wish-stage-id-2',
              title,
              description,
              urls,
              imageUrls,
            } as UpdateWishStageDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(body.message).toMatch(/Id are different/i),
            );
        });
      });

      describe(`should return 403`, () => {
        it(`publicWish_2 does not belong to the basicUser`, () => {
          const id = seed.wishStage_of_PublicWish_2._id.toString();
          return request(app.getHttpServer())
            .patch(`/wish-stages/${id}`)
            .send({
              id,
              title,
              description,
              urls,
              imageUrls,
            } as UpdateWishStageDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(403);
        });
      });

      describe(`should return 404`, () => {
        it(`wish stage not found`, () => {
          const id = new ObjectId().toString();
          return request(app.getHttpServer())
            .patch(`/wish-stages/${id}`)
            .send({
              id,
              title,
              description,
              urls,
              imageUrls,
            } as UpdateWishStageDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(404);
        });
      });

      describe(`should return 200`, () => {
        it(`wish stage updated successfully`, () => {
          const id = seed.wishStage_1_of_PublicWish_1._id.toString();
          return request(app.getHttpServer())
            .patch(`/wish-stages/${id}`)
            .send({
              id,
              title,
              description,
              urls,
              imageUrls,
            } as UpdateWishStageDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(200)
            .expect(async () => {
              const wishStagesDb: WishStageEntity[] = await database
                .collection('wish-stages')
                .find()
                .toArray();

              expect(wishStagesDb).toHaveLength(5);

              const wishStageUpdated = wishStagesDb.find(
                (u) => u._id.toString() === id,
              );

              expect(wishStageUpdated).toBeTruthy();

              expect(wishStageUpdated._id.toString()).toBe(id);
              expect(wishStageUpdated.wish.toString()).toBe(
                seed.publicWish_1._id.toString(),
              );
              expect(wishStageUpdated.title).toBe(title);
              expect(wishStageUpdated.description).toBe(description);
              expect(wishStageUpdated.createdAt).toBeTruthy();
              expect(wishStageUpdated.urls).toHaveLength(urls.length);
              expect(wishStageUpdated.imageUrls).toHaveLength(imageUrls.length);

              for (let i = 0; i < urls.length; i++)
                expect(wishStageUpdated.urls[i]).toBe(urls[i]);

              for (let i = 0; i < imageUrls.length; i++)
                expect(wishStageUpdated.imageUrls[i]).toBe(imageUrls[i]);
            })
            .expect(async () => {
              // Check if the wish has not changed

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              const wishDb = wishesDb.find(
                (u) => u._id.toString() === seed.publicWish_1._id.toString(),
              );

              assertWish(wishDb, seed.publicWish_1);
            })
            .expect(async () => {
              // Check if the other wish stage has not changed

              const wishStagesDb: WishStageEntity[] = await database
                .collection('wish-stages')
                .find()
                .toArray();

              const wishStageDb = wishStagesDb.find(
                (u) =>
                  u._id.toString() ===
                  seed.wishStage_2_of_PublicWish_1._id.toString(),
              );

              assertWishStage(wishStageDb, seed.wishStage_2_of_PublicWish_1);
            });
        });

        it(`wish stage updated successfully by moderator`, () => {
          const id = seed.wishStage_1_of_PublicWish_1._id.toString();
          return request(app.getHttpServer())
            .patch(`/wish-stages/${id}`)
            .send({
              id,
              title,
              description,
              urls,
              imageUrls,
            } as UpdateWishStageDto)
            .auth(accessTokenModeratorUser, { type: 'bearer' })
            .expect(200)
            .expect(async () => {
              const wishStagesDb: WishStageEntity[] = await database
                .collection('wish-stages')
                .find()
                .toArray();

              expect(wishStagesDb).toHaveLength(5);

              const wishStageUpdated = wishStagesDb.find(
                (u) => u._id.toString() === id,
              );

              expect(wishStageUpdated).toBeTruthy();

              expect(wishStageUpdated._id.toString()).toBe(id);
              expect(wishStageUpdated.wish.toString()).toBe(
                seed.publicWish_1._id.toString(),
              );
              expect(wishStageUpdated.title).toBe(title);
              expect(wishStageUpdated.description).toBe(description);
              expect(wishStageUpdated.createdAt).toBeTruthy();
              expect(wishStageUpdated.urls).toHaveLength(urls.length);
              expect(wishStageUpdated.imageUrls).toHaveLength(imageUrls.length);

              for (let i = 0; i < urls.length; i++)
                expect(wishStageUpdated.urls[i]).toBe(urls[i]);

              for (let i = 0; i < imageUrls.length; i++)
                expect(wishStageUpdated.imageUrls[i]).toBe(imageUrls[i]);
            })
            .expect(async () => {
              // Check if the wish has not changed

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              const wishDb = wishesDb.find(
                (u) => u._id.toString() === seed.publicWish_1._id.toString(),
              );

              assertWish(wishDb, seed.publicWish_1);
            })
            .expect(async () => {
              // Check if the other wish stage has not changed

              const wishStagesDb: WishStageEntity[] = await database
                .collection('wish-stages')
                .find()
                .toArray();

              const wishStageDb = wishStagesDb.find(
                (u) =>
                  u._id.toString() ===
                  seed.wishStage_2_of_PublicWish_1._id.toString(),
              );

              assertWishStage(wishStageDb, seed.wishStage_2_of_PublicWish_1);
            });
        });
      });
    });

    describe('DELETE', () => {
      describe(`should return 401`, () => {
        it(`unauthenticated request`, () => {
          const id = 'wish-stage-id';
          return request(app.getHttpServer())
            .delete(`/wish-stages/${id}`)
            .expect(401);
        });
      });

      describe(`should return 403`, () => {
        it(`publicWish_2 does not belong to the basicUser`, () => {
          const id = seed.wishStage_of_PublicWish_2._id.toString();
          return request(app.getHttpServer())
            .delete(`/wish-stages/${id}`)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(403);
        });
      });

      describe(`should return 404`, () => {
        it(`wish stage not found`, () => {
          const id = new ObjectId().toString();
          return request(app.getHttpServer())
            .delete(`/wish-stages/${id}`)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(404);
        });
      });

      describe(`should return 200`, () => {
        it(`wish stage deleted successfully`, () => {
          const id = seed.wishStage_1_of_PublicWish_1._id.toString();
          return request(app.getHttpServer())
            .delete(`/wish-stages/${id}`)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(200)
            .expect(async () => {
              const wishStagesDb: WishStageEntity[] = await database
                .collection('wish-stages')
                .find()
                .toArray();

              expect(wishStagesDb).toHaveLength(4);

              const wishStageDeleted = wishStagesDb.find(
                (u) => u._id.toString() === id,
              );
              expect(wishStageDeleted).toBeFalsy();

              const wishStageKeeped = wishStagesDb.find(
                (u) =>
                  u._id.toString() ===
                  seed.wishStage_2_of_PublicWish_1._id.toString(),
              );
              assertWishStage(
                wishStageKeeped,
                seed.wishStage_2_of_PublicWish_1,
              );
            });
        });
      });
    });
  });
});
