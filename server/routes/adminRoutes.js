import express from 'express';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { getAllUserFavorites } from '../controllers/adminController.js';

const router = express.Router();

router.get('/favorites', protect, adminOnly, getAllUserFavorites);

export default router;
