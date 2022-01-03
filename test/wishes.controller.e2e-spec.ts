import { ObjectId } from '@mikro-orm/mongodb';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoClient } from 'mongodb';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import mikroOrmConfig from '../src/mikro-orm.config';
import {
  OutputWishDto,
  OutputWishStageDto,
} from '../src/wishes/application/dtos';
import { Wish } from '../src/wishes/domain/entities';
import {
  CategoryName,
  PrivacyLevel,
  WishDescription,
  WishTitle,
} from '../src/wishes/domain/value-objects';
import { CreateWishDto, UpdateWishDto } from '../src/wishes/infrastructure/dto';
import {
  WishEntity,
  WishStageEntity,
  WisherEntity,
} from '../src/wishes/infrastructure/persistence/entities';
import {
  Seed,
  WishDb,
  WishStageDb,
  dropDatabase,
  getAccessToken,
  seedDatabaseItems,
} from './helpers';

describe('WishesController (e2e)', () => {
  let app: INestApplication;
  let mongoClient: MongoClient;
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
    const database = mongoClient.db(mikroOrmConfig.dbName);

    await dropDatabase(database);
  });

  beforeEach(async () => {
    const database = mongoClient.db(mikroOrmConfig.dbName);
    seed = await seedDatabaseItems(database);

    accessTokenBasicUser = await getAccessToken(app, seed.basicUser);
    accessTokenModeratorUser = await getAccessToken(app, seed.moderatorUser);
    accessTokenAdminUser = await getAccessToken(app, seed.adminUser);
  });

  afterEach(async () => {
    const database = mongoClient.db(mikroOrmConfig.dbName);
    await dropDatabase(database);
  });

  afterAll(async () => {
    await app.close();
    await mongoClient.close();
  });

  describe('/wishes', () => {
    describe('GET', () => {
      describe(`should return 401`, () => {
        it(`unauthenticated request`, () => {
          return request(app.getHttpServer())
            .get('/wishes')
            .expect(401)
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });
      });

      describe(`should return 403`, () => {
        it(`wish does not belong to authenticated user`, () => {
          return request(app.getHttpServer())
            .get('/wishes')
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(403)
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });
      });

      describe('should return 200', () => {
        it(`should get the public wishes`, () => {
          return request(app.getHttpServer())
            .get('/wishes')
            .auth(accessTokenModeratorUser, { type: 'bearer' })
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(({ body }) => {
              const outputWishes = body as OutputWishDto[];

              expect(outputWishes).toHaveLength(4);

              const outputWish_1 = outputWishes.find(
                (w) => w.id === seed.publicWish_1._id.toString(),
              );
              assertOutputWish(outputWish_1, seed.publicWish_1);
              expect(outputWish_1.stages).toHaveLength(2);
              const outputWishStage_1 = outputWish_1.stages.find(
                (ws) =>
                  ws.id === seed.wishStage_1_of_PublicWish_1._id.toString(),
              );
              assertOutputWishStage(
                outputWishStage_1,
                seed.wishStage_1_of_PublicWish_1,
              );
              const outputWishStage_2 = outputWish_1.stages.find(
                (ws) =>
                  ws.id === seed.wishStage_2_of_PublicWish_1._id.toString(),
              );
              assertOutputWishStage(
                outputWishStage_2,
                seed.wishStage_2_of_PublicWish_1,
              );

              const outputWish_2 = outputWishes.find(
                (w) => w.id === seed.publicWish_2._id.toString(),
              );
              assertOutputWish(outputWish_2, seed.publicWish_2);
              expect(outputWish_2.stages).toHaveLength(1);
              const outputWishStage_3 = outputWish_1.stages.find(
                (ws) =>
                  ws.id === seed.wishStage_2_of_PublicWish_1._id.toString(),
              );
              assertOutputWishStage(
                outputWishStage_3,
                seed.wishStage_2_of_PublicWish_1,
              );

              const outputWish_3 = outputWishes.find(
                (w) => w.id === seed.justFriendsWish._id.toString(),
              );
              assertOutputWish(outputWish_3, seed.justFriendsWish);
              expect(outputWish_3.stages).toHaveLength(2);

              const outputWishStage_4 = outputWish_3.stages.find(
                (ws) =>
                  ws.id === seed.wishStage_1_of_JustFriendsWish._id.toString(),
              );
              assertOutputWishStage(
                outputWishStage_4,
                seed.wishStage_1_of_JustFriendsWish,
              );
              const outputWishStage_5 = outputWish_3.stages.find(
                (ws) =>
                  ws.id === seed.wishStage_2_of_JustFriendsWish._id.toString(),
              );
              assertOutputWishStage(
                outputWishStage_5,
                seed.wishStage_2_of_JustFriendsWish,
              );

              const outputWish_4 = outputWishes.find(
                (w) => w.id === seed.onlyMeWish._id.toString(),
              );
              assertOutputWish(outputWish_4, seed.onlyMeWish);
              expect(outputWish_4.stages).toHaveLength(0);
            });
        });
      });
    });

    describe('POST', () => {
      const id = new ObjectId().toString();
      const title = 'Brand new wish';
      const description = 'Nice wish.';
      const privacyLevel = PrivacyLevel.Public;
      const urls = [
        'https://www.example.com/new-wish/',
        'https://www.example.com/new-wish/',
        'https://www.example.com/new-wish-1/',
      ];
      const imageUrls = [
        'https://www.example.com/new-wish/1.jpg',
        'https://www.example.com/new-wish/2.jpg',
      ];
      const categories = ['category 1', 'category 2'];
      const startedAt = new Date().getTime();

      describe(`should return 401`, () => {
        it(`unauthenticated request`, () => {
          return request(app.getHttpServer())
            .post('/wishes')
            .send({
              id,
              wisherId: 'wish-id',
              title,
              description,
              privacyLevel,
              urls,
              imageUrls,
              categories,
              startedAt,
            } as CreateWishDto)
            .expect(401)
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });
      });

      describe(`should return 403`, () => {
        it(`basic user is not the same as its access token`, () => {
          return request(app.getHttpServer())
            .post('/wishes')
            .send({
              id,
              wisherId: seed.basicUserAsWisher._id.toString(),
              title,
              description,
              privacyLevel,
              urls,
              imageUrls,
              categories,
              startedAt,
            } as CreateWishDto)
            .auth(accessTokenAdminUser, { type: 'bearer' })
            .expect(403)
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });

        it(`moderator user is not the same as its access token`, () => {
          return request(app.getHttpServer())
            .post('/wishes')
            .send({
              id,
              wisherId: seed.moderatorUser._id.toString(),
              title,
              description,
              privacyLevel,
              urls,
              imageUrls,
              categories,
              startedAt,
            } as CreateWishDto)
            .auth(accessTokenAdminUser, { type: 'bearer' })
            .expect(403)
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });

        it(`admin user is not the same as its access token`, () => {
          return request(app.getHttpServer())
            .post('/wishes')
            .send({
              id,
              wisherId: seed.adminUser._id.toString(),
              title,
              description,
              privacyLevel,
              urls,
              imageUrls,
              categories,
              startedAt,
            } as CreateWishDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(403)
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });
      });

      describe(`should return 400`, () => {
        it(`id should not be empty`, () => {
          const wisherId = seed.basicUserAsWisher._id.toString();
          return request(app.getHttpServer())
            .post('/wishes')
            .send({
              wisherId,
              title,
              description,
              privacyLevel,
              urls,
              imageUrls,
              categories,
              startedAt,
            } as CreateWishDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/id should not be empty/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });

        it(`id must be a mongodb id`, () => {
          const wisherId = seed.basicUserAsWisher._id.toString();
          return request(app.getHttpServer())
            .post('/wishes')
            .send({
              id: 'wish-id',
              wisherId,
              title,
              description,
              privacyLevel,
              urls,
              imageUrls,
              categories,
              startedAt,
            } as CreateWishDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/id must be a mongodb id/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });

        it(`title should not be empty`, () => {
          const wisherId = seed.basicUserAsWisher._id.toString();
          return request(app.getHttpServer())
            .post('/wishes')
            .send({
              id,
              wisherId,
              description,
              privacyLevel,
              urls,
              imageUrls,
              categories,
              startedAt,
            } as CreateWishDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/title should not be empty/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });

        it(`title must be a string`, () => {
          const wisherId = seed.basicUserAsWisher._id.toString();
          return request(app.getHttpServer())
            .post('/wishes')
            .send({
              id,
              wisherId,
              title: 1000,
              description,
              privacyLevel,
              urls,
              imageUrls,
              categories,
              startedAt,
            } as unknown as CreateWishDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/title must be a string/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });

        it(`title is too long`, () => {
          const wisherId = seed.basicUserAsWisher._id.toString();
          return request(app.getHttpServer())
            .post('/wishes')
            .send({
              id,
              wisherId,
              title: 'a'.repeat(WishTitle.MaxLength + 1),
              description,
              privacyLevel,
              urls,
              imageUrls,
              categories,
              startedAt,
            } as CreateWishDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/title must be shorter than or equal to /i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });

        it(`description should not be empty`, () => {
          const wisherId = seed.basicUserAsWisher._id.toString();
          return request(app.getHttpServer())
            .post('/wishes')
            .send({
              id,
              wisherId,
              title,
              privacyLevel,
              urls,
              imageUrls,
              categories,
              startedAt,
            } as CreateWishDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/description should not be empty/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });

        it(`description must be a string`, () => {
          const wisherId = seed.basicUserAsWisher._id.toString();
          return request(app.getHttpServer())
            .post('/wishes')
            .send({
              id,
              wisherId,
              title,
              description: 1000,
              privacyLevel,
              urls,
              imageUrls,
              categories,
              startedAt,
            } as unknown as CreateWishDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/description must be a string/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });

        it(`description is too long`, () => {
          const wisherId = seed.basicUserAsWisher._id.toString();
          return request(app.getHttpServer())
            .post('/wishes')
            .send({
              id,
              wisherId,
              title,
              description: 'a'.repeat(WishDescription.MaxLength + 1),
              privacyLevel,
              urls,
              imageUrls,
              categories,
              startedAt,
            } as CreateWishDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/description must be shorter than or equal to /i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });

        it(`privacyLevel should not be empty`, () => {
          const wisherId = seed.basicUserAsWisher._id.toString();
          return request(app.getHttpServer())
            .post('/wishes')
            .send({
              id,
              wisherId,
              title,
              description,
              urls,
              imageUrls,
              categories,
              startedAt,
            } as unknown as CreateWishDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/privacyLevel must be a valid enum value/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });

        it(`privacyLevel must be a valid enum value`, () => {
          const wisherId = seed.basicUserAsWisher._id.toString();
          return request(app.getHttpServer())
            .post('/wishes')
            .send({
              id,
              wisherId,
              title,
              description,
              privacyLevel: 10,
              urls,
              imageUrls,
              categories,
              startedAt,
            } as unknown as CreateWishDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/privacyLevel must be a valid enum value/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });

        it(`urls must be an array`, () => {
          const wisherId = seed.basicUserAsWisher._id.toString();
          return request(app.getHttpServer())
            .post('/wishes')
            .send({
              id,
              wisherId,
              title,
              description,
              privacyLevel,
              urls: 'https://www.example.com',
              imageUrls,
              categories,
              startedAt,
            } as unknown as CreateWishDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/urls must be an array/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });

        it(`urls have so many elements`, () => {
          const wisherId = seed.basicUserAsWisher._id.toString();
          return request(app.getHttpServer())
            .post('/wishes')
            .send({
              id,
              wisherId,
              title,
              description,
              privacyLevel,
              urls: Array(Wish.MaxUrls + 1).fill('https://www.example.com'),
              imageUrls,
              categories,
              startedAt,
            } as CreateWishDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/urls must contain not more than /i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });

        it(`each value in urls must be a string`, () => {
          const wisherId = seed.basicUserAsWisher._id.toString();
          return request(app.getHttpServer())
            .post('/wishes')
            .send({
              id,
              wisherId,
              title,
              description,
              privacyLevel,
              urls: [
                'https://www.example.com',
                1000,
                'https://www.example.com',
              ],
              imageUrls,
              categories,
              startedAt,
            } as CreateWishDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/each value in urls must be a string/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });

        it(`imageUrls must be an array`, () => {
          const wisherId = seed.basicUserAsWisher._id.toString();
          return request(app.getHttpServer())
            .post('/wishes')
            .send({
              id,
              wisherId,
              title,
              description,
              privacyLevel,
              urls,
              imageUrls: 'https://www.example.com/1.jpg',
              categories,
              startedAt,
            } as unknown as CreateWishDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/imageUrls must be an array/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });

        it(`imageUrls have so many elements`, () => {
          const wisherId = seed.basicUserAsWisher._id.toString();
          return request(app.getHttpServer())
            .post('/wishes')
            .send({
              id,
              wisherId,
              title,
              description,
              privacyLevel,
              urls,
              imageUrls: Array(Wish.MaxUrls + 1).fill(
                'https://www.example.com',
              ),
              categories,
              startedAt,
            } as CreateWishDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/imageUrls must contain not more than /i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });

        it(`each value in imageUrls must be a string`, () => {
          const wisherId = seed.basicUserAsWisher._id.toString();
          return request(app.getHttpServer())
            .post('/wishes')
            .send({
              id,
              wisherId,
              title,
              description,
              privacyLevel,
              urls,
              imageUrls: [
                'https://www.example.com/1.jpg',
                1000,
                'https://www.example.com/1.jpg',
              ],
              categories,
              startedAt,
            } as CreateWishDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/each value in imageUrls must be a string/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });

        it(`categories must be an array`, () => {
          const wisherId = seed.basicUserAsWisher._id.toString();
          return request(app.getHttpServer())
            .post('/wishes')
            .send({
              id,
              wisherId,
              title,
              description,
              privacyLevel,
              urls,
              imageUrls,
              categories: 'category 1',
              startedAt,
            } as unknown as CreateWishDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/categories must be an array/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });

        it(`categories have so many elements`, () => {
          const wisherId = seed.basicUserAsWisher._id.toString();
          return request(app.getHttpServer())
            .post('/wishes')
            .send({
              id,
              wisherId,
              title,
              description,
              privacyLevel,
              urls,
              imageUrls,
              categories: Array(Wish.MaxCategories + 1).fill('category 1'),
              startedAt,
            } as CreateWishDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/categories must contain not more than /i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });

        it(`each value in categories must be a string`, () => {
          const wisherId = seed.basicUserAsWisher._id.toString();
          return request(app.getHttpServer())
            .post('/wishes')
            .send({
              id,
              wisherId,
              title,
              description,
              privacyLevel,
              urls,
              imageUrls,
              categories: ['category 1', 1000, 'category 2'],
              startedAt,
            } as CreateWishDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/each value in categories must be a string/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });

        it(`value in categories too long`, () => {
          const wisherId = seed.basicUserAsWisher._id.toString();
          return request(app.getHttpServer())
            .post('/wishes')
            .send({
              id,
              wisherId,
              title,
              description,
              privacyLevel,
              urls,
              imageUrls,
              categories: [
                'category 1',
                'a'.repeat(CategoryName.MaxLength + 1),
                'category 2',
              ],
              startedAt,
            } as CreateWishDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(
                    /each value in categories must be shorter than or equal to /i,
                  ),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });

        it(`id already in use`, () => {
          return request(app.getHttpServer())
            .post('/wishes')
            .send({
              id: seed.publicWish_1._id.toString(),
              wisherId: seed.basicUserAsWisher._id.toString(),
              title,
              description,
              privacyLevel,
              urls,
              imageUrls,
              categories,
              startedAt,
            } as CreateWishDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) => expect(body.message).toMatch(/in use/i))
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });
      });

      describe(`should return 201`, () => {
        it(`should create wish but not wisher because it is already created`, () => {
          const wisherId = seed.basicUserAsWisher._id.toString();
          return request(app.getHttpServer())
            .post('/wishes')
            .send({
              id,
              wisherId,
              title,
              description,
              privacyLevel,
              urls,
              imageUrls,
              categories,
              startedAt,
            } as CreateWishDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(201)
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(5);

              const wishCreated = wishesDb.find((u) => u._id.toString() === id);

              expect(wishCreated).toBeTruthy();

              expect(wishCreated._id.toString()).toBe(id);
              expect(wishCreated.title).toBe(title);
              expect(wishCreated.description).toBe(description);
              expect(wishCreated.privacyLevel).toBe(privacyLevel);
              expect(wishCreated.createdAt).toBeTruthy();
              expect(wishCreated.updatedAt).toBeTruthy();
              expect(wishCreated.wisher.toString()).toBe(wisherId);

              expect(wishCreated.urls).toHaveLength(urls.length);
              for (let i = 0; i < urls.length; i++)
                expect(wishCreated.urls[i]).toBe(urls[i]);

              expect(wishCreated.imageUrls).toHaveLength(imageUrls.length);
              for (let i = 0; i < imageUrls.length; i++)
                expect(wishCreated.imageUrls[i]).toBe(imageUrls[i]);

              expect(wishCreated.categories).toHaveLength(categories.length);
              for (let i = 0; i < categories.length; i++)
                expect(wishCreated.categories[i]).toBe(categories[i]);

              expect(wishCreated.startedAt.getTime()).toBe(startedAt);
              expect(wishCreated.deletedAt).toBeFalsy();
            })
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishersDb: WisherEntity[] = await database
                .collection('wishers')
                .find()
                .toArray();

              expect(wishersDb).toHaveLength(2);

              const wisherExistent = wishersDb.find(
                (u) => u._id.toString() === seed.basicUser._id.toString(),
              );

              expect(wisherExistent).toBeTruthy();
              expect(wisherExistent._id.toString()).toBe(
                seed.basicUser._id.toString(),
              );
            });
        });

        it(`should create wish and wisher`, () => {
          const wisherId = seed.adminUser._id.toString();
          return request(app.getHttpServer())
            .post('/wishes')
            .send({
              id,
              wisherId,
              title,
              description,
              privacyLevel,
              urls,
              imageUrls,
              categories,
              startedAt,
            } as CreateWishDto)
            .auth(accessTokenAdminUser, { type: 'bearer' })
            .expect(201)
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(5);

              const wishCreated = wishesDb.find((u) => u._id.toString() === id);

              expect(wishCreated).toBeTruthy();

              expect(wishCreated._id.toString()).toBe(id);
              expect(wishCreated.title).toBe(title);
              expect(wishCreated.description).toBe(description);
              expect(wishCreated.privacyLevel).toBe(privacyLevel);
              expect(wishCreated.createdAt).toBeTruthy();
              expect(wishCreated.updatedAt).toBeTruthy();
              expect(wishCreated.wisher.toString()).toBe(wisherId);

              expect(wishCreated.urls).toHaveLength(urls.length);
              for (let i = 0; i < urls.length; i++)
                expect(wishCreated.urls[i]).toBe(urls[i]);

              expect(wishCreated.imageUrls).toHaveLength(imageUrls.length);
              for (let i = 0; i < imageUrls.length; i++)
                expect(wishCreated.imageUrls[i]).toBe(imageUrls[i]);

              expect(wishCreated.categories).toHaveLength(categories.length);
              for (let i = 0; i < categories.length; i++)
                expect(wishCreated.categories[i]).toBe(categories[i]);

              expect(wishCreated.startedAt.getTime()).toBe(startedAt);
              expect(wishCreated.deletedAt).toBeFalsy();
            })
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishersDb: WisherEntity[] = await database
                .collection('wishers')
                .find()
                .toArray();

              expect(wishersDb).toHaveLength(3);

              const wisherCreated = wishersDb.find(
                (u) => u._id.toString() === seed.basicUser._id.toString(),
              );

              expect(wisherCreated).toBeTruthy();
              expect(wisherCreated._id.toString()).toBe(
                seed.basicUser._id.toString(),
              );
            });
        });
      });
    });
  });

  describe('/wishes/{id}', () => {
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
      const categories = ['new category 1', 'new category 2'];

      describe(`should return 401`, () => {
        it(`unauthenticated request`, () => {
          const id = 'wish-id';
          return request(app.getHttpServer())
            .patch(`/wishes/${id}`)
            .send({
              id,
              title,
              description,
              urls,
              imageUrls,
              categories,
            } as UpdateWishDto)
            .expect(401)
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });
      });

      describe(`should return 403`, () => {
        it(`publicWish_2 does not belong to the basicUser`, () => {
          const id = seed.publicWish_2._id.toString();
          return request(app.getHttpServer())
            .patch(`/wishes/${id}`)
            .send({
              id,
              title,
              description,
              urls,
              imageUrls,
              categories,
            } as UpdateWishDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(403)
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });
      });

      describe(`should return 404`, () => {
        it(`wish not found`, () => {
          const id = '61cce183b8917063ed614a17';
          return request(app.getHttpServer())
            .patch(`/wishes/${id}`)
            .send({
              id,
              title,
              description,
              urls,
              imageUrls,
              categories,
            } as UpdateWishDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(404)
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });
      });

      describe(`should return 400`, () => {
        it(`title should not be empty`, () => {
          const id = seed.publicWish_1._id.toString();
          return request(app.getHttpServer())
            .patch(`/wishes/${id}`)
            .send({
              id,
              description,
              urls,
              imageUrls,
              categories,
            } as UpdateWishDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/title should not be empty/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });

        it(`title must be a string`, () => {
          const id = seed.publicWish_1._id.toString();
          return request(app.getHttpServer())
            .patch(`/wishes/${id}`)
            .send({
              id,
              title: 1000,
              description,
              urls,
              imageUrls,
              categories,
            } as unknown as UpdateWishDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/title must be a string/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });

        it(`title is too long`, () => {
          const id = seed.publicWish_1._id.toString();
          return request(app.getHttpServer())
            .patch(`/wishes/${id}`)
            .send({
              id,
              title: 'a'.repeat(WishTitle.MaxLength + 1),
              description,
              urls,
              imageUrls,
              categories,
            } as UpdateWishDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/title must be shorter than or equal to /i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });

        it(`description should not be empty`, () => {
          const id = seed.publicWish_1._id.toString();
          return request(app.getHttpServer())
            .patch(`/wishes/${id}`)
            .send({
              id,
              title,
              urls,
              imageUrls,
              categories,
            } as UpdateWishDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/description should not be empty/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });

        it(`description must be a string`, () => {
          const id = seed.publicWish_1._id.toString();
          return request(app.getHttpServer())
            .patch(`/wishes/${id}`)
            .send({
              id,
              title,
              description: 1000,
              urls,
              imageUrls,
              categories,
            } as unknown as UpdateWishDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/description must be a string/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });

        it(`description is too long`, () => {
          const id = seed.publicWish_1._id.toString();
          return request(app.getHttpServer())
            .patch(`/wishes/${id}`)
            .send({
              id,
              title,
              description: 'a'.repeat(WishDescription.MaxLength + 1),
              urls,
              imageUrls,
              categories,
            } as UpdateWishDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/description must be shorter than or equal to /i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });

        it(`urls must be an array`, () => {
          const id = seed.publicWish_1._id.toString();
          return request(app.getHttpServer())
            .patch(`/wishes/${id}`)
            .send({
              id,
              title,
              description,
              urls: 'https://www.example.com',
              imageUrls,
              categories,
            } as unknown as UpdateWishDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/urls must be an array/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });

        it(`urls have so many elements`, () => {
          const id = seed.publicWish_1._id.toString();
          return request(app.getHttpServer())
            .patch(`/wishes/${id}`)
            .send({
              id,
              title,
              description,
              urls: Array(Wish.MaxUrls + 1).fill('https://www.example.com'),
              imageUrls,
              categories,
            } as UpdateWishDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/urls must contain not more than /i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });

        it(`each value in urls must be a string`, () => {
          const id = seed.publicWish_1._id.toString();
          return request(app.getHttpServer())
            .patch(`/wishes/${id}`)
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
              categories,
            } as UpdateWishDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/each value in urls must be a string/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });

        it(`imageUrls must be an array`, () => {
          const id = seed.publicWish_1._id.toString();
          return request(app.getHttpServer())
            .patch(`/wishes/${id}`)
            .send({
              id,
              title,
              description,
              urls,
              imageUrls: 'https://www.example.com/1.jpg',
              categories,
            } as unknown as UpdateWishDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/imageUrls must be an array/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });

        it(`imageUrls have so many elements`, () => {
          const id = seed.publicWish_1._id.toString();
          return request(app.getHttpServer())
            .patch(`/wishes/${id}`)
            .send({
              id,
              title,
              description,
              urls,
              imageUrls: Array(Wish.MaxUrls + 1).fill(
                'https://www.example.com',
              ),
              categories,
            } as UpdateWishDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/imageUrls must contain not more than /i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });

        it(`each value in imageUrls must be a string`, () => {
          const id = seed.publicWish_1._id.toString();
          return request(app.getHttpServer())
            .patch(`/wishes/${id}`)
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
              categories,
            } as UpdateWishDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/each value in imageUrls must be a string/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });

        it(`categories must be an array`, () => {
          const id = seed.publicWish_1._id.toString();
          return request(app.getHttpServer())
            .patch(`/wishes/${id}`)
            .send({
              id,
              title,
              description,
              urls,
              imageUrls,
              categories: 'new category',
            } as unknown as UpdateWishDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/categories must be an array/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });

        it(`categories have so many elements`, () => {
          const id = seed.publicWish_1._id.toString();
          return request(app.getHttpServer())
            .patch(`/wishes/${id}`)
            .send({
              id,
              title,
              description,
              urls,
              imageUrls,
              categories: Array(Wish.MaxCategories + 1).fill('new category'),
            } as UpdateWishDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/categories must contain not more than /i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });

        it(`each value in categories must be a string`, () => {
          const id = seed.publicWish_1._id.toString();
          return request(app.getHttpServer())
            .patch(`/wishes/${id}`)
            .send({
              id,
              title,
              description,
              urls,
              imageUrls,
              categories: ['new category 1', 1000, 'new category 2'],
            } as UpdateWishDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/each value in categories must be a string/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });

        it(`ids are different`, () => {
          const id = 'wish-id-1';
          return request(app.getHttpServer())
            .patch(`/wishes/${id}`)
            .send({
              id: 'wish-id-2',
              title,
              description,
              urls,
              imageUrls,
              categories,
            } as UpdateWishDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) =>
              expect(body.message).toMatch(/Id are different/i),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);
            });
        });
      });

      describe(`should return 200`, () => {
        it(`wish updated successfully`, () => {
          const id = seed.publicWish_1._id.toString();
          return request(app.getHttpServer())
            .patch(`/wishes/${id}`)
            .send({
              id,
              title,
              description,
              urls,
              imageUrls,
              categories,
            } as UpdateWishDto)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(200)
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishesDb: WishEntity[] = await database
                .collection('wishes')
                .find()
                .toArray();

              expect(wishesDb).toHaveLength(4);

              const wishUpdated = wishesDb.find((u) => u._id.toString() === id);

              expect(wishUpdated).toBeTruthy();

              expect(wishUpdated._id.toString()).toBe(id);
              expect(wishUpdated.wisher.toString()).toBe(
                seed.basicUser._id.toString(),
              );
              expect(wishUpdated.title).toBe(title);
              expect(wishUpdated.description).toBe(description);
              expect(wishUpdated.privacyLevel).toBe(
                seed.publicWish_1.privacyLevel,
              );
              expect(wishUpdated.createdAt).toBeTruthy();
              expect(wishUpdated.createdAt.getTime()).toBe(
                seed.publicWish_1.createdAt.getTime(),
              );
              expect(wishUpdated.updatedAt).toBeTruthy();
              expect(wishUpdated.updatedAt.getTime()).toBeGreaterThan(
                seed.publicWish_1.updatedAt.getTime(),
              );
              expect(wishUpdated.urls).toHaveLength(urls.length);
              expect(wishUpdated.imageUrls).toHaveLength(imageUrls.length);
              expect(wishUpdated.categories).toHaveLength(categories.length);

              for (let i = 0; i < urls.length; i++)
                expect(wishUpdated.urls[i]).toBe(urls[i]);

              for (let i = 0; i < imageUrls.length; i++)
                expect(wishUpdated.imageUrls[i]).toBe(imageUrls[i]);

              for (let i = 0; i < categories.length; i++)
                expect(wishUpdated.categories[i]).toBe(categories[i]);

              expect(wishUpdated.deletedAt).toBeNull();
              expect(wishUpdated.startedAt.getTime()).toBe(
                seed.publicWish_1.startedAt.getTime(),
              );
              expect(wishUpdated.completedAt.getTime()).toBe(
                seed.publicWish_1.completedAt.getTime(),
              );
            })
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishersDb: WisherEntity[] = await database
                .collection('wishers')
                .find()
                .toArray();

              expect(wishersDb).toHaveLength(2);

              const wisher = wishersDb.find(
                (u) =>
                  u._id.toString() === seed.basicUserAsWisher._id.toString(),
              );

              expect(wisher).toBeTruthy();
            })
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const wishStagesDb: WishStageEntity[] = await database
                .collection('wish-stages')
                .find()
                .toArray();

              expect(wishStagesDb).toHaveLength(5);

              const wishStage1 = wishStagesDb.find(
                (u) =>
                  u._id.toString() ===
                  seed.wishStage_1_of_PublicWish_1._id.toString(),
              );
              assertWishStage(wishStage1, seed.wishStage_1_of_PublicWish_1);

              const wishStage2 = wishStagesDb.find(
                (u) =>
                  u._id.toString() ===
                  seed.wishStage_2_of_PublicWish_1._id.toString(),
              );
              assertWishStage(wishStage2, seed.wishStage_2_of_PublicWish_1);
            });
        });
      });
    });
  });

  describe('/wishes/public', () => {
    describe('GET', () => {
      describe('should return 200', () => {
        it(`should get the public wishes`, () => {
          return request(app.getHttpServer())
            .get('/wishes/public')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(({ body }) => {
              const outputWishes = body as OutputWishDto[];

              expect(outputWishes).toHaveLength(2);

              const outputWish_1 = outputWishes.find(
                (w) => w.id === seed.publicWish_1._id.toString(),
              );
              assertOutputWish(outputWish_1, seed.publicWish_1);
              expect(outputWish_1.stages).toHaveLength(2);
              const outputWishStage_1 = outputWish_1.stages.find(
                (ws) =>
                  ws.id === seed.wishStage_1_of_PublicWish_1._id.toString(),
              );
              assertOutputWishStage(
                outputWishStage_1,
                seed.wishStage_1_of_PublicWish_1,
              );

              const outputWish_2 = outputWishes.find(
                (w) => w.id === seed.publicWish_2._id.toString(),
              );
              assertOutputWish(outputWish_2, seed.publicWish_2);
              expect(outputWish_2.stages).toHaveLength(1);
              const outputWishStage_2 = outputWish_1.stages.find(
                (ws) =>
                  ws.id === seed.wishStage_2_of_PublicWish_1._id.toString(),
              );
              assertOutputWishStage(
                outputWishStage_2,
                seed.wishStage_2_of_PublicWish_1,
              );
            });
        });
      });
    });
  });
});

function assertOutputWish(outputWish: OutputWishDto, wishDb: WishDb): void {
  expect(outputWish).toBeTruthy();
  expect(outputWish.id).toBe(wishDb._id.toString());
  expect(outputWish.wisherId).toBe(wishDb.wisher.toString());
  expect(outputWish.title).toBe(wishDb.title);
  expect(outputWish.description).toBe(wishDb.description);
  expect(outputWish.privacyLevel).toBe(wishDb.privacyLevel);
  expect(outputWish.createdAt).toBe(wishDb.createdAt.getTime());
  expect(outputWish.updatedAt).toBe(wishDb.updatedAt.getTime());

  for (let i = 0; i < wishDb.urls.length; i++)
    expect(outputWish.urls[i]).toBe(wishDb.urls[i]);

  for (let i = 0; i < wishDb.imageUrls.length; i++)
    expect(outputWish.imageUrls[i]).toBe(wishDb.imageUrls[i]);

  for (let i = 0; i < wishDb.categories.length; i++)
    expect(outputWish.categories[i]).toBe(wishDb.categories[i]);

  if (wishDb.deletedAt)
    expect(outputWish.deletedAt).toBe(wishDb.deletedAt.getTime());
  else expect(outputWish.deletedAt).toBeNull();

  if (wishDb.startedAt)
    expect(outputWish.startedAt).toBe(wishDb.startedAt.getTime());
  else expect(outputWish.startedAt).toBeNull();

  if (wishDb.completedAt)
    expect(outputWish.completedAt).toBe(wishDb.completedAt.getTime());
  else expect(outputWish.completedAt).toBeNull();
}

function assertOutputWishStage(
  outputWishStage: OutputWishStageDto,
  wishStageDb: WishStageDb,
): void {
  expect(outputWishStage).toBeTruthy();
  expect(outputWishStage.id).toBe(wishStageDb._id.toString());
  expect(outputWishStage.title).toBe(wishStageDb.title);
  expect(outputWishStage.description).toBe(wishStageDb.description);
  expect(outputWishStage.createdAt).toBe(wishStageDb.createdAt.getTime());

  for (let i = 0; i < wishStageDb.urls.length; i++)
    expect(outputWishStage.urls[i]).toBe(wishStageDb.urls[i]);

  for (let i = 0; i < wishStageDb.imageUrls.length; i++)
    expect(outputWishStage.imageUrls[i]).toBe(wishStageDb.imageUrls[i]);
}

function assertWishStage(
  wishStageEntity: WishStageEntity,
  wishStageDb: WishStageDb,
): void {
  expect(wishStageEntity).toBeTruthy();

  expect(wishStageEntity._id.toString()).toBe(wishStageDb._id.toString());
  expect(wishStageEntity.title).toBe(wishStageDb.title);
  expect(wishStageEntity.description).toBe(wishStageDb.description);
  expect(wishStageEntity.createdAt.getTime()).toBe(
    wishStageDb.createdAt.getTime(),
  );

  for (let i = 0; i < wishStageDb.urls.length; i++)
    expect(wishStageEntity.urls[i]).toBe(wishStageDb.urls[i]);

  for (let i = 0; i < wishStageDb.imageUrls.length; i++)
    expect(wishStageEntity.imageUrls[i]).toBe(wishStageDb.imageUrls[i]);
}
