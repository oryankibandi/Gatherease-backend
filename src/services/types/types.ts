export interface UserRegistrationInput {
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  phone: string;
  password: string;
}

export interface UserAuthenticationInput {
  email: string;
  phone?: string;
  password: string;
}

export interface UserConfirmationInput {
  code: string;
  phone: string;
}
