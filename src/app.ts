import express from 'express';
import productRouter from './router/Product.router';
import userRouter from './router/user.router';

const app = express();

app.use(express.json());

app.use(productRouter);
app.use(userRouter);

app.get('/test', (_req, res) => res.status(200).json({
  message: 'teste ok',
}));

export default app;
