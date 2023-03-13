export class ServiceError extends Error {}

export class UserExistsError extends ServiceError {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class UserNotFound extends ServiceError {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class VerificationNotFound extends ServiceError {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class InvalidCode extends ServiceError {
  constructor(message: string) {
    super();
    this.message = message;
  }
}
