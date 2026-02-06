import express from 'express';
import {
  addFavorite,
  removeFavorite,
  getUserFavorites,
} from '../controllers/favoriteController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:id', protect, addFavorite);       // Add property to favorites
router.delete('/:id', protect, removeFavorite);  // Remove from favorites
router.get('/', protect, getUserFavorites);      // Get user's favorite properties

export default router;
