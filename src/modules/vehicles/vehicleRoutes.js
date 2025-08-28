import { Router } from 'express';
import { vehicleController } from './vehicleController.js';
import { verifyJWT, authorizeRoles } from '../../middleware/authMiddleware.js';
import { validate } from '../../middleware/validateMiddleware.js';
import { addPredefinedVehicleValidator, addUserVehicleValidator } from './vehicleValidation.js';

const router = Router();

// All routes are protected
router.use(verifyJWT);

// Routes for managing the master list of vehicles
router.route('/predefined')
  .post(authorizeRoles('manager'), addPredefinedVehicleValidator, validate, vehicleController.addPredefinedVehicle)
  .get(vehicleController.getPredefinedVehicles); // Any logged-in user can see the list

// Routes for managing a user's own vehicles in their "garage"
router.route('/')
  .post(authorizeRoles('user'), addUserVehicleValidator, validate, vehicleController.addUserVehicle)
  .get(authorizeRoles('user'), vehicleController.getUserVehicles);

export default router;