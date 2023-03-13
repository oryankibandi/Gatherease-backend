import { createInjector } from 'typed-inject';
import { UserAuthService } from './auth';
import { jwtGenerator, codeGenerator, hashGenerator } from '../../utils';
import { userRepo, verifyRepo } from '../../adapters/repositories';

const userAuthServiceInjector = createInjector()
  .provideValue('jwtGeneratorService', jwtGenerator)
  .provideValue('hashGeneratorService', hashGenerator)
  .provideValue('codeGeneratorService', codeGenerator)
  .provideValue('verifyRepo', verifyRepo)
  .provideValue('userRepo', userRepo);

const userAuthService = userAuthServiceInjector.injectClass(UserAuthService);

export { userAuthService };
