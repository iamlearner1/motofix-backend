import { ApiError } from '../utils/apiError.js';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue);
    const message = `Duplicate field value entered: ${field}. Please use another value.`;
    return res.status(409).json({ success: false, message });
  }

  console.error('ERROR 💥:', err);
  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
};