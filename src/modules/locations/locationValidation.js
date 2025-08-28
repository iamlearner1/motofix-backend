import { body, query } from 'express-validator';

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const createLocationValidator = [
  body('name').trim().notEmpty().withMessage('Location name is required'),
  body('address').trim().notEmpty().withMessage('Address is required'),
  body('openingTime').matches(timeRegex).withMessage('Opening time must be in HH:MM format'),
  body('closingTime').matches(timeRegex).withMessage('Closing time must be in HH:MM format'),
  body('slotDurationMinutes').isInt({ min: 15 }).withMessage('Slot duration must be a number of at least 15 minutes'),
  body('offeredServices').optional().isArray().withMessage('Offered services must be an array of IDs'),
  body('offeredServices.*').isMongoId().withMessage('Each service must be a valid Mongo ID'),
];

export const getSlotsValidator = [
  query('locationId').isMongoId().withMessage('A valid location ID is required'),
  query('date').isISO8601().toDate().withMessage('A valid date in YYYY-MM-DD format is required'),
];