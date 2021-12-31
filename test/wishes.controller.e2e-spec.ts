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
import {
  Seed,
  WishDb,
  WishStageDb,
  dropDatabase,
  seedDatabaseItems,
} from './helpers';

describe('WishesController (e2e)', () => {
  let app: INestApplication;
  let mongoClient: MongoClient;

  // Seed
  let seed: Seed;

  async function seedDatabase(): Promise<void> {
    seed = await seedDatabaseItems(mongoClient, mikroOrmConfig.dbName);
  }

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

    await dropDatabase(mongoClient, mikroOrmConfig.dbName);
  });

  beforeEach(async () => {
    await seedDatabase();
  });

  afterEach(async () => {
    await dropDatabase(mongoClient, mikroOrmConfig.dbName);
  });

  afterAll(async () => {
    await app.close();
    await mongoClient.close();
  });

  describe('/wishes/public', () => {
    describe('GET', () => {
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
              (ws) => ws.id === seed.wishStage_1_of_PublicWish_1._id.toString(),
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
              (ws) => ws.id === seed.wishStage_2_of_PublicWish_1._id.toString(),
            );
            assertOutputWishStage(
              outputWishStage_2,
              seed.wishStage_2_of_PublicWish_1,
            );
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
});
