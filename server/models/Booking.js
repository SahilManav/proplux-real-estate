import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true,
  },
  visitDate: {
    type: Date,
    required: true,
  },
  message: String,
  status: {
    type: String,
    enum: ['active', 'cancelled', 'confirmed'], // <-- add 'confirmed'
    default: 'active',
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
