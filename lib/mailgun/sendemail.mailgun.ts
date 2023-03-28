import ApiBase from './base.mailgun';
import { IMailGunEmail } from './types/interface';
import { EmailData } from './types/types';
import FormData from 'form-data';

export default class Email extends ApiBase implements IMailGunEmail {
  constructor(domain: string, sendingApiKey: string, user: string) {
    super(domain, sendingApiKey, user);
  }

  async sendEmail(data: EmailData): Promise<any> {
    const body = new FormData();
    body.append('from', data.from);
    body.append('to', data.to);
    body.append('subject', data.subject);
    body.append('html', data.htmlContent);

    this.setAuthHeader();
    this.setMultipartHeader(body);

    return this.post('messages', body);
  }
}
