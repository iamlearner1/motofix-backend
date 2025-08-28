import { body } from 'express-validator';
import { User } from '../users/userModel.js';

export const registerValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email')
    .isEmail().withMessage('Please provide a valid email address')
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        return Promise.reject('E-mail already in use');
      }
    }),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

export const loginValidator = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];