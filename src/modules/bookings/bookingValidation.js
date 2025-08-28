import { body, param } from 'express-validator';

export const createBookingValidator = [
  body('vehicle').isMongoId().withMessage('A valid vehicle ID is required'),
  body('location').isMongoId().withMessage('A valid location ID is required'),
  body('bookedServices').isArray({ min: 1 }).withMessage('At least one service must be selected'),
  body('bookedServices.*').isMongoId().withMessage('Each service must be a valid Mongo ID'),
  body('slotDate').isISO8601().toDate().withMessage('A valid date is required'),
  body('slotTime').matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Slot time must be in HH:MM format'),
  body('issueDescription').optional().trim().isString(),
];

export const updateStatusValidator = [
  param('bookingId').isMongoId().withMessage('A valid booking ID is required'),
  body('status').isIn(['Confirmed', 'In-Progress', 'Completed', 'Cancelled']).withMessage('Invalid status value'),
];