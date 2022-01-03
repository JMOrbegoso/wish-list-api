import { Injectable } from '@nestjs/common';
import { Transporter, createTransport } from 'nodemailer';
import config from '../../../config';
import { EmailSenderService } from '../../application/services';

@Injectable()
export class EmailSenderServiceNodemailer implements EmailSenderService {
  private readonly transporter: Transporter;

  constructor() {
    const transporter = createTransport({
      host: config.EMAIL_HOST,
      service: config.EMAIL_SERVICE,
      port: 587,
      secure: true,
      logger: true,
      auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASS,
      },
    });

    // Verify connection configuration
    transporter.verify(function (error, success) {
      if (error || !success)
        console.error('Nodemailer connection configuration error\n', error);
    });

    this.transporter = transporter;
  }

  async send(to: string, subject: string, body: string): Promise<boolean> {
    try {
      const mail = {
        from: config.EMAIL_SENDER,
        to: to,
        subject: subject,
        text: body,
      };
      await this.transporter.sendMail(mail);

      console.log('Email sent sucessfully', mail);
      return true;
    } catch (error) {
      console.error('email could not sent', error);
      return false;
    }
  }
}
