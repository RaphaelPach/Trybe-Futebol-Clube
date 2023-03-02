import * as joi from 'joi';

export const emailSchema = joi.string().email().required();
export const passwordSchema = joi.string().min(6).required();
