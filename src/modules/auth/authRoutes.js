import { Router } from 'express';
import { authController } from './authController.js';
import { registerValidator, loginValidator } from './authValidation.js';
import { validate } from '../../middleware/validateMiddleware.js';

const router = Router();

router.post('/register', registerValidator, validate, authController.register);
router.post('/login', loginValidator, validate, authController.login);

export default router;