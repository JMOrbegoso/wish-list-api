import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoClient } from 'mongodb';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import mikroOrmConfig from '../src/mikro-orm.config';
import { OutputUserDto } from '../src/users/application/dtos';
import { Username } from '../src/users/domain/value-objects';
import { Seed, UserDb, dropDatabase, seedDatabaseItems } from './helpers';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let mongoClient: MongoClient;

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

    await dropDatabase(mongoClient, mikroOrmConfig.dbName);
  });

  beforeEach(async () => {
    seed = await seedDatabaseItems(mongoClient, mikroOrmConfig.dbName);
  });

  afterEach(async () => {
    await dropDatabase(mongoClient, mikroOrmConfig.dbName);
  });

  afterAll(async () => {
    await app.close();
    await mongoClient.close();
  });

  describe('/users/public', () => {
    describe('GET', () => {
      describe(`should return 200`, () => {
        it(`should get the users`, () => {
          return request(app.getHttpServer())
            .get('/users')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(({ body }) => {
              const outputUsers = body as OutputUserDto[];

              expect(outputUsers).toHaveLength(6);

              const outputUser_1 = outputUsers.find(
                (u) => u.id === seed.deletedUser._id.toString(),
              );
              assertOutputUser(outputUser_1, seed.deletedUser);

              const outputUser_2 = outputUsers.find(
                (u) => u.id === seed.blockedUser._id.toString(),
              );
              assertOutputUser(outputUser_2, seed.blockedUser);

              const outputUser_3 = outputUsers.find(
                (u) => u.id === seed.unverifiedUser._id.toString(),
              );
              assertOutputUser(outputUser_3, seed.unverifiedUser);

              const outputUser_4 = outputUsers.find(
                (u) => u.id === seed.basicUser._id.toString(),
              );
              assertOutputUser(outputUser_4, seed.basicUser);

              const outputUser_5 = outputUsers.find(
                (u) => u.id === seed.moderatorUser._id.toString(),
              );
              assertOutputUser(outputUser_5, seed.moderatorUser);

              const outputUser_6 = outputUsers.find(
                (u) => u.id === seed.adminUser._id.toString(),
              );
              assertOutputUser(outputUser_6, seed.adminUser);
            });
        });
      });
    });
  });

  describe('/users/{id}', () => {
    describe('GET', () => {
      describe(`should return 400`, () => {
        it(`invalid user id`, () => {
          return request(app.getHttpServer()).get('/users/user-id').expect(400);
        });
      });

      describe(`should return 404`, () => {
        it(`user not found`, () => {
          return request(app.getHttpServer())
            .get('/users/61cce183b8917063ed614a0b')
            .expect(404);
        });
      });

      describe(`should return 200`, () => {
        it(`user found`, () => {
          return request(app.getHttpServer())
            .get(`/users/${seed.basicUser._id.toString()}`)
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(({ body }) => {
              const outputUser = body as OutputUserDto;

              assertOutputUser(outputUser, seed.basicUser);
            });
        });
      });
    });
  });

  describe('/users/username/{username}', () => {
    describe('GET', () => {
      describe(`should return 400`, () => {
        it(`username is too long`, () => {
          return request(app.getHttpServer())
            .get(`/users/username/${'a'.repeat(Username.MaxLength + 1)}`)
            .expect(400);
        });

        it(`username is too short`, () => {
          return request(app.getHttpServer())
            .get(`/users/username/${'a'.repeat(Username.MinLength - 1)}`)
            .expect(400);
        });

        it(`username do not match its regex`, () => {
          return request(app.getHttpServer())
            .get(`/users/username/aaa=bbb`)
            .expect(400);
        });
      });

      describe(`should return 404`, () => {
        it(`user not found`, () => {
          return request(app.getHttpServer())
            .get('/users/username/user_name')
            .expect(404);
        });
      });

      describe(`should return 200`, () => {
        it(`user found`, () => {
          return request(app.getHttpServer())
            .get(`/users/username/${seed.basicUser.username}`)
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(({ body }) => {
              const outputUser = body as OutputUserDto;

              assertOutputUser(outputUser, seed.basicUser);
            });
        });
      });
    });
  });

  describe('/users/email/{email}', () => {
    describe('GET', () => {
      describe(`should return 400`, () => {
        test.each(['aaa=bbb', 'email', '1000', 'aaa@bb@b', '@bb.com'])(
          `email do not match its regex`,
          (invalidEmail) => {
            return request(app.getHttpServer())
              .get(`/users/email/${invalidEmail}`)
              .expect(400);
          },
        );
      });

      describe(`should return 404`, () => {
        it(`user not found`, () => {
          return request(app.getHttpServer())
            .get('/users/email/email@email.com')
            .expect(404);
        });
      });

      describe(`should return 200`, () => {
        it(`user found`, () => {
          return request(app.getHttpServer())
            .get(`/users/email/${seed.basicUser.email}`)
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(({ body }) => {
              const outputUser = body as OutputUserDto;

              assertOutputUser(outputUser, seed.basicUser);
            });
        });
      });
    });
  });
});

function assertOutputUser(outputUser: OutputUserDto, userDb: UserDb): void {
  expect(outputUser).toBeTruthy();

  expect(outputUser.id).toBe(userDb._id.toString());
  expect(outputUser.email).toBe(userDb.email);
  expect(outputUser.username).toBe(userDb.username);
  expect(outputUser.isVerified).toBe(userDb.isVerified);
  expect(outputUser.isBlocked).toBe(userDb.isBlocked);
  expect(outputUser.firstName).toBe(userDb.firstName);
  expect(outputUser.lastName).toBe(userDb.lastName);
  expect(outputUser.birthday).toBe(userDb.birthday.getTime());
  expect(outputUser.createdAt).toBe(userDb.createdAt.getTime());
  expect(outputUser.updatedAt).toBe(userDb.updatedAt.getTime());
  expect(outputUser.biography).toBe(userDb.biography);

  for (let i = 0; i < userDb.roles.length; i++)
    expect(outputUser.roles[i]).toBe(userDb.roles[i]);

  for (let i = 0; i < userDb.profilePicture.length; i++)
    expect(outputUser.profilePicture[i]).toBe(userDb.profilePicture[i]);

  if (userDb.deletedAt)
    expect(outputUser.deletedAt).toBe(userDb.deletedAt.getTime());
  else expect(outputUser.deletedAt).toBeNull();
}
