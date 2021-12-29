import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoClient } from 'mongodb';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import mikroOrmConfig from '../src/mikro-orm.config';
import { OutputWishDto } from '../src/wishes/application/dtos';

describe('WishesController (e2e)', () => {
  let app: INestApplication;
  let mongoClient: MongoClient;

  async function seedDatabase(): Promise<void> {}

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
          const wishes = body as OutputWishDto[];
          expect(wishes).toHaveLength(0);
        });
    });
  });
});
