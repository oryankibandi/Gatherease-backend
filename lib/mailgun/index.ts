import appConfig from '../../src/config';
import Email from './sendemail.mailgun';

const mailgunDomain = appConfig.mailgun.MAILGUN_DOMAIN;
const sendingApiKey = appConfig.mailgun.GATHEREASE_SENDING_APIKEY;
const user = appConfig.mailgun.MAILGUN_USER;

const mailgunEmailService = new Email(mailgunDomain, sendingApiKey, user);

export { mailgunEmailService };
