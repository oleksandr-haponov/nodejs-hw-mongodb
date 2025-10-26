import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import logger from './utils/logger.js';
import contactsRouter from './routers/contactsRouter.js';

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

  app.use('/api/contacts', contactsRouter);

  app.use((req, res) => {
    req.log.warn(`Route not found: ${req.originalUrl}`);
    res.status(404).json({ message: 'Not found.' });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    logger.info(`🟢 Server is running on port ${PORT}`);
  });
};
