import Booking from '../models/Booking.js';
import Property from '../models/Property.js';

// Book a visit
export const bookVisit = async (req, res) => {
  try {
    const { visitDate, message } = req.body;

    if (!visitDate) {
      return res.status(400).json({ message: "Visit date is required" });
    }

    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const booking = await Booking.create({
      user: req.user._id,
      property: property._id,
      visitDate,
      message,
      status: "confirmed",
    });

    // 🔥 Email intentionally disabled (causing Render hang)
    // Will be re-added later via background job / queue

    return res.status(201).json({
      message: "Booking successful",
      booking,
    });

  } catch (err) {
    console.error("Booking Error:", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Get user's bookings
export const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({
    user: req.user._id,
    status: "confirmed",
  }).populate("property");

  res.json(bookings);
};

// Cancel booking
export const cancelBooking = async (req, res) => {
  const booking = await Booking.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  booking.status = "cancelled";
  await booking.save();

  res.json({ message: "Booking cancelled successfully" });
};

// Admin: all bookings
export const getAllBookings = async (req, res) => {
  const bookings = await Booking.find()
    .populate("user")
    .populate("property");

  res.json(bookings);
};
