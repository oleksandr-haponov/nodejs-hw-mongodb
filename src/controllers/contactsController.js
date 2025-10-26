import { getAllContacts, getContactById } from '../services/contacts.js';

export const getContactsController = async (req, res, next) => {
  try {
    const contacts = await getAllContacts();

    if (contacts.length === 0) {
      return res.status(404).json({
        status: 404,
        message: 'No contacts found.',
        data: [],
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    console.error('❌ Database error:', error.message);
    res.status(500).json({
      status: 500,
      message: 'Internal server error.',
      data: null,
    });
  }
};

export const getContactByIdController = async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      return res.status(404).json({
        status: 404,
        message: 'Contact not found.',
        data: null,
      });
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    console.error('🔴 Contact controller error:', error.message);
    res.status(500).json({
      status: 500,
      message: 'Failed to retrieve contact.',
      data: null,
    });
  }
};
