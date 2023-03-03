import { Request, Response, NextFunction } from 'express';
import CustomError from '../Error/CustomError';
import { decodeToken } from '../Utils/jwt';

const token = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) throw new CustomError('Token not found', '401');

  const tokenDecode = decodeToken(authorization);
  if (!tokenDecode) throw new CustomError('Token must be a valid token', '401');

  next();
};

export default token;
