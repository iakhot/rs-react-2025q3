export const NAME = /^name*/i;
export const AGE = /^age*/i;
export const EMAIL = /^email*/i;
export const PASSWORD = /^password*/i;
export const PASSWORDCONF = /^confirm password*/i;
export const GENDER = /^gender*/i;
export const PICTURE = /^picture*/i;
export const COUNTRY = /^country*/i;
export const ACCEPT = /^accept terms*/i;

export enum ValidationErrors {
  NAME_CAPITAL = 'Name must start with an uppercase letter',
  AGE_NUMBER = 'Age should be a number',
  AGE_POSITIVE = 'Age should be positive',
  EMAIL_FORMAT = 'Invalid email format',
  PASSWORD_MIN = 'Password should be at least 4 characters long',
  PASSWORD_UP_LETTER = 'Password should contain at least one uppercase letter',
  PASSWORD_LOW_LETTER = 'Password should contain at least one lowercase letter',
  PASSWORD_NUM = 'Password should contain at least one number',
  PASSWORD_SPEC = 'Password should contain at least one special character',
}
