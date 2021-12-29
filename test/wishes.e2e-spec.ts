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
    wisher_1 = await seedWisher(database, '61ccc8d723d2dca10e57291e');
    wisher_2 = await seedWisher(database, '61cce183b8917063ed614a00');

    // Seed wishes
    wish_1 = await seedWish(
      database,
      '61cce183b8917063ed614a01',
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
      '61cce183b8917063ed614a03',
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
      '61cce183b8917063ed614a04',
      wisher_2._id.toString(),
      'Write a book',
      'Write an autobiographical book.',
      PrivacyLevel.OnlyMe,
      new Date(),
      new Date(),
    );

    wish_4 = await seedWish(
      database,
      '61cce183b8917063ed614a05',
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
      '61cce183b8917063ed614a02',
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
      '61cce183b8917063ed614a07',
      wish_1._id.toString(),
      'Buy it!',
      'Buy the laptop.',
      new Date(),
      ['https://www.example.com/stage'],
      ['https://www.example.com/stage/1.png'],
    );

    wishStage_3 = await seedWishStage(
      database,
      '61cce183b8917063ed614a0e',
      wish_2._id.toString(),
      'Choose a multiplatform framework',
      'Cross-platform framework with support for desktop Windows apps.',
      new Date(),
      [],
      [],
    );

    wishStage_4 = await seedWishStage(
      database,
      '61cce183b8917063ed614a0d',
      wish_2._id.toString(),
      'Install the IDE',
      'Install the IDE to start with the development of the app.',
      new Date(),
      [],
      [],
    );

    wishStage_5 = await seedWishStage(
      database,
      '61cce183b8917063ed614a0c',
      wish_4._id.toString(),
      'Enroll in a swimming school',
      'Swimming school near my house.',
      new Date(),
      [],
      [],
    );
  }

  async function cleanDatabase(): Promise<void> {
    const database = mongoClient.db(mikroOrmConfig.dbName);
    const collections = await database.collections();

    collections.forEach(async (collection) => {
      await collection.deleteMany({});
    });
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

    await cleanDatabase();
  });

  beforeEach(async () => {
    await seedDatabase();
  });

  afterEach(async () => {
    await cleanDatabase();
  });

  afterAll(async () => {
    await app.close();
    await mongoClient.close();
  });

  describe('/GET', () => {
    it(`should get the public wishes`, () => {
      return request(app.getHttpServer())
        .get('/wishes/public')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(({ body }) => {
          const outputWishes = body as OutputWishDto[];

          expect(outputWishes).toHaveLength(2);
        });
    });
  });
});
