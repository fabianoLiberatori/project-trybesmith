import { Model } from 'sequelize/types/model';
import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';
import { CreateProductType } from '../types/CreateProduct';
import { Product } from '../types/Product';
import inputProductValid from '../middleware/product.middleware';

const createProduct = async (dataBody: Product): Promise<CreateProductType> => {
  const isAllValid = await inputProductValid(dataBody);
  if (isAllValid) {
    return isAllValid;
  }
  const { dataValues } = await ProductModel.create(dataBody);
  return {
    status: 'CREATED',
    data: dataValues,
  };
};

const getallProducts = async (): Promise<{
  status: string; data: Model<Product, ProductInputtableTypes>[]; }> => {
  const allProducts = await ProductModel.findAll();
  return {
    status: 'OK',
    data: allProducts,
  };
};

export default {
  createProduct,
  getallProducts,
};