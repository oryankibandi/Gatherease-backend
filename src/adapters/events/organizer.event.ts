import { EventSubscriber, On } from 'event-dispatch';
import { smsNotificationService, emailNotificationService } from '../notification';
import { OnOrganizerConfirmationInput, onOrganizerRegistrationInput } from './types/types';
import logger from '../../startup/logging';

@EventSubscriber()
export default class OrganizerEventSubscriber {
  smsNotificationService = smsNotificationService;
  emailNotificationService = emailNotificationService;

  @On('onOrganizerRegistration')
  async onOrganizerRegistration(data: onOrganizerRegistrationInput) {
    this.smsNotificationService.sendVerificationSMS({
      name: data.user.firstName,
      recepientPhone: data.user.phone,
      code: data.code,
    });
    this.emailNotificationService.sendConfirmation(data.code, data.user);
  }

  @On('onOrganizerConfirmation')
  async onUserConfirmation(data: OnOrganizerConfirmationInput) {
    this.smsNotificationService.sendOrganizerWelcomeSms({ organizer: data.organizer });
    this.emailNotificationService.sendWelcomeEmail(data.organizer);
  }
}
