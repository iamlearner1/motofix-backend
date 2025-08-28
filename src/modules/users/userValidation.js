import { body } from 'express-validator';
import { User } from './userModel.js';

export const createStaffValidator = [
  body('name').trim().notEmpty().withMessage('Staff name is required'),
  body('email')
    .isEmail().withMessage('Please provide a valid email address for the staff member')
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        return Promise.reject('A user with this email already exists');
      }
    }),
  body('password').isLength({ min: 6 }).withMessage('Temporary password must be at least 6 characters long'),
  body('location').isMongoId().withMessage('A valid location ID must be provided to assign the staff member'),
];