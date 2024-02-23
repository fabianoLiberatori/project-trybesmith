import UserModel from '../database/models/user.model';
import { Product } from '../types/Product';

const isHaveInput = (product: Product): {
  status: string; data: { message: string; }; } | undefined => {
  if (!product.name) {
    return { status: 'BAD_REQUEST',
      data: { message: '"name" is required' },
    };
  }
  if (!product.price) {
    return { status: 'BAD_REQUEST',
      data: { message: '"price" is required' },
    };
  }
  if (!product.userId) {
    return { status: 'BAD_REQUEST',
      data: { message: '"userId" is required' },
    };
  }
  return undefined;
};

const isSameTypeOf = (product: Product): {
  status: string; data: { message: string; }; } | undefined => {
  if (typeof product.name !== 'string') {
    return { status: 'UNPROCESSABLE_CONTENT',
      data: { message: '"name" must be a string' },
    };
  }
  if (typeof product.price !== 'string') {
    return { status: 'UNPROCESSABLE_CONTENT',
      data: { message: '"price" must be a string' },
    };
  }
  if (typeof product.userId !== 'number') {
    return { status: 'UNPROCESSABLE_CONTENT',
      data: { message: '"userId" must be a number' },
    };
  }
  return undefined;
};

const haveLength = (product: Product): {
  status: string; data: { message: string; }; } | undefined => {
  if (product.name.length < 3) {
    return { status: 'UNPROCESSABLE_CONTENT',
      data: { message: '"name" length must be at least 3 characters long' },
    };
  }
  if (product.price.length < 3) {
    return { status: 'UNPROCESSABLE_CONTENT',
      data: { message: '"price" length must be at least 3 characters long' },
    };
  }
  return undefined;
};

const inputProductValid = async (product: Product): Promise<{
  status: string; data: { message: string; }; } | undefined> => {
  if (isHaveInput(product)) {
    return isHaveInput(product);
  }
  if (isSameTypeOf(product)) {
    return isSameTypeOf(product);
  }
  if (haveLength(product)) {
    return haveLength(product);
  }
  const isUser = await UserModel.findByPk(product.userId);
  if (!isUser) {
    return {
      status: 'UNPROCESSABLE_CONTENT',
      data: { message: '"userId" not found' },
    };
  }
  return undefined;
};

export default inputProductValid;