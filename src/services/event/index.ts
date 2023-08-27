import EventService from './event';
import ImageService from './images';
import { createInjector } from 'typed-inject';
import { eventRepo, guestRepo, imageRepo } from '../../adapters/repositories';
import { cloudinaryImageService } from '../../../lib/cloudinary';
import { codeGenerator } from '../../utils';
import { organizerProfileService } from '../organizer';

const eventServiceInjector = createInjector()
  .provideValue('eventRepo', eventRepo)
  .provideValue('guestRepo', guestRepo)
  .provideValue('codeGenerator', codeGenerator)
  .provideValue('organizerProfileService', organizerProfileService);
const imageServiceInjector = createInjector()
  .provideValue('imageRepo', imageRepo)
  .provideValue('codeGenerator', codeGenerator)
  .provideValue('cloudinaryImageService', cloudinaryImageService);

const eventService = eventServiceInjector.injectClass(EventService);

const imageService = imageServiceInjector.injectClass(ImageService);

export { eventService, imageService };
