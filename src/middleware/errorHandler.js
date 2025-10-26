export function notFoundHandler(req, res, next) {
  res.status(404).json({ message: 'Not Found', path: req.originalUrl });
}

export function errorHandler(err, req, res, next) {
  console.error(err && err.stack ? err.stack : err);
  const status = err.status || 500;
  const payload = { message: err.message || 'Internal Server Error', status };
  if (process.env.NODE_ENV !== 'production' && err.details) payload.details = err.details;
  res.status(status).json(payload);
}
