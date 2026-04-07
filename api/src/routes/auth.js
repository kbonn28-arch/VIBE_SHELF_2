import express from 'express';
import {
  signIn,
  signUp,
  signOut,
  getCurrentUser,
} from '../controllers/auth.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/signin', signIn);
router.post('/signup', signUp);

// Protected routes
router.post('/signout', authenticateUser, signOut);
router.get('/me', authenticateUser, getCurrentUser);

export default router;
