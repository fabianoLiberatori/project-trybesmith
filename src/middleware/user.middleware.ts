import joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const inputLogin = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
});

const inputUserValid = (req: Request, res: Response, next: NextFunction): Response | void => {
  const inputError = inputLogin.validate(req.body);

  if (inputError.error) {
    return res.status(400).json({
      message: '"username" and "password" are required',
    });
  }
  next();
};

export default inputUserValid;