import Enquiry from '../models/Enquiry.js';
import Property from '../models/Property.js';
import User from '../models/User.js';
import nodemailer from 'nodemailer';

// ✅ Setup Gmail SMTP transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NOTIFY_EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ POST /api/enquiries - Create new enquiry
export const createEnquiry = async (req, res) => {
  const { name, email, message, propertyId, userId } = req.body;

  try {
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email and message are required.' });
    }

    const newEnquiry = await Enquiry.create({
      name,
      email,
      message,
      // property: propertyId || null,
      // user: userId || null,
    });

    console.log(`💌 Enquiry by: ${name}`);
    // console.log(`📬 Sending email from: ${process.env.EMAIL_USER}`);
    console.log(`📬 Sending email from: ${email}`);
    console.log(`📭 To: ${process.env.NOTIFY_EMAIL}`);

    console.log("EMAIL_USER:", process.env.NOTIFY_EMAIL);
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "✅ Loaded" : "❌ Missing");

    const mailOptions = {
      from: email,
      to: process.env.NOTIFY_EMAIL,
      subject: 'New Property Enquiry',
      text: `You have a new enquiry:

From: ${name} (${email})
Property ID: ${propertyId || 'Not Provided'}
Message: ${message}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("✅ Email sent successfully");
    } catch (emailError) {
      console.error("❌ Email failed to send:", emailError);
    }

    res.status(201).json({
      message: 'Enquiry submitted successfully (email may or may not have sent)',
      data: newEnquiry,
    });

  } catch (error) {
    console.error('❌ Error creating enquiry:', error);
    if (!res.headersSent) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

// ✅ GET /api/enquiries - Fetch all enquiries
export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find()
      .populate('property')
      .populate('user')
      .sort({ createdAt: -1 });

    res.status(200).json(enquiries);
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// ✅ DELETE /api/enquiries/:id - Delete enquiry
export const deleteEnquiry = async (req, res) => {
  try {
    await Enquiry.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Enquiry deleted successfully' });
  } catch (error) {
    console.error('Error deleting enquiry:', error);
    res.status(500).json({ message: 'Failed to delete enquiry' });
  }
};
