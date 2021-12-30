import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoClient, ObjectId } from 'mongodb';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import mikroOrmConfig from '../src/mikro-orm.config';
import { AuthTokensDto } from '../src/users/application/dtos';
import { Password, Role, Username } from '../src/users/domain/value-objects';
import { LoginDto } from '../src/users/infrastructure/dtos';
import { RefreshTokenEntity } from '../src/users/infrastructure/persistence/entities';
import { UserDb, dropDatabase, seedUser } from './helpers';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let mongoClient: MongoClient;

  // Seed
  let user_1: UserDb;
  let user_2: UserDb;
  let user_3: UserDb;
  let user_4: UserDb;

  async function seedDatabase(): Promise<void> {
    const database = mongoClient.db(mikroOrmConfig.dbName);

    user_1 = await seedUser(
      database,
      'scott@doe.com',
      'Scott_Doe',
      'passworD$_1',
      false,
      false,
      'Scott',
      'Doe',
      new Date(),
      new Date(),
      new Date(),
      'A nice person.',
      'https://www.example.com/scott/',
      new Date(),
      [Role.basic().getRole],
    );

    user_2 = await seedUser(
      database,
      'Christobal@doe.com',
      'Christobal_Doe',
      'passworD$_2',
      false,
      true,
      'Christobal',
      'Doe',
      new Date(),
      new Date(),
      new Date(),
      'A nice person.',
      'https://www.example.com/christobal/',
      null,
      [Role.basic().getRole],
    );

    user_3 = await seedUser(
      database,
      'Shannon@Doe.com',
      'Shannon_Doe',
      'passworD$_3',
      false,
      false,
      'Shannon',
      'Doe',
      new Date(),
      new Date(),
      new Date(),
      'A nice person.',
      'https://www.example.com/shannon/',
      null,
      [Role.basic().getRole],
    );

    user_4 = await seedUser(
      database,
      'Anne@Doe.com',
      'Anne_Doe',
      'passworD$_4',
      true,
      false,
      'Anne',
      'Doe',
      new Date(),
      new Date(),
      new Date(),
      'A nice person.',
      'https://www.example.com/anne/',
      null,
      [Role.basic().getRole],
    );
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

  describe('/POST', () => {
    describe('/login', () => {
      describe(`should return 400`, () => {
        it(`Username should not be empty`, () => {
          return request(app.getHttpServer())
            .post('/login')
            .send({ password: 'password' } as LoginDto)
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/username should not be empty/i),
                ),
              ).toBeTruthy(),
            );
        });

        it(`Username should not be empty`, () => {
          return request(app.getHttpServer())
            .post('/login')
            .send({ username: '', password: 'password' } as LoginDto)
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/username should not be empty/i),
                ),
              ).toBeTruthy(),
            );
        });

        it(`Username must be a string`, () => {
          return request(app.getHttpServer())
            .post('/login')
            .send({
              username: 4000,
              password: 'password',
            } as unknown as LoginDto)
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/username must be a string/i),
                ),
              ).toBeTruthy(),
            );
        });

        it(`Username is too short`, () => {
          return request(app.getHttpServer())
            .post('/login')
            .send({
              username: 'a'.repeat(Username.MinLength - 1),
              password: 'password',
            } as LoginDto)
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/username must be longer than or equal to /i),
                ),
              ).toBeTruthy(),
            );
        });

        it(`Username is too long`, () => {
          return request(app.getHttpServer())
            .post('/login')
            .send({
              username: 'a'.repeat(Username.MaxLength + 1),
              password: 'password',
            } as LoginDto)
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/username must be shorter than or equal to /i),
                ),
              ).toBeTruthy(),
            );
        });

        it(`Password should not be empty`, () => {
          return request(app.getHttpServer())
            .post('/login')
            .send({
              username: 'a'.repeat(Username.MaxLength),
            } as LoginDto)
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/password should not be empty/i),
                ),
              ).toBeTruthy(),
            );
        });

        it(`Password should not be empty`, () => {
          return request(app.getHttpServer())
            .post('/login')
            .send({
              username: 'a'.repeat(Username.MaxLength),
              password: '',
            } as LoginDto)
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/password should not be empty/i),
                ),
              ).toBeTruthy(),
            );
        });

        it(`Password must be a string`, () => {
          return request(app.getHttpServer())
            .post('/login')
            .send({
              username: 'a'.repeat(Username.MaxLength),
              password: 4000,
            } as unknown as LoginDto)
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/password must be a string/i),
                ),
              ).toBeTruthy(),
            );
        });

        it(`Password is too short`, () => {
          return request(app.getHttpServer())
            .post('/login')
            .send({
              username: 'a'.repeat(Username.MaxLength),
              password: 'a'.repeat(Password.MinLength - 1),
            } as LoginDto)
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/password must be longer than or equal to /i),
                ),
              ).toBeTruthy(),
            );
        });

        it(`Password is too long`, () => {
          return request(app.getHttpServer())
            .post('/login')
            .send({
              username: 'a'.repeat(Username.MinLength),
              password: 'a'.repeat(Password.MaxLength + 1),
            } as LoginDto)
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/password must be shorter than or equal to /i),
                ),
              ).toBeTruthy(),
            );
        });

        it(`Password must match password regex`, () => {
          return request(app.getHttpServer())
            .post('/login')
            .send({
              username: 'a'.repeat(Username.MinLength),
              password: 'a'.repeat(Password.MaxLength),
            } as LoginDto)
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/password must have at least /i),
                ),
              ).toBeTruthy(),
            );
        });
      });

      describe(`should return 404`, () => {
        it(`User not found`, () => {
          return request(app.getHttpServer())
            .post('/login')
            .send({
              username: 'john_doe',
              password: 'Pa$$w0rd',
            } as LoginDto)
            .expect(404)
            .expect(({ body }) => expect(body.message).toMatch(/not found/i));
        });
      });

      describe(`should return 401`, () => {
        it(`User is deleted`, () => {
          return request(app.getHttpServer())
            .post('/login')
            .send({
              username: user_1.username,
              password: user_1.password,
            } as LoginDto)
            .expect(401)
            .expect(({ body }) =>
              expect(body.message).toMatch(/User is deleted/i),
            );
        });

        it(`User is blocked`, () => {
          return request(app.getHttpServer())
            .post('/login')
            .send({
              username: user_2.username,
              password: user_2.password,
            } as LoginDto)
            .expect(401)
            .expect(({ body }) =>
              expect(body.message).toMatch(/User is blocked/i),
            );
        });

        it(`User is not verified`, () => {
          return request(app.getHttpServer())
            .post('/login')
            .send({
              username: user_3.username,
              password: user_3.password,
            } as LoginDto)
            .expect(401)
            .expect(({ body }) =>
              expect(body.message).toMatch(/User is not verified/i),
            );
        });

        it(`Username and password do not match`, () => {
          return request(app.getHttpServer())
            .post('/login')
            .send({
              username: user_4.username,
              password: 'P4ss_w0rd',
            } as LoginDto)
            .expect(401)
            .expect(({ body }) =>
              expect(body.message).toMatch(/wrong password/i),
            );
        });
      });

      describe(`should return 200`, () => {
        it(`User login successfully`, () => {
          return request(app.getHttpServer())
            .post('/login')
            .send({
              username: user_4.username,
              password: user_4.password,
            } as LoginDto)
            .expect(200)
            .expect(async ({ body }) => {
              const authTokens = body as AuthTokensDto;

              expect(authTokens).toBeTruthy();
              expect(authTokens.access_token).toBeTruthy();
              expect(authTokens.refresh_token).toBeTruthy();

              const database = mongoClient.db(mikroOrmConfig.dbName);
              const refreshToken: RefreshTokenEntity = await database
                .collection('refresh-tokens')
                .findOne({ _id: new ObjectId(authTokens.refresh_token) });

              expect(refreshToken).toBeTruthy();
              expect(refreshToken.user.toString()).toBe(user_4._id.toString());
              expect(refreshToken.createdAt).toBeTruthy();
              expect(refreshToken.duration).toBeTruthy();
              expect(refreshToken.ipAddress).toBeTruthy();
              expect(refreshToken.replacedAt).toBeNull();
              expect(refreshToken.replacedBy).toBeNull();
              expect(refreshToken.revokedAt).toBeNull();
            });
        });
      });
    });
  });
});
