import { Request, Response } from 'express';
import httpMap from '../utils/httpMapper';
import productService from '../service/product.service';

const createProduct = async (req: Request, res: Response): Promise<Response> => {
  const { status, data } = await productService.createProduct(req.body);
  return res.status(httpMap[status]).json(data);
};

export default {
  createProduct,
};