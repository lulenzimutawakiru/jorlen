import express from 'express';
import { authenticateToken, authorizeRole } from '../middleware/auth';
import * as authController from '../controllers/authController';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/profile', authenticateToken, authController.getProfile);
router.put('/profile', authenticateToken, authController.updateProfile);

router.get('/users/all', authenticateToken, authorizeRole(['administrator']), authController.getAllUsers);

export default router;
