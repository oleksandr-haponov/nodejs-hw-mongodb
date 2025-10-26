import { Contact } from '../db/models/contactModel.js';

export const getAllContacts = async () => {
  const contacts = await Contact.find().sort({ createdAt: -1 }).lean();
  return contacts;
};

export const getContactById = async (id) => {
  const contact = await Contact.findById(id).lean();
  return contact;
};

