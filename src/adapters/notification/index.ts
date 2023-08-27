import { createInjector } from 'typed-inject';
import SMSNotification from './sms.notification';
import EmailNotification from './email.notification';
import { twilioSmsService } from '../../../lib/twilio';
import { mailgunEmailService } from '../../../lib/mailgun';

const smsNotificationInjector = createInjector().provideValue('twilioSmsService', twilioSmsService);
const emailNotificationInjector = createInjector().provideValue('mailgunEmailService', mailgunEmailService);

const smsNotificationService = smsNotificationInjector.injectClass(SMSNotification);
const emailNotificationService = emailNotificationInjector.injectClass(EmailNotification);

export { smsNotificationService, emailNotificationService };
