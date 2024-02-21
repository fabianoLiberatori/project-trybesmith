import express from 'express';

const app = express();

app.use(express.json());

app.get('/test', (_req, res) => res.status(200).json({
  message: 'teste ok',
}));

export default app;
