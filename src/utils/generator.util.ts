import { randomInt } from 'crypto';
import { ICodeGenerator } from './types/interfaces';
import appConfig from '../config';

export class CodeGenerator implements ICodeGenerator {
  phoneCodeLength = appConfig.app.VERIFICATION_CODE_LENGTH;
  generatePhoneVerificationCode(): string {
    let code = '';
    while (code.length < parseInt(this.phoneCodeLength)) {
      code += randomInt(3).toString();
    }

    return code;
  }
}
