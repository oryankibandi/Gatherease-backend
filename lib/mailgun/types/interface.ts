import { EmailData } from './types';

export interface IMailGunEmail {
  sendEmail(data: EmailData): Promise<any>;
}
