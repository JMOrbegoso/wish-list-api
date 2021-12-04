export abstract class EmailSenderService {
  abstract send(to: string, subject: string, body: string): Promise<boolean>;
}
