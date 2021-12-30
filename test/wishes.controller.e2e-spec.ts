import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoClient } from 'mongodb';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import mikroOrmConfig from '../src/mikro-orm.config';
import {
  OutputWishDto,
  OutputWishStageDto,
} from '../src/wishes/application/dtos';
import { PrivacyLevel } from '../src/wishes/domain/value-objects';
import {
  WishDb,
  WishStageDb,
  WisherDb,
  dropDatabase,
  seedWish,
  seedWishStage,
  seedWisher,
} from './helpers';

describe('WishesController (e2e)', () => {
  let app: INestApplication;
  let mongoClient: MongoClient;

  // Seed
  let wisher_1: WisherDb;
  let wisher_2: WisherDb;
  let wish_1: WishDb;
  let wish_2: WishDb;
  let wish_3: WishDb;
  let wish_4: WishDb;
  let wishStage_1: WishStageDb;
  let wishStage_2: WishStageDb;
  let wishStage_3: WishStageDb;
  let wishStage_4: WishStageDb;
  let wishStage_5: WishStageDb;

  async function seedDatabase(): Promise<void> {
    const database = mongoClient.db(mikroOrmConfig.dbName);

    // Seed wishers
    wisher_1 = await seedWisher(database);
    wisher_2 = await seedWisher(database);

    // Seed wishes
    wish_1 = await seedWish(
      database,
      wisher_1._id.toString(),
      'New Laptop',
      'A brand new laptop.',
      PrivacyLevel.Public,
      new Date(),
      new Date(),
      ['https://www.example.com', 'https://www.example.net'],
      ['https://www.example.com/1.jpg', 'https://www.example.net/1.jpg'],
      ['Tech', 'Shopping'],
      null,
      new Date(),
      new Date(),
    );

    wish_2 = await seedWish(
      database,
      wisher_1._id.toString(),
      'Develop a TODO app.',
      'Develop a cross-platform app.',
      PrivacyLevel.JustFriends,
      new Date(),
      new Date(),
      ['https://www.example.com'],
      ['https://www.example.com/1.jpg'],
      ['Development'],
      null,
      null,
      new Date(),
    );

    wish_3 = await seedWish(
      database,
      wisher_2._id.toString(),
      'Write a book',
      'Write an autobiographical book.',
      PrivacyLevel.OnlyMe,
      new Date(),
      new Date(),
    );

    wish_4 = await seedWish(
      database,
      wisher_2._id.toString(),
      'Learn to swim',
      'Learn various swimming styles.',
      PrivacyLevel.Public,
      new Date(),
      new Date(),
      ['https://www.example.com', 'https://www.example.net'],
      ['https://www.example.com/1.jpg', 'https://www.example.net/1.jpg'],
      ['Sports', 'Learn'],
      new Date(),
    );

    // Seed wish stages
    wishStage_1 = await seedWishStage(
      database,
      wish_1._id.toString(),
      'Found the best laptop model',
      'Find a nice laptop model to buy.',
      new Date(),
      ['https://www.example.com/stage', 'https://www.example.net/stage'],
      [
        'https://www.example.com/stage/1.png',
        'https://www.example.com/stage/2.png',
      ],
    );

    wishStage_2 = await seedWishStage(
      database,
      wish_1._id.toString(),
      'Buy it!',
      'Buy the laptop.',
      new Date(),
      ['https://www.example.com/stage'],
      ['https://www.example.com/stage/1.png'],
    );

    wishStage_3 = await seedWishStage(
      database,
      wish_2._id.toString(),
      'Choose a multiplatform framework',
      'Cross-platform framework with support for desktop Windows apps.',
      new Date(),
      [],
      [],
    );

    wishStage_4 = await seedWishStage(
      database,
      wish_2._id.toString(),
      'Install the IDE',
      'Install the IDE to start with the development of the app.',
      new Date(),
      [],
      [],
    );

    wishStage_5 = await seedWishStage(
      database,
      wish_4._id.toString(),
      'Enroll in a swimming school',
      'Swimming school near my house.',
      new Date(),
      [],
      [],
    );
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
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
              (w) => w.id === wish_1._id.toString(),
            );
            assertOutputWish(outputWish_1, wish_1);
            expect(outputWish_1.stages).toHaveLength(2);
            const outputWishStage_1 = outputWish_1.stages.find(
              (ws) => ws.id === wishStage_1._id.toString(),
            );
            assertOutputWishStage(outputWishStage_1, wishStage_1);

            const outputWish_2 = outputWishes.find(
              (w) => w.id === wish_4._id.toString(),
            );
            assertOutputWish(outputWish_2, wish_4);
            expect(outputWish_2.stages).toHaveLength(1);
            const outputWishStage_2 = outputWish_1.stages.find(
              (ws) => ws.id === wishStage_2._id.toString(),
            );
            assertOutputWishStage(outputWishStage_2, wishStage_2);
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
