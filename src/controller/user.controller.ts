import { Request, Response } from 'express';
import httpMap from '../utils/httpMapper';
import userService from '../service/user.service';

const getAllUsers = async (_req: Request, res: Response): Promise<Response> => {
  const { status, data } = await userService.getAllUsers();
  return res.status(httpMap[status]).json(data);
};

export default {
  getAllUsers,
};