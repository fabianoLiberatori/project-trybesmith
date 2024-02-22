import ProductModel from '../database/models/product.model';
import UserModel from '../database/models/user.model';

const getAllUsers = async (): Promise<{
  status: string; data: { username: string; productIds: number[] | undefined; }[]; }> => {
  const getAll = await UserModel.findAll({ attributes: ['username'],
    include: [
      { model: ProductModel, as: 'productIds', attributes: ['id'] }],
  });
  const allDataValues = getAll.map((user) => user.dataValues);
  
  const allUsers = allDataValues.map((user) => ({
    username: user.username,
    productIds: user.productIds?.map((prod) => prod.id) }));
  return {
    status: 'OK',
    data: allUsers,
  };
};

export default {
  getAllUsers,
};