import joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const nameRequired = joi.object({
  name: joi.string().required().min(3),
  price: joi.string().required(),
  userId: joi.number().required(),
});

const inputProductValid = (req: Request, res: Response, next: NextFunction): Response | void => {
  const nameIsValid = nameRequired.validate(req.body);
  if (nameIsValid.error) {
    if (nameIsValid.error?.message.includes('required')) {
      return res.status(400).json({
        message: nameIsValid.error.message,
      });
    }
    if (!(nameIsValid.error?.message.includes('required'))) {
      return res.status(422).json({
        message: nameIsValid.error?.message,
      });
    }
  }

  next();
};
  
export default inputProductValid;