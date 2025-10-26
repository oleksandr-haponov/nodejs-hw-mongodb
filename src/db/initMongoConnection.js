import mongoose from 'mongoose';
import logger from '../utils/logger.js';

export const initMongoConnection = async () => {
  const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } = process.env;

  const missingVars = [
    !MONGODB_USER && 'MONGODB_USER',
    !MONGODB_PASSWORD && 'MONGODB_PASSWORD',
    !MONGODB_URL && 'MONGODB_URL',
    !MONGODB_DB && 'MONGODB_DB',
  ].filter(Boolean);

  if (missingVars.length > 0) {
    logger.error(`🔴 Missing environment variables: ${missingVars.join(', ')}`);
    process.exit(1);
  }

  const URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority&appName=Cluster0`;

  try {
    await mongoose.connect(URI);
    logger.info('✅ Mongo connection successfully established!');
  } catch (error) {
    logger.error(`🔴 Mongo connection failed:\n${error.stack}`);
    process.exit(1);
  }

  mongoose.connection.on('connected', () => {
    logger.info('🔄 MongoDB reconnected.');
  });

  mongoose.connection.on('error', (err) => {
    logger.error(`🔴 MongoDB error:\n${err.stack}`);
  });

  mongoose.connection.on('disconnected', () => {
    logger.warn('⚠️ MongoDB disconnected.');
  });
};
