import { Router } from 'express';
import { bookingController } from './bookingController.js';
import { verifyJWT, authorizeRoles } from '../../middleware/authMiddleware.js';
import { validate } from '../../middleware/validateMiddleware.js';
import { createBookingValidator, updateStatusValidator } from './bookingValidation.js';

const router = Router();

// All booking routes require a logged-in user
router.use(verifyJWT);

// User creates a booking or gets their history
router.route('/')
  .post(authorizeRoles('user'), createBookingValidator, validate, bookingController.createBooking)
  .get(authorizeRoles('user'), bookingController.getUserHistory);

// Staff/Manager gets all bookings for a specific location
router.get('/location/:locationId', authorizeRoles('staff', 'manager'), bookingController.getLocationBookings);

// Staff/Manager updates the status of a booking
router.patch('/:bookingId/status', authorizeRoles('staff', 'manager'), updateStatusValidator, validate, bookingController.updateBookingStatus);
router.get('/all', verifyJWT, authorizeRoles('manager'), bookingController.getAllBookings);
export default router;