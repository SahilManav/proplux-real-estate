import Booking from '../models/Booking.js';
import Property from '../models/Property.js';
import { sendEmail } from '../utils/sendEmail.js';

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

    // ✅ Send confirmation email (non-blocking)
    sendEmail({
      to: req.user.email,
      subject: "Booking Confirmed - PropLux",
      html: `
        <h2>Booking Confirmed 🎉</h2>
        <p>Your visit has been scheduled successfully.</p>
        <hr/>
        <p><strong>Property:</strong> ${property.title}</p>
        <p><strong>Location:</strong> ${property.location}</p>
        <p><strong>Visit Date:</strong> ${visitDate}</p>
        <br/>
        <p>Thank you for choosing <strong>PropLux</strong>.</p>
      `,
    }).catch((err) => {
      console.error("Email Error:", err);
    });

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
