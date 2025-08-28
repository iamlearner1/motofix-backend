import { body } from 'express-validator';

export const addPredefinedVehicleValidator = [
  body('brand').trim().notEmpty().withMessage('Brand is required'),
  body('model').trim().notEmpty().withMessage('Model is required'),
];

export const addUserVehicleValidator = [
  body('predefinedVehicleId').isMongoId().withMessage('A valid vehicle model ID is required'),
  body('registrationNumber').trim().notEmpty().withMessage('Registration number is required'),
];