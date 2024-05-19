import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import postmark, { ServerClient } from 'postmark';
import { ConfigService } from '@nestjs/config';
import {
  OTPTemplate,
  subscriberTemplate,
} from 'src/common/emailTemplates/otploginTemplate';

@Injectable()
export class NotificationsService {
  private clientTransporter: ServerClient;
  constructor(private readonly configService: ConfigService) {
    this.clientTransporter = new ServerClient(
      this.configService.get('POSTMAC_APIKEY'),
    );
  }

  // private readonly transporter = nodemailer.createTransport(
  //   postmarkTransport({
  //     auth: {
  //       apiKey: this.configService.get('POSTMAC_APIKEY'),
  //     },
  //   }),
  // );

  // private readonly Rems = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     type: 'OAUTH2',
  //     user: this.configService.get('SMTP_USER'),
  //     // pass: 'k',
  //     clientId: this.configService.get('GOOGLE_OAUTH_CLIENT_ID'),
  //     clientSecret: this.configService.get('GOOGLE_OAUTH_CLIENT_SECRET'),
  //     refreshToken: this.configService.get('GOOGLE_OAUTH_REFRESH_TOKEN'),
  //   },
  // });

  async notifyEmail({ email, text }) {
    try {
      await this.clientTransporter.sendEmail(
        {
          From: this.configService.get('SMTP_USER'),
          To: email,
          Subject: 'OTP Verification',
          HtmlBody: OTPTemplate(text, email),
        },
        (err, info) => {},
      );
    } catch (error) {
      throw error;
    }
  }
  async notifyEmailSubscription({ email, name }) {
    try {
      await this.clientTransporter.sendEmail({
        From: this.configService.get('SMTP_USER'),
        To: email,
        Subject: 'Welcome to Roomeo',
        // text: text,
        HtmlBody: subscriberTemplate(email, name),
      });
    } catch (error) {
      throw error;
    }
  }
}
