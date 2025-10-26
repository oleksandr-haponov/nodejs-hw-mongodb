import { Contact } from '../db/models/contactModel.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = SORT_ORDER.ASC,
  contactType,
  isFavourite,
}) => {
  const skip = (page - 1) * perPage;
  const limit = perPage;

  const filter = {};
  if (contactType) filter.contactType = contactType;
  if (isFavourite !== undefined) filter.isFavourite = isFavourite === 'true';

  const contactsQuery = Contact.find(filter).sort({ [sortBy]: sortOrder });

  const totalItems = await Contact.find().merge(contactsQuery).countDocuments();

  const contacts = await contactsQuery.skip(skip).limit(limit).exec();

  const paginationData = calculatePaginationData(totalItems, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (id) => await Contact.findById(id).lean();

export const createContact = async (contactData) =>
  await Contact.create(contactData);

export const updateContactById = async (contactId, updateData) =>
  await Contact.findByIdAndUpdate(contactId, updateData, { new: true });

export const deleteContactById = async (contactId) =>
  await Contact.findByIdAndDelete(contactId);
