import express from 'express';
import { getContactsController } from '../controllers/contactsController.js';
import { getContactByIdController } from '../controllers/contactsController.js';

const contactsRouter = express.Router();

contactsRouter.get('/', getContactsController);
contactsRouter.get('/:contactId', getContactByIdController);

export default contactsRouter;