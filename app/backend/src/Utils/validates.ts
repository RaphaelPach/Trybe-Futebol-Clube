import { emailSchema, passwordSchema } from './schema';
import CustomError from '../Error/CustomError';

export const ValidEmail = (email: string) => {
  const { error } = emailSchema.validate(email);
  if (error) throw new CustomError('Invalid email or password', '401');
};

export const ValidPass = (password: string) => {
  const { error } = passwordSchema.validate(password);
  if (error) throw new CustomError('Invalid email or password', '401');
};
