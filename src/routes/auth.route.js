import { Router } from 'express';
import pollControllers from '../controllers/event.controllers.js';
import validateMiddleware from '../middleware/validate.middleware.js';
import AuthController from '../controllers/authControllers.js';

const router = Router();

router.post('/auth/register', validateMiddleware.validateUser,AuthController.Register);
router.post('/auth/login',validateMiddleware.validateLogin, AuthController.Login);

router.post('/auth/forgot-password',validateMiddleware.validateEmail, AuthController.forgotPassword);
router.post('/auth/reset-password',validateMiddleware.validateResetPassword, AuthController.resetPassword);

router.post('/users', validateMiddleware.authenticate, validateMiddleware.isAdmin, AuthController.createUser);
router.get('/users', validateMiddleware.authenticate, validateMiddleware.isAdmin, AuthController.getAllUsers);
router.delete('/users/:id', validateMiddleware.authenticate,validateMiddleware.isAdmin, validateMiddleware.validateId,AuthController.deleteUser);

export default router;