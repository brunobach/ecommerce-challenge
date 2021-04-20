// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require('nodemailer');
import { createTemplateEmail } from './mail.template';
import 'dotenv/config';

class SendEmail {
  private transport = nodemailer.createTransport({
    host: process.env.HOST_SMTP,
    port: process.env.PORT_SMTP,
    auth: {
      user: process.env.USER_SMTP,
      pass: process.env.PASS_SMTP,
    },
  });

  sendConfirmationEmail = (name: string, email: string, id: string): void => {
    const linkToEmail =
      process.env.URL_ENVIRONMENT + `/confirmation_email?id=${id}`;
    this.transport
      .sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: `Welcome, ${name}! Please confirm your email`,
        html: createTemplateEmail(linkToEmail),
      })
      .catch(console.error);
  };
}

export default new SendEmail();
