import { Request, Response, NextFunction } from 'express';
import JwtUtils from '../utils/Jwt.utils';

const authToken = (req: Request, res: Response, next: NextFunction): Response | void => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).send('Token not Found');
  const token = authorization.split(' ')[1];
    
  try {
    const decoded = JwtUtils.verify(token);
    res.locals = decoded;
    return next();
  } catch (err) {
    const tokenErro = err as Error;
    return res.status(500).json(tokenErro.message);
  }
};

export default authToken;