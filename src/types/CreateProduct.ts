import { Product } from './Product';

export type Messagetype = {
  message: string,
};
  
export type CreateProductType = {
  status: string;
  data: Messagetype | Product;
};

export type GetProductsType = {
  status: string;
  data: Messagetype | Product;
};