import { Router } from 'express';
import { serviceController } from './serviceController.js';
import { verifyJWT, authorizeRoles } from '../../middleware/authMiddleware.js';
import { validate } from '../../middleware/validateMiddleware.js';
import { createServiceValidator } from './serviceValidation.js';

const router = Router();

// Create a new service (Manager only)
router.post('/', verifyJWT, authorizeRoles('manager'), createServiceValidator, validate, serviceController.createService);

// Get all services (publicly available or for any logged-in user)
router.get('/', serviceController.getAllServices);

export default router;