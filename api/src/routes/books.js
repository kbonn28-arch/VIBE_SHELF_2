import express from 'express';
import {
  getBooks,
  getBookById,
  getUserBooks,
  addUserBook,
  updateUserBook,
  deleteUserBook,
} from '../controllers/books.js';
import { authenticateUser } from '../middleware/auth.js';
import { validateRequest, validateQuery, schemas } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/', validateQuery(schemas.bookQuery), getBooks);
router.get('/:id', getBookById);

// Protected routes
router.get('/user/my-books', authenticateUser, validateQuery(schemas.bookQuery), getUserBooks);
router.post('/user/my-books', authenticateUser, validateRequest(schemas.userBook), addUserBook);
router.put('/user/my-books/:id', authenticateUser, validateRequest(schemas.userBookUpdate), updateUserBook);
router.delete('/user/my-books/:id', authenticateUser, deleteUserBook);

export default router;
