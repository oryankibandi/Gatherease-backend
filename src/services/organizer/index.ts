import OrganizerAuthService from './auth';
import { createInjector } from 'typed-inject';
import { organizerRepo, verifyRepo, profileRepo, tokenRepo } from '../../adapters/repositories';
import { jwtGenerator, hashGenerator, codeGenerator } from '../../utils';

const organizerAuthServiceInjector = createInjector()
  .provideValue('organizerRepo', organizerRepo)
  .provideValue('verifyRepo', verifyRepo)
  .provideValue('profileRepo', profileRepo)
  .provideValue('tokenRepo', tokenRepo)
  .provideValue('jwtGeneratorService', jwtGenerator)
  .provideValue('hashGeneratorService', hashGenerator)
  .provideValue('codeGeneratorService', codeGenerator);

const organizerAuthService = organizerAuthServiceInjector.injectClass(OrganizerAuthService);

export { organizerAuthService };
