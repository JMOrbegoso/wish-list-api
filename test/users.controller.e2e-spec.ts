import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoClient, ObjectId } from 'mongodb';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import mikroOrmConfig from '../src/mikro-orm.config';
import { OutputUserDto } from '../src/users/application/dtos';
import {
  Biography,
  FirstName,
  LastName,
  Password,
  Role,
  Username,
} from '../src/users/domain/value-objects';
import { CreateUserDto } from '../src/users/infrastructure/dtos';
import { UserEntity } from '../src/users/infrastructure/persistence/entities';
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

  describe('/users', () => {
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

  describe('/users', () => {
    describe('POST', () => {
      const id = new ObjectId().toString();
      const email = 'john@doe.com';
      const username = 'john_doe';
      const password = 'Pa$$w0rd';
      const firstName = 'John';
      const lastName = 'Doe';
      const birthday = new Date().getTime();
      const biography = 'A nice person.';

      describe(`should return 400`, () => {
        it(`id should not be empty`, () => {
          return request(app.getHttpServer())
            .post('/users')
            .send({
              email,
              username,
              password,
              firstName,
              lastName,
              birthday,
              biography,
            } as CreateUserDto)
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

              const usersDb: UserEntity[] = await database
                .collection('users')
                .find()
                .toArray();

              expect(usersDb).toHaveLength(6);
            });
        });

        it(`id must be a mongodb id`, () => {
          return request(app.getHttpServer())
            .post('/users')
            .send({
              id: 'user-id',
              email,
              username,
              password,
              firstName,
              lastName,
              birthday,
              biography,
            } as CreateUserDto)
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

              const usersDb: UserEntity[] = await database
                .collection('users')
                .find()
                .toArray();

              expect(usersDb).toHaveLength(6);
            });
        });

        it(`email should not be empty`, () => {
          return request(app.getHttpServer())
            .post('/users')
            .send({
              id,
              username,
              password,
              firstName,
              lastName,
              birthday,
              biography,
            } as CreateUserDto)
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/email should not be empty/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const usersDb: UserEntity[] = await database
                .collection('users')
                .find()
                .toArray();

              expect(usersDb).toHaveLength(6);
            });
        });

        it(`email must be a string`, () => {
          return request(app.getHttpServer())
            .post('/users')
            .send({
              id,
              email: 1000,
              username,
              password,
              firstName,
              lastName,
              birthday,
              biography,
            } as unknown as CreateUserDto)
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/email must be a string/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const usersDb: UserEntity[] = await database
                .collection('users')
                .find()
                .toArray();

              expect(usersDb).toHaveLength(6);
            });
        });

        it(`email must be an email`, () => {
          return request(app.getHttpServer())
            .post('/users')
            .send({
              id,
              email: '1000',
              username,
              password,
              firstName,
              lastName,
              birthday,
              biography,
            } as unknown as CreateUserDto)
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/email must be an email/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const usersDb: UserEntity[] = await database
                .collection('users')
                .find()
                .toArray();

              expect(usersDb).toHaveLength(6);
            });
        });

        it(`username should not be empty`, () => {
          return request(app.getHttpServer())
            .post('/users')
            .send({
              id,
              email,
              password,
              firstName,
              lastName,
              birthday,
              biography,
            } as unknown as CreateUserDto)
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/username should not be empty/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const usersDb: UserEntity[] = await database
                .collection('users')
                .find()
                .toArray();

              expect(usersDb).toHaveLength(6);
            });
        });

        it(`username must be a string`, () => {
          return request(app.getHttpServer())
            .post('/users')
            .send({
              id,
              email,
              username: 1000,
              password,
              firstName,
              lastName,
              birthday,
              biography,
            } as unknown as CreateUserDto)
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/username must be a string/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const usersDb: UserEntity[] = await database
                .collection('users')
                .find()
                .toArray();

              expect(usersDb).toHaveLength(6);
            });
        });

        it(`username is too long`, () => {
          return request(app.getHttpServer())
            .post('/users')
            .send({
              id,
              email,
              username: 'a'.repeat(Username.MaxLength + 1),
              password,
              firstName,
              lastName,
              birthday,
              biography,
            } as unknown as CreateUserDto)
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/username must be shorter than or equal to/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const usersDb: UserEntity[] = await database
                .collection('users')
                .find()
                .toArray();

              expect(usersDb).toHaveLength(6);
            });
        });

        it(`username is too short`, () => {
          return request(app.getHttpServer())
            .post('/users')
            .send({
              id,
              email,
              username: 'a'.repeat(Username.MinLength - 1),
              password,
              firstName,
              lastName,
              birthday,
              biography,
            } as unknown as CreateUserDto)
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/username must be longer than or equal to/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const usersDb: UserEntity[] = await database
                .collection('users')
                .find()
                .toArray();

              expect(usersDb).toHaveLength(6);
            });
        });

        it(`username do not match its regex`, () => {
          return request(app.getHttpServer())
            .post('/users')
            .send({
              id,
              email,
              username: 'aaa%bbb',
              password,
              firstName,
              lastName,
              birthday,
              biography,
            } as unknown as CreateUserDto)
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/username contains invalid characters/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const usersDb: UserEntity[] = await database
                .collection('users')
                .find()
                .toArray();

              expect(usersDb).toHaveLength(6);
            });
        });

        it(`password should not be empty`, () => {
          return request(app.getHttpServer())
            .post('/users')
            .send({
              id,
              email,
              username,
              firstName,
              lastName,
              birthday,
              biography,
            } as unknown as CreateUserDto)
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/password should not be empty/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const usersDb: UserEntity[] = await database
                .collection('users')
                .find()
                .toArray();

              expect(usersDb).toHaveLength(6);
            });
        });

        it(`password must be a string`, () => {
          return request(app.getHttpServer())
            .post('/users')
            .send({
              id,
              email,
              username,
              password: 1000,
              firstName,
              lastName,
              birthday,
              biography,
            } as unknown as CreateUserDto)
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/password must be a string/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const usersDb: UserEntity[] = await database
                .collection('users')
                .find()
                .toArray();

              expect(usersDb).toHaveLength(6);
            });
        });

        it(`password is too long`, () => {
          return request(app.getHttpServer())
            .post('/users')
            .send({
              id,
              email,
              username,
              password: 'a'.repeat(Password.MaxLength + 1),
              firstName,
              lastName,
              birthday,
              biography,
            } as unknown as CreateUserDto)
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/password must be shorter than or equal to/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const usersDb: UserEntity[] = await database
                .collection('users')
                .find()
                .toArray();

              expect(usersDb).toHaveLength(6);
            });
        });

        it(`password is too short`, () => {
          return request(app.getHttpServer())
            .post('/users')
            .send({
              id,
              email,
              username,
              password: 'a'.repeat(Username.MinLength - 1),
              firstName,
              lastName,
              birthday,
              biography,
            } as unknown as CreateUserDto)
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/password must be longer than or equal to/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const usersDb: UserEntity[] = await database
                .collection('users')
                .find()
                .toArray();

              expect(usersDb).toHaveLength(6);
            });
        });

        it(`password do not match its regex`, () => {
          return request(app.getHttpServer())
            .post('/users')
            .send({
              id,
              email,
              username,
              password: 'aaa%bbb',
              firstName,
              lastName,
              birthday,
              biography,
            } as unknown as CreateUserDto)
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(
                    /password must have at least one number, one capital letter, and one symbol/i,
                  ),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const usersDb: UserEntity[] = await database
                .collection('users')
                .find()
                .toArray();

              expect(usersDb).toHaveLength(6);
            });
        });

        it(`firstName should not be empty`, () => {
          return request(app.getHttpServer())
            .post('/users')
            .send({
              id,
              email,
              password,
              username,
              lastName,
              birthday,
              biography,
            } as unknown as CreateUserDto)
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/firstName should not be empty/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const usersDb: UserEntity[] = await database
                .collection('users')
                .find()
                .toArray();

              expect(usersDb).toHaveLength(6);
            });
        });

        it(`firstName must be a string`, () => {
          return request(app.getHttpServer())
            .post('/users')
            .send({
              id,
              email,
              username,
              password,
              firstName: 1000,
              lastName,
              birthday,
              biography,
            } as unknown as CreateUserDto)
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/firstName must be a string/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const usersDb: UserEntity[] = await database
                .collection('users')
                .find()
                .toArray();

              expect(usersDb).toHaveLength(6);
            });
        });

        it(`firstName is too long`, () => {
          return request(app.getHttpServer())
            .post('/users')
            .send({
              id,
              email,
              username,
              password,
              firstName: 'a'.repeat(FirstName.MaxLength + 1),
              lastName,
              birthday,
              biography,
            } as unknown as CreateUserDto)
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/firstName must be shorter than or equal to/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const usersDb: UserEntity[] = await database
                .collection('users')
                .find()
                .toArray();

              expect(usersDb).toHaveLength(6);
            });
        });

        it(`lastName should not be empty`, () => {
          return request(app.getHttpServer())
            .post('/users')
            .send({
              id,
              email,
              password,
              username,
              firstName,
              birthday,
              biography,
            } as unknown as CreateUserDto)
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/lastName should not be empty/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const usersDb: UserEntity[] = await database
                .collection('users')
                .find()
                .toArray();

              expect(usersDb).toHaveLength(6);
            });
        });

        it(`lastName must be a string`, () => {
          return request(app.getHttpServer())
            .post('/users')
            .send({
              id,
              email,
              username,
              password,
              firstName,
              lastName: 1000,
              birthday,
              biography,
            } as unknown as CreateUserDto)
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/lastName must be a string/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const usersDb: UserEntity[] = await database
                .collection('users')
                .find()
                .toArray();

              expect(usersDb).toHaveLength(6);
            });
        });

        it(`lastName is too long`, () => {
          return request(app.getHttpServer())
            .post('/users')
            .send({
              id,
              email,
              username,
              password,
              firstName,
              lastName: 'a'.repeat(LastName.MaxLength + 1),
              birthday,
              biography,
            } as unknown as CreateUserDto)
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/lastName must be shorter than or equal to/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const usersDb: UserEntity[] = await database
                .collection('users')
                .find()
                .toArray();

              expect(usersDb).toHaveLength(6);
            });
        });

        it(`birthday should not be empty`, () => {
          return request(app.getHttpServer())
            .post('/users')
            .send({
              id,
              email,
              password,
              username,
              firstName,
              lastName,
              biography,
            } as unknown as CreateUserDto)
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/birthday should not be empty/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const usersDb: UserEntity[] = await database
                .collection('users')
                .find()
                .toArray();

              expect(usersDb).toHaveLength(6);
            });
        });

        it(`birthday should be a number`, () => {
          return request(app.getHttpServer())
            .post('/users')
            .send({
              id,
              email,
              password,
              username,
              firstName,
              lastName,
              birthday: '1000',
              biography,
            } as unknown as CreateUserDto)
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/birthday must be a positive number/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const usersDb: UserEntity[] = await database
                .collection('users')
                .find()
                .toArray();

              expect(usersDb).toHaveLength(6);
            });
        });

        it(`biography should not be empty`, () => {
          return request(app.getHttpServer())
            .post('/users')
            .send({
              id,
              email,
              password,
              username,
              firstName,
              lastName,
              birthday,
            } as unknown as CreateUserDto)
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/biography should not be empty/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const usersDb: UserEntity[] = await database
                .collection('users')
                .find()
                .toArray();

              expect(usersDb).toHaveLength(6);
            });
        });

        it(`biography must be a string`, () => {
          return request(app.getHttpServer())
            .post('/users')
            .send({
              id,
              email,
              username,
              password,
              firstName,
              lastName,
              birthday,
              biography: 1000,
            } as unknown as CreateUserDto)
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/biography must be a string/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const usersDb: UserEntity[] = await database
                .collection('users')
                .find()
                .toArray();

              expect(usersDb).toHaveLength(6);
            });
        });

        it(`biography is too long`, () => {
          return request(app.getHttpServer())
            .post('/users')
            .send({
              id,
              email,
              username,
              password,
              firstName,
              lastName,
              birthday,
              biography: 'a'.repeat(Biography.MaxLength + 1),
            } as unknown as CreateUserDto)
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/biography must be shorter than or equal to/i),
                ),
              ).toBeTruthy(),
            )
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const usersDb: UserEntity[] = await database
                .collection('users')
                .find()
                .toArray();

              expect(usersDb).toHaveLength(6);
            });
        });

        it(`Id already in use`, () => {
          return request(app.getHttpServer())
            .post('/users')
            .send({
              id: seed.basicUser._id.toString(),
              email,
              username,
              password,
              firstName,
              lastName,
              birthday,
              biography,
            } as CreateUserDto)
            .expect(400)
            .expect(({ body }) => expect(body.message).toMatch(/in use/i))
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const usersDb: UserEntity[] = await database
                .collection('users')
                .find()
                .toArray();

              expect(usersDb).toHaveLength(6);
            });
        });

        it(`Email already in use`, () => {
          return request(app.getHttpServer())
            .post('/users')
            .send({
              id,
              email: seed.basicUser.email,
              username,
              password,
              firstName,
              lastName,
              birthday,
              biography,
            } as CreateUserDto)
            .expect(400)
            .expect(({ body }) => expect(body.message).toMatch(/in use/i))
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const usersDb: UserEntity[] = await database
                .collection('users')
                .find()
                .toArray();

              expect(usersDb).toHaveLength(6);
            });
        });

        it(`Username already in use`, () => {
          return request(app.getHttpServer())
            .post('/users')
            .send({
              id,
              email,
              username: seed.basicUser.username,
              password,
              firstName,
              lastName,
              birthday,
              biography,
            } as CreateUserDto)
            .expect(400)
            .expect(({ body }) => expect(body.message).toMatch(/in use/i))
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const usersDb: UserEntity[] = await database
                .collection('users')
                .find()
                .toArray();

              expect(usersDb).toHaveLength(6);
            });
        });
      });

      describe(`should return 201`, () => {
        it(`User created successfully`, () => {
          return request(app.getHttpServer())
            .post('/users')
            .send({
              id,
              email,
              username,
              password,
              firstName,
              lastName,
              birthday,
              biography,
            } as CreateUserDto)
            .expect(201)
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const usersDb: UserEntity[] = await database
                .collection('users')
                .find()
                .toArray();

              expect(usersDb).toHaveLength(7);

              const userCreated = usersDb.find((u) => u._id.toString() === id);

              expect(userCreated).toBeTruthy();

              expect(userCreated._id.toString()).toBe(id);
              expect(userCreated.email).toBe(email);
              expect(userCreated.username).toBe(username);
              expect(userCreated.passwordHash).toBeTruthy();
              expect(userCreated.passwordHash).not.toBe(password);
              expect(userCreated.isVerified).toBeFalsy();
              expect(userCreated.verificationCode).not.toBeNull();
              expect(userCreated.isBlocked).toBeFalsy();
              expect(userCreated.firstName).toBe(firstName);
              expect(userCreated.lastName).toBe(lastName);
              expect(userCreated.birthday.getTime()).toBe(birthday);
              expect(userCreated.createdAt).toBeTruthy();
              expect(userCreated.updatedAt).toBeTruthy();
              expect(userCreated.biography).toBe(biography);
              expect(userCreated.roles).toHaveLength(1);
              expect(userCreated.roles[0]).toBe(Role.basic().getRole);
              expect(userCreated.profilePicture).toBeNull();
              expect(userCreated.deletedAt).toBeNull();
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

  if (userDb.profilePicture)
    expect(outputUser.profilePicture).toBe(userDb.profilePicture);
  else expect(outputUser.profilePicture).toBeNull();

  if (userDb.deletedAt)
    expect(outputUser.deletedAt).toBe(userDb.deletedAt.getTime());
  else expect(outputUser.deletedAt).toBeNull();
}
