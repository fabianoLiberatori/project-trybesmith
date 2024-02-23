import { Router } from 'express';
import productController from '../controller/product.controller';

const productRouter = Router();

productRouter
  .get('/products', productController.getallProducts)
  .post('/products', productController.createProduct);

export default productRouter;