import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import cookieParser from 'cookie-parser';
import logger from './utils/logger.js';
import router from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use(pinoHttp({ logger }));

  //* temp
  app.get('/contacts', (req, res) => {
    res.redirect(307, '/api/contacts');
  });
  app.get('/', (req, res) => {
    res.redirect(307, '/api');
  });

  app.get('/api', (req, res) => {
    res.json({
      message: 'Hi there!',
    });
  });

  app.use('/api', router);
  app.use(notFoundHandler);
  app.use(errorHandler);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    logger.info(`🟢 Server is running on port ${PORT}`);
  });
};
