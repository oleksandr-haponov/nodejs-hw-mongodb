import { Contact } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = SORT_ORDER.ASC,
  contactType,
  isFavourite,
  userId,
}) => {
  const skip = (page - 1) * perPage;
  const limit = perPage;

  const filter = { userId };
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

export const getContactById = async (id, userId) =>
  await Contact.findById({ _id: id, userId }).lean();

export const createContact = async (contactData) =>
  await Contact.create(contactData);

export const updateContactById = async (contactId, updateData, userId) =>
  await Contact.findByIdAndUpdate({ _id: contactId, userId }, updateData, {
    new: true,
  });

export const deleteContactById = async (contactId, userId) =>
  await Contact.findByIdAndDelete({ _id: contactId, userId });
