import { ObjectId } from '@mikro-orm/mongodb';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoClient, Db as MongoDatabase } from 'mongodb';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import mikroOrmConfig from '../src/mikro-orm.config';
import { UserEntity } from '../src/users/infrastructure/persistence/entities';
import {
  Seed,
  dropDatabase,
  getAccessToken,
  seedDatabaseItems,
} from './helpers';

describe('UsersManagementController (e2e)', () => {
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

  describe('/users', () => {
    describe('DELETE', () => {
      describe(`should return 401`, () => {
        it(`unauthenticated request`, () => {
          return request(app.getHttpServer())
            .delete(`/users/user-id`)
            .expect(401);
        });
      });

      describe(`should return 403`, () => {
        it(`authenticated user does not have the required role`, () => {
          return request(app.getHttpServer())
            .delete(`/users/user-id`)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(403);
        });
      });

      describe(`should return 400`, () => {
        it(`query is not a mongoId`, () => {
          return request(app.getHttpServer())
            .delete(`/users/user-id`)
            .auth(accessTokenModeratorUser, { type: 'bearer' })
            .expect(400);
        });

        it(`user is already deleted`, () => {
          return request(app.getHttpServer())
            .delete(`/users/${seed.deletedUser._id.toString()}`)
            .auth(accessTokenModeratorUser, { type: 'bearer' })
            .expect(400);
        });
      });

      describe(`should return 404`, () => {
        it(`user not found`, () => {
          return request(app.getHttpServer())
            .delete(`/users/61cce183b8917063ed614a0b`)
            .auth(accessTokenAdminUser, { type: 'bearer' })
            .expect(404);
        });
      });

      describe(`should return 200`, () => {
        it(`user deleted successfully`, () => {
          const userId = seed.basicUser._id.toString();
          return request(app.getHttpServer())
            .delete(`/users/${userId}`)
            .auth(accessTokenModeratorUser, { type: 'bearer' })
            .expect(200)
            .expect(async () => {
              const user: UserEntity = await database
                .collection('users')
                .findOne({ _id: new ObjectId(userId) });

              expect(user).toBeTruthy();
              expect(user.deletedAt).toBeTruthy();
            });
        });
      });
    });
  });

  describe('/users/undelete', () => {
    describe('PATCH', () => {
      describe(`should return 401`, () => {
        it(`unauthenticated request`, () => {
          return request(app.getHttpServer())
            .patch(`/users/undelete/user-id`)
            .expect(401);
        });
      });

      describe(`should return 403`, () => {
        it(`authenticated user does not have the required role`, () => {
          return request(app.getHttpServer())
            .patch(`/users/undelete/user-id`)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(403);
        });
      });

      describe(`should return 400`, () => {
        it(`query is not a mongoId`, () => {
          return request(app.getHttpServer())
            .patch(`/users/undelete/user-id`)
            .auth(accessTokenModeratorUser, { type: 'bearer' })
            .expect(400);
        });

        it(`user is not deleted`, () => {
          return request(app.getHttpServer())
            .patch(`/users/undelete/${seed.basicUser._id.toString()}`)
            .auth(accessTokenModeratorUser, { type: 'bearer' })
            .expect(400);
        });
      });

      describe(`should return 404`, () => {
        it(`user not found`, () => {
          return request(app.getHttpServer())
            .patch(`/users/undelete/61cce183b8917063ed614a0b`)
            .auth(accessTokenAdminUser, { type: 'bearer' })
            .expect(404);
        });
      });

      describe(`should return 200`, () => {
        it(`user undeleted successfully`, () => {
          const userId = seed.deletedUser._id.toString();
          return request(app.getHttpServer())
            .patch(`/users/undelete/${userId}`)
            .auth(accessTokenModeratorUser, { type: 'bearer' })
            .expect(200)
            .expect(async () => {
              const user: UserEntity = await database
                .collection('users')
                .findOne({ _id: new ObjectId(userId) });

              expect(user).toBeTruthy();
              expect(user.deletedAt).toBeFalsy();
            });
        });
      });
    });
  });

  describe('/users/block', () => {
    describe('PATCH', () => {
      describe(`should return 401`, () => {
        it(`unauthenticated request`, () => {
          return request(app.getHttpServer())
            .patch(`/users/block/user-id`)
            .expect(401);
        });
      });

      describe(`should return 403`, () => {
        it(`authenticated user does not have the required role`, () => {
          return request(app.getHttpServer())
            .patch(`/users/block/user-id`)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(403);
        });
      });

      describe(`should return 400`, () => {
        it(`query is not a mongoId`, () => {
          return request(app.getHttpServer())
            .patch(`/users/block/user-id`)
            .auth(accessTokenModeratorUser, { type: 'bearer' })
            .expect(400);
        });

        it(`user is already blocked`, () => {
          return request(app.getHttpServer())
            .patch(`/users/block/${seed.blockedUser._id.toString()}`)
            .auth(accessTokenModeratorUser, { type: 'bearer' })
            .expect(400);
        });
      });

      describe(`should return 404`, () => {
        it(`user not found`, () => {
          return request(app.getHttpServer())
            .patch(`/users/block/61cce183b8917063ed614a0b`)
            .auth(accessTokenAdminUser, { type: 'bearer' })
            .expect(404);
        });
      });

      describe(`should return 200`, () => {
        it(`user blocked successfully`, () => {
          const userId = seed.basicUser._id.toString();
          return request(app.getHttpServer())
            .patch(`/users/block/${userId}`)
            .auth(accessTokenModeratorUser, { type: 'bearer' })
            .expect(200)
            .expect(async () => {
              const user: UserEntity = await database
                .collection('users')
                .findOne({ _id: new ObjectId(userId) });

              expect(user).toBeTruthy();
              expect(user.isBlocked).toBeTruthy();
            });
        });
      });
    });
  });

  describe('/users/unblock', () => {
    describe('PATCH', () => {
      describe(`should return 401`, () => {
        it(`unauthenticated request`, () => {
          return request(app.getHttpServer())
            .patch(`/users/unblock/user-id`)
            .expect(401);
        });
      });

      describe(`should return 403`, () => {
        it(`authenticated user does not have the required role`, () => {
          return request(app.getHttpServer())
            .patch(`/users/unblock/user-id`)
            .auth(accessTokenBasicUser, { type: 'bearer' })
            .expect(403);
        });
      });

      describe(`should return 400`, () => {
        it(`query is not a mongoId`, () => {
          return request(app.getHttpServer())
            .patch(`/users/unblock/user-id`)
            .auth(accessTokenModeratorUser, { type: 'bearer' })
            .expect(400);
        });

        it(`user is not blocked`, () => {
          return request(app.getHttpServer())
            .patch(`/users/unblock/${seed.basicUser._id.toString()}`)
            .auth(accessTokenModeratorUser, { type: 'bearer' })
            .expect(400);
        });
      });

      describe(`should return 404`, () => {
        it(`user not found`, () => {
          return request(app.getHttpServer())
            .patch(`/users/unblock/61cce183b8917063ed614a0b`)
            .auth(accessTokenAdminUser, { type: 'bearer' })
            .expect(404);
        });
      });

      describe(`should return 200`, () => {
        it(`user unblocked successfully`, () => {
          const userId = seed.blockedUser._id.toString();
          return request(app.getHttpServer())
            .patch(`/users/unblock/${userId}`)
            .auth(accessTokenModeratorUser, { type: 'bearer' })
            .expect(200)
            .expect(async () => {
              const user: UserEntity = await database
                .collection('users')
                .findOne({ _id: new ObjectId(userId) });

              expect(user).toBeTruthy();
              expect(user.isBlocked).toBeFalsy();
            });
        });
      });
    });
  });
});
