import Jwt from 'jsonwebtoken';
import UserTokenPayload from '../types/UserTokenPayload';

const JWT_SECRET = process.env.JWT_SECRET || '123456';

const sign = (payload: UserTokenPayload): string =>
  Jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });

const verify = (token: string): UserTokenPayload => 
  Jwt.verify(token, JWT_SECRET) as UserTokenPayload;

export default {
  sign,
  verify,
};