import { Router } from 'express';
import { locationController } from './locationController.js';
import { verifyJWT, authorizeRoles } from '../../middleware/authMiddleware.js';
import { validate } from '../../middleware/validateMiddleware.js';
import { createLocationValidator, getSlotsValidator } from './locationValidation.js';

const router = Router();

// All routes require a logged-in user
router.use(verifyJWT);

// Create a new location (Manager only)
router.post('/', authorizeRoles('manager'), createLocationValidator, validate, locationController.createLocation);

// Get all locations (Any logged-in user)
router.get('/', locationController.getAllLocations);

// Get available slots for a specific location and date
router.get('/slots', getSlotsValidator, validate, locationController.getAvailableSlots);

export default router;