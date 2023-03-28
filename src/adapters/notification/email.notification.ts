import { readFile } from 'fs/promises';
import path from 'node:path';
import { Organizer, User } from '@prisma/client';
import nunjucks from 'nunjucks';
import { IMailGunEmail } from '../../../lib/mailgun/types/interface';
import { SendEmailResponse } from './types/types';

export default class EmailNotification {
  public static inject = ['mailgunEmailService'] as const;

  constructor(private readonly mailgunEmailService: IMailGunEmail) {}

  async sendWelcomeEmail(user: User | Organizer) {
    let content: string;
    const templatePath = path.resolve(__dirname, `./templates/${user.role.toLowerCase()}/welcome.html`);
    content = await readFile(templatePath, { encoding: 'utf8' });

    const renderedHtml = nunjucks.renderString(content, { name: user.fullName });

    return this.mailgunEmailService.sendEmail({
      to: user.email,
      from: 'admin@iankibandi.tech',
      htmlContent: renderedHtml,
      subject: 'Welcome to Gatherease',
    });
  }

  async sendConfirmation(code: string, user: User | Organizer): Promise<SendEmailResponse> {
    let content: string;
    const templatePath = path.resolve(__dirname, `./templates/general/confirmation.html`);

    content = await readFile(templatePath, { encoding: 'utf8' });

    const renderedHtml = nunjucks.renderString(content, { name: user.fullName, code: code });

    return this.mailgunEmailService.sendEmail({
      to: user.email,
      from: 'admin@iankibandi.tech',
      htmlContent: renderedHtml,
      subject: 'Email confirmation',
    });
  }
}
