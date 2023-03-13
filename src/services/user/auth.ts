import { IUserRepository, IVerify } from '../../adapters/repositories/types/interfaces';
import { ICodeGenerator, IHashGenerator, IJwtGenerator } from '../../utils/types/interfaces';
import { UserConfirmationInput, UserRegistrationInput } from '../types/types';
import { User } from '@prisma/client';
import { InvalidCode, UserAlreadyVerified, UserExistsError, UserNotFound, VerificationNotFound } from '../exceptions';
import eventDispatcher from '../../adapters/events';

export class UserAuthService {
  public static inject = [
    'jwtGeneratorService',
    'userRepo',
    'hashGeneratorService',
    'verifyRepo',
    'codeGeneratorService',
  ] as const;

  constructor(
    private readonly jwtGeneratorService: IJwtGenerator,
    private readonly userRepo: IUserRepository,
    private readonly hashGeneratorService: IHashGenerator,
    private readonly verifyRepo: IVerify,
    private readonly codeGeneratorService: ICodeGenerator
  ) {}

  async registerUser(data: UserRegistrationInput): Promise<User> {
    // check existing user
    const existingUserEmail = await this.userRepo.getUserByEmail(data.email);
    const existingUserPhone = await this.userRepo.getUserByEmail(data.email);

    if (existingUserEmail) throw new UserExistsError(`Email ${data.email} is already registered`);
    if (existingUserPhone) throw new UserExistsError(`Email ${data.phone} is already registered`);

    // hash password

    const password = await this.hashGeneratorService.hashPassword(data.password);

    // create user in DB
    const newUser = await this.userRepo.createUser({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      fullName: `${data.firstName} ${data.lastName}`,
      phone: data.phone,
      password,
    });

    // Generate code and store in DB
    const verificationCode = this.codeGeneratorService.generatePhoneVerificationCode();

    // store verification code in DB
    await this.verifyRepo.createVerification({ code: verificationCode, ownerId: newUser.id });

    // send verification code
    eventDispatcher.dispatch('onUserRegistration', { user: newUser, code: verificationCode });

    return newUser;
  }

  async userConfirmation(data: UserConfirmationInput) {
    // retrieve user

    const existingUser = await this.userRepo.getUserByPhone(data.phone);
    if (!existingUser) throw new UserNotFound(`Phone number ${data.phone} is not registered`);

    if (existingUser.isVerified) throw new UserAlreadyVerified('User is already verified');

    const verify = await this.verifyRepo.getVerification(existingUser.id);
    if (!verify) throw new VerificationNotFound('Verification code not found');

    if (verify.code !== data.code) {
      throw new InvalidCode('Invalid code');
    }
    // delete code and mark user as verified
    await this.verifyRepo.deleteVerfication(existingUser.id);

    await this.userRepo.updateVerificationStatus(existingUser.id, true);

    eventDispatcher.dispatch('onUserConfirmation', { user: existingUser });

    return true;
  }
}
