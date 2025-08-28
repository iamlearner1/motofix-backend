import { body } from 'express-validator';

export const createServiceValidator = [
  body('name').trim().notEmpty().withMessage('Service name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
];