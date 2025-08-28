import { Router } from 'express';
import { userController } from './userController.js';
import { verifyJWT, authorizeRoles } from '../../middleware/authMiddleware.js';

const router = Router();

// All routes in this file are protected by JWT
router.use(verifyJWT);

router.get('/me', userController.getCurrentUser);
router.get('/', authorizeRoles('manager'), userController.getAllUsers);
router.post('/staff', authorizeRoles('manager'), userController.createStaffMember);
export default router;