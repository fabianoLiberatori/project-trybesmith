import bcrypt from 'bcryptjs';
import ProductModel from '../database/models/product.model';
import UserModel from '../database/models/user.model';
import JwtUtils from '../utils/Jwt.utils';

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

const login = async (username: string, password: string): Promise<{
  status: string; data: { message: string; } | { token: string }; }> => {
  const findLogin = await UserModel.findOne({ where: { username: [username] } });

  if (!findLogin) {
    return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
  }

  const { dataValues } = findLogin;
  console.log(dataValues);
  const isValid = bcrypt.compareSync(password, dataValues.password);

  if (!isValid) {
    return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
  }

  const payload = { id: findLogin.dataValues.id };
  const token = JwtUtils.sign(payload);

  return {
    status: 'OK',
    data: { token } };
};

export default {
  getAllUsers,
  login,
};