import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AuthTokensDto } from '../../src/users/application/dtos';
import { LoginDto } from '../../src/users/infrastructure/dtos';
import { UserDb } from './seeders';

export async function getAccessToken(
  app: INestApplication,
  user: UserDb,
): Promise<string> {
  let accessToken: string;

  await request(app.getHttpServer())
    .post('/login')
    .send({
      username: user.username,
      password: user.password,
    } as LoginDto)
    .expect(200)
    .then(({ body }) => {
      const authTokens = body as AuthTokensDto;
      accessToken = authTokens.access_token;
    });

  return accessToken;
}
