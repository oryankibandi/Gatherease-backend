import { User } from '@prisma/client';
import { EventSubscriber, On } from 'event-dispatch';
import { smsNotificationService, emailNotificationService } from '../notification';
import { OnUserConfirmationInput, OnUserRegistrationInput, onOrganizerRegistrationInput } from './types/types';

@EventSubscriber()
export default class UserEventSubscriber {
  smsNotificationService = smsNotificationService;
  emailNotificationService = emailNotificationService;
  @On('onUserRegistration')
  async onUserRegistration(data: OnUserRegistrationInput) {
    this.smsNotificationService.sendVerificationSMS({
      name: data.user.firstName,
      recepientPhone: data.user.phone,
      code: data.code,
    });
    this.emailNotificationService.sendConfirmation(data.code, data.user);
  }

  @On('onUserConfirmation')
  async onUserConfirmation(data: OnUserConfirmationInput) {
    this.smsNotificationService.sendWelcomeSms({ user: data.user });
    this.emailNotificationService.sendWelcomeEmail(data.user);
  }
}
