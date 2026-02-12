  import express from 'express';
  import {
    bookVisit,
    getMyBookings,
    getAllBookings,
    cancelBooking,
  } from '../controllers/bookingController.js';
  import { protect } from '../middleware/authMiddleware.js';

  const router = express.Router();

  router.post('/:id', protect, bookVisit);
  router.get('/my', protect, getMyBookings);
  router.get('/', protect, getAllBookings);
  router.delete('/:id', protect, cancelBooking);

  export default router;
