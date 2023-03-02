import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

interface JWTPayload {
  id?: number;
  username: string;
  email?: string;
  role?: string;

}

export default function createTokenJWT(payload: JWTPayload) {
  const config: jwt.SignOptions = {
    expiresIn: '3d',
    algorithm: 'HS256',
  };
  const token = jwt.sign(payload, secret as string, config);
  return token;
}
