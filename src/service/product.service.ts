import ProductModel from '../database/models/product.model';
import { CreateProductType } from '../types/CreateProduct';
import { Product } from '../types/Product';

const createProduct = async (dataBody: Product): Promise<CreateProductType> => {
  const { dataValues } = await ProductModel.create(dataBody);
  return {
    status: 'CREATED',
    data: dataValues,
  };
};

export default {
  createProduct,
};