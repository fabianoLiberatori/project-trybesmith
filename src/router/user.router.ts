import { Router } from 'express';
import userController from '../controller/user.controller';
import inputUserValid from '../middleware/user.middleware';

const userRouter = Router();

userRouter
  .get('/users', userController.getAllUsers)
  .post('/login', inputUserValid, userController.login);

export default userRouter;