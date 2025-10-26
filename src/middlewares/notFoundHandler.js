export const notFoundHandler = (req, res, next) => {
  req.log.warn(`🔴 Route not found: ${req.originalUrl}`);
  res.status(404).json({
    message: 'Route not found.',
  });
};
