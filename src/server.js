import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import logger from './utils/logger.js';
import contactsRouter from './routes/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(pinoHttp({ logger }));

  //* temp
  app.get('/', (req, res) => {
    res.redirect(307, '/api');
  });
  app.get('/contacts', (req, res) => {
    res.redirect(307, '/api/contacts');
  });

  app.get('/api', (req, res) => {
    res.json({
      message: 'Hi there!',
    });
  });

  app.use('/api/contacts', contactsRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    logger.info(`🟢 Server is running on port ${PORT}`);
  });
};

