export abstract class TokenService {
  abstract signPayload(payload: string | Buffer | object): string;
}
