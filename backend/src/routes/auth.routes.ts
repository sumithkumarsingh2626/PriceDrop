import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';
import { UserRoles } from '../constants';
import { authenticate } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/role.middleware';
import { validate } from '../middlewares/validate.middleware';
import {
  loginSchema,
  refreshBodySchema,
  registerSchema,
  verifyOtpSchema,
} from '../validators/auth.validator';

const router = Router();

router.post('/register', validate({ body: registerSchema }), AuthController.register);
router.post('/login', validate({ body: loginSchema }), AuthController.login);
router.post('/verify-otp', validate({ body: verifyOtpSchema }), AuthController.verifyOtp);
router.post('/logout', authenticate, AuthController.logout);
router.post('/refresh-token', validate({ body: refreshBodySchema }), AuthController.refreshTokens);
router.post('/refresh', validate({ body: refreshBodySchema }), AuthController.refreshTokens);
router.get('/me', authenticate, AuthController.getMe);
router.get('/admin/ping', authenticate, authorizeRoles(UserRoles.ADMIN), AuthController.adminPing);

export default router;
