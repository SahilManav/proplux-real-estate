import express from 'express';
import {
  bookVisit,
  getMyBookings,
  getAllBookings,
  cancelBooking, // ✅ NEW
} from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:id', protect, bookVisit);         // POST /api/bookings/:id → Book a visit
router.get('/my', protect, getMyBookings);       // GET /api/bookings/my → User's bookings
router.get('/', protect, getAllBookings);        // GET /api/bookings → Admin only
router.delete('/:id', protect, cancelBooking);   // ✅ DELETE /api/bookings/:id → Cancel booking

export default router;
