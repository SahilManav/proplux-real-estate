import express from 'express';
import {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
} from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js'; // Import the auth middleware

const router = express.Router();

// @route   GET /api/reviews
// @desc    Get all reviews (or testimonials)
// @access  Public
router.get('/', getAllReviews);

// @route   GET /api/reviews/:id
// @desc    Get review by ID
// @access  Public
router.get('/:id', getReviewById);


// @route   POST /api/reviews
// @desc    Create a new review (or testimonial)
// @access  Private
router.post('/', protect, createReview);

// @route   PUT /api/reviews/:id
// @desc    Update a review (or testimonial)
// @access  Private
router.put('/:id', protect, updateReview);

// @route   DELETE /api/reviews/:id
// @desc    Delete a review (or testimonial)
// @access  Private
router.delete('/:id', protect, deleteReview);

export default router;
