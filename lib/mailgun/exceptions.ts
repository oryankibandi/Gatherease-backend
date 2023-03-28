export class MailGunError extends Error {
  message: string;
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class MailGunBadRequest extends MailGunError {
  constructor(message: string) {
    super(message);
  }
}

export class MailGunUnauthorized extends MailGunError {
  constructor(message: string) {
    super(message);
  }
}

export class MailGunRequestFail extends MailGunError {
  constructor(message: string) {
    super(message);
  }
}

export class MailGunNotFound extends MailGunError {
  constructor(message: string) {
    super(message);
  }
}

export class MailGunEntityTooLarge extends MailGunError {
  constructor(message: string) {
    super(message);
  }
}

export class MailGunNTooManyRequests extends MailGunError {
  constructor(message: string) {
    super(message);
  }
}

export class MailGunServerError extends MailGunError {
  constructor(message: string) {
    super(message);
  }
}

export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
  }
}
