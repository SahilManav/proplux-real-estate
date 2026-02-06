// server/controllers/bookingController.js
import Booking from '../models/Booking.js';
import Property from '../models/Property.js';
import { sendEmail } from '../utils/sendEmail.js';


// Book a visit and send confirmation email
export const bookVisit = async (req, res) => {
  try {
    const { visitDate, message } = req.body;
    const booking = await Booking.create({
      user: req.user._id,
      property: req.params.id,
      visitDate,
      message,
      status: 'confirmed',
    });

    const property = await Property.findById(req.params.id);

    await sendEmail({
      to: req.user.email,
      subject: 'Your PropLux Booking is Confirmed',
      html: `
        <h2>Booking Confirmation</h2>
        <p>You have successfully booked a visit to:</p>
        <ul>
          <li><strong>Property:</strong> ${property.title}</li>
          <li><strong>Location:</strong> ${property.city}, ${property.country}</li>
          <li><strong>Date:</strong> ${new Date(visitDate).toLocaleDateString()}</li>
        </ul>
        <p>Thank you for choosing PropLux!</p>
      `,
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error("Booking Error:", err.message);
    res.status(500).json({ message: "Booking failed" });
  }
};

// Get all bookings for a user
export const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id, status: 'confirmed' }).populate('property');
  res.json(bookings);
};

// Cancel a booking
export const cancelBooking = async (req, res) => {
  const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id });
  if (!booking) return res.status(400).json({ message: "Booking not found" });
  booking.status = 'cancelled';
  await booking.save();
  res.json({ message: "Booking cancelled successfully" });
};

// Admin: get all bookings
export const getAllBookings = async (req, res) => {
  const bookings = await Booking.find().populate('user').populate('property');
  res.json(bookings);
};
