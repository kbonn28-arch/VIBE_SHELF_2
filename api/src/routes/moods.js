import express from 'express';
import {
  getMoods,
  getRecommendations,
} from '../controllers/moods.js';
import { authenticateUser } from '../middleware/auth.js';
import { validateRequest, schemas } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/', getMoods);

// Protected routes
router.post('/recommendations', authenticateUser, validateRequest(schemas.recommendation), getRecommendations);

export default router;
