import VenueService from './venue';
import { createInjector } from 'typed-inject';
import { venueRepo } from '../../adapters/repositories';

const venueServiceInjector = createInjector().provideValue('venueRepo', venueRepo);

const venueService = venueServiceInjector.injectClass(VenueService);

export { venueService };
