import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoClient, ObjectId } from 'mongodb';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import mikroOrmConfig from '../src/mikro-orm.config';
import { AuthTokensDto } from '../src/users/application/dtos';
import { Password, Role, Username } from '../src/users/domain/value-objects';
import { LoginDto, RefreshTokenDto } from '../src/users/infrastructure/dtos';
import {
  RefreshTokenEntity,
  UserEntity,
} from '../src/users/infrastructure/persistence/entities';
import {
  RefreshTokenDb,
  UserDb,
  dropDatabase,
  seedRefreshToken,
  seedUser,
} from './helpers';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let mongoClient: MongoClient;

  // Seed
  let user_1: UserDb;
  let user_2: UserDb;
  let user_3: UserDb;
  let user_4: UserDb;
  let refreshToken_1: RefreshTokenDb;
  let refreshToken_2: RefreshTokenDb;
  let refreshToken_3: RefreshTokenDb;
  let refreshToken_4: RefreshTokenDb;
  let refreshToken_5: RefreshTokenDb;
  let refreshToken_6: RefreshTokenDb;

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

    refreshToken_1 = await seedRefreshToken(
      database,
      user_4._id.toString(),
      new Date(2000, 10, 10),
    );

    refreshToken_2 = await seedRefreshToken(
      database,
      user_4._id.toString(),
      new Date(),
      1000,
      '192.168.0.1',
    );

    refreshToken_3 = await seedRefreshToken(
      database,
      user_4._id.toString(),
      undefined,
      undefined,
      undefined,
      new Date(),
      refreshToken_1._id.toString(),
    );

    refreshToken_4 = await seedRefreshToken(
      database,
      user_4._id.toString(),
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      new Date(),
    );

    refreshToken_5 = await seedRefreshToken(database, user_1._id.toString());

    refreshToken_6 = await seedRefreshToken(
      database,
      user_2._id.toString(),
      undefined,
      undefined,
      '192.168.0.1',
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

  describe('/login', () => {
    describe('POST', () => {
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

  describe('/refresh', () => {
    describe('POST', () => {
      describe(`should return 400`, () => {
        it(`RefreshToken should not be empty`, () => {
          return request(app.getHttpServer())
            .post('/refresh')
            .send({} as RefreshTokenDto)
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/refresh_token should not be empty/i),
                ),
              ).toBeTruthy(),
            );
        });

        it(`RefreshToken should not be empty`, () => {
          return request(app.getHttpServer())
            .post('/refresh')
            .send({ refresh_token: '' } as RefreshTokenDto)
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/refresh_token should not be empty/i),
                ),
              ).toBeTruthy(),
            );
        });

        it(`RefreshToken must be a MongoDB ID`, () => {
          return request(app.getHttpServer())
            .post('/refresh')
            .send({
              refresh_token: 'refresh_token',
            } as unknown as RefreshTokenDto)
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/refresh_token must be a mongodb id/i),
                ),
              ).toBeTruthy(),
            );
        });
      });

      describe(`should return 401`, () => {
        it(`Refresh Token not found`, () => {
          return request(app.getHttpServer())
            .post('/refresh')
            .send({
              refresh_token: new ObjectId().toString(),
            } as RefreshTokenDto)
            .expect(401);
        });

        it(`Refresh Token has expired`, () => {
          return request(app.getHttpServer())
            .post('/refresh')
            .send({
              refresh_token: refreshToken_1._id.toString(),
            } as RefreshTokenDto)
            .expect(401)
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const refreshToken: RefreshTokenEntity = await database
                .collection('refresh-tokens')
                .findOne({ _id: new ObjectId(refreshToken_1._id) });

              expect(refreshToken).toBeTruthy();
              expect(refreshToken.replacedBy).toBeFalsy();
              expect(refreshToken.replacedAt).toBeFalsy();
              expect(refreshToken.revokedAt).toBeFalsy();
            });
        });

        it(`Refresh Token has was used, should revoke all the refresh tokens of the User and Ip address`, () => {
          return request(app.getHttpServer())
            .post('/refresh')
            .send({
              refresh_token: refreshToken_3._id.toString(),
            } as RefreshTokenDto)
            .expect(401)
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const refreshTokensDb: RefreshTokenEntity[] = await database
                .collection('refresh-tokens')
                .find()
                .toArray();

              // Check if the refreshToken_2 was automatically revoked
              // (Refresh Token generated by the same User)
              const validRefreshToken1 = refreshTokensDb.find(
                (rt) => rt._id.toString() === refreshToken_2._id.toString(),
              );
              expect(validRefreshToken1).toBeTruthy();
              expect(validRefreshToken1.replacedBy).toBeFalsy();
              expect(validRefreshToken1.replacedAt).toBeFalsy();
              expect(validRefreshToken1.revokedAt).toBeTruthy();

              // Check if the refreshToken_5 was automatically revoked
              // (Refresh Token generated by different User but the same Ip Address)
              const validRefreshToken2 = refreshTokensDb.find(
                (rt) => rt._id.toString() === refreshToken_5._id.toString(),
              );
              expect(validRefreshToken2).toBeTruthy();
              expect(validRefreshToken2.replacedBy).toBeFalsy();
              expect(validRefreshToken2.replacedAt).toBeFalsy();
              expect(validRefreshToken2.revokedAt).toBeTruthy();

              // Check if the refreshToken_6 was NOT automatically revoked
              // (Refresh Token generated by different User and different Ip Address)
              const validRefreshToken3 = refreshTokensDb.find(
                (rt) => rt._id.toString() === refreshToken_6._id.toString(),
              );
              expect(validRefreshToken3).toBeTruthy();
              expect(validRefreshToken3.replacedBy).toBeFalsy();
              expect(validRefreshToken3.replacedAt).toBeFalsy();
              expect(validRefreshToken3.revokedAt).toBeFalsy();
            });
        });

        it(`Refresh Token has was revoked, should revoke all the refresh tokens of the User and Ip address`, () => {
          return request(app.getHttpServer())
            .post('/refresh')
            .send({
              refresh_token: refreshToken_4._id.toString(),
            } as RefreshTokenDto)
            .expect(401)
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const refreshTokensDb: RefreshTokenEntity[] = await database
                .collection('refresh-tokens')
                .find()
                .toArray();

              // Check if the refreshToken_2 was automatically revoked
              // (Refresh Token generated by the same User)
              const validRefreshToken1 = refreshTokensDb.find(
                (rt) => rt._id.toString() === refreshToken_2._id.toString(),
              );
              expect(validRefreshToken1).toBeTruthy();
              expect(validRefreshToken1.replacedBy).toBeFalsy();
              expect(validRefreshToken1.replacedAt).toBeFalsy();
              expect(validRefreshToken1.revokedAt).toBeTruthy();

              // Check if the refreshToken_5 was automatically revoked
              // (Refresh Token generated by different User but the same Ip Address)
              const validRefreshToken2 = refreshTokensDb.find(
                (rt) => rt._id.toString() === refreshToken_5._id.toString(),
              );
              expect(validRefreshToken2).toBeTruthy();
              expect(validRefreshToken2.replacedBy).toBeFalsy();
              expect(validRefreshToken2.replacedAt).toBeFalsy();
              expect(validRefreshToken2.revokedAt).toBeTruthy();

              // Check if the refreshToken_6 was NOT automatically revoked
              // (Refresh Token generated by different User and different Ip Address)
              const validRefreshToken3 = refreshTokensDb.find(
                (rt) => rt._id.toString() === refreshToken_6._id.toString(),
              );
              expect(validRefreshToken3).toBeTruthy();
              expect(validRefreshToken3.replacedBy).toBeFalsy();
              expect(validRefreshToken3.replacedAt).toBeFalsy();
              expect(validRefreshToken3.revokedAt).toBeFalsy();
            });
        });
      });

      describe(`should return 200`, () => {
        it(`Auth tokens successfully refreshed`, () => {
          return request(app.getHttpServer())
            .post('/refresh')
            .send({
              refresh_token: refreshToken_2._id.toString(),
            } as RefreshTokenDto)
            .expect(200)
            .expect(async ({ body }) => {
              const authTokens = body as AuthTokensDto;

              expect(authTokens).toBeTruthy();
              expect(authTokens.access_token).toBeTruthy();
              expect(authTokens.refresh_token).toBeTruthy();

              const database = mongoClient.db(mikroOrmConfig.dbName);
              const refreshTokensDb: RefreshTokenEntity[] = await database
                .collection('refresh-tokens')
                .find()
                .toArray();

              // Check if the new refresh token was successfully created
              const newRefreshToken = refreshTokensDb.find(
                (rt) => rt._id.toString() === authTokens.refresh_token,
              );

              expect(newRefreshToken).toBeTruthy();
              expect(newRefreshToken.user.toString()).toBe(
                user_4._id.toString(),
              );
              expect(newRefreshToken.createdAt).toBeTruthy();
              expect(newRefreshToken.duration).toBeTruthy();
              expect(newRefreshToken.ipAddress).toBeTruthy();
              expect(newRefreshToken.replacedAt).toBeNull();
              expect(newRefreshToken.replacedBy).toBeNull();
              expect(newRefreshToken.revokedAt).toBeNull();

              // Check if the refreshToken_2 was used
              const usedRefreshToken = refreshTokensDb.find(
                (rt) => rt._id.toString() === refreshToken_2._id.toString(),
              );

              expect(usedRefreshToken).toBeTruthy();
              expect(usedRefreshToken.user.toString()).toBe(
                user_4._id.toString(),
              );
              expect(usedRefreshToken.createdAt).toBeTruthy();
              expect(usedRefreshToken.duration).toBeTruthy();
              expect(usedRefreshToken.ipAddress).toBeTruthy();
              expect(usedRefreshToken.replacedAt).not.toBeNull();
              expect(usedRefreshToken.replacedBy).toBe(
                newRefreshToken._id.toString(),
              );
              expect(usedRefreshToken.revokedAt).toBeNull();
            });
        });
      });
    });
  });

  describe('/verify', () => {
    describe('GET', () => {
      describe(`should return 400`, () => {
        it(`verification code should not be empty`, () => {
          return request(app.getHttpServer())
            .get('/verify')
            .query({ code: '' })
            .expect(400)
            .expect(({ body }) =>
              expect(
                (body.message as string[]).some((m) =>
                  m.match(/code should not be empty/i),
                ),
              ).toBeTruthy(),
            );
        });

        it(`User is already verified`, () => {
          return request(app.getHttpServer())
            .get('/verify')
            .query({ code: user_4.verificationCode })
            .expect(400)
            .expect(({ body }) =>
              expect(body.message).toMatch(/already verified/i),
            );
        });
      });

      describe(`should return 404`, () => {
        it(`Not found user related to the verification code`, () => {
          return request(app.getHttpServer())
            .get('/verify')
            .query({ code: 'verification-code' })
            .expect(404)
            .expect(({ body }) => expect(body.message).toMatch(/not found/i));
        });
      });

      describe(`should return 200`, () => {
        it(`User verified successfully`, () => {
          return request(app.getHttpServer())
            .get('/verify')
            .query({ code: user_3.verificationCode })
            .expect(200)
            .expect(async () => {
              const database = mongoClient.db(mikroOrmConfig.dbName);

              const user: UserEntity = await database
                .collection('users')
                .findOne({ _id: new ObjectId(user_3._id) });

              expect(user).toBeTruthy();
              expect(user.isVerified).toBeTruthy();
            });
        });
      });
    });
  });
});
