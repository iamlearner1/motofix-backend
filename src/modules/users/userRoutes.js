import { Router } from 'express';
import { userController } from './userController.js';
import { verifyJWT, authorizeRoles } from '../../middleware/authMiddleware.js';
import {updateUserValidator} from './userValidation.js'
import { validate } from '../../middleware/validateMiddleware.js';
const router = Router();

// All routes in this file are protected by JWT
router.use(verifyJWT);
router.route('/me')
  .get(userController.getCurrentUser)
  // --- ADD THIS NEW METHOD ---
  .patch(updateUserValidator, validate, userController.updateCurrentUser);
router.get('/', authorizeRoles('manager'), userController.getAllUsers);
router.post('/staff', authorizeRoles('manager'), userController.createStaffMember);

export default router;