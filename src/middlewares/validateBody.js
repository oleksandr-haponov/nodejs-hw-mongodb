import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    const message =err.details?.map((d) => d.message).join(', ') || '🔴 Invalid request body';
    next(createHttpError.BadRequest(message));
  }
};

