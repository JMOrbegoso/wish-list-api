export abstract class EmailSenderService {
  abstract send(
    from: string,
    to: string,
    subject: string,
    body: string,
  ): Promise<void>;
}
