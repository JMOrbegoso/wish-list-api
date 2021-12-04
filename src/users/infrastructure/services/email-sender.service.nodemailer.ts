import { Injectable } from '@nestjs/common';
import { Transporter, createTransport } from 'nodemailer';
import { EmailSenderService } from '../../application/services';

@Injectable()
export class EmailSenderServiceNodemailer implements EmailSenderService {
  private readonly transporter: Transporter;

  constructor() {
    const transporter = createTransport({
      host: process.env.EMAIL_HOST,
      service: process.env.EMAIL_SERVICE,
      port: 587,
      secure: true,
      logger: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
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
        from: process.env.EMAIL_USER,
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
