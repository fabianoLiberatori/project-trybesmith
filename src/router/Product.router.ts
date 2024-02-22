import { Router } from 'express';
import productController from '../controller/product.controller';
import inputProductValid from '../middleware/product.middleware';

const productRouter = Router();

productRouter
  .post('/products', inputProductValid, productController.createProduct)
  .get('/products', productController.getallProducts);

export default productRouter;