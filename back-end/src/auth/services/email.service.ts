import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === 'false',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendConfirmationEmail(to: string, confirmationLink: string): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: 'Confirm Your Registration',
      html: `<p>Thank you for registering! Please <a href="${confirmationLink}">click here</a> to confirm your registration.</p>`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
