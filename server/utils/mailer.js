// utils/mailer.js

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

// Create a reusable transporter using your email service (e.g., Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',  // You can use other services like SendGrid, Mailgun, etc.
  auth: {
    user: process.env.EMAIL_USER,   // Email from which you want to send
    pass: process.env.EMAIL_PASS,   // Email password or app password
  },
});

// Function to send an email
export const sendEnquiryEmail = (enquiryDetails) => {
  const { name, email, propertyId, propertyTitle, message } = enquiryDetails;

  const mailOptions = {
    from: process.env.EMAIL_USER,  // Sender's email address
    to: 'recipient-email@example.com',  // Replace with your recipient email address
    subject: `New Enquiry for Property: ${propertyTitle}`,
    text: `
      You have a new enquiry for the property "${propertyTitle}" (ID: ${propertyId}):
      
      Name: ${name}
      Email: ${email}
      
      Message: ${message}
    `,
  };

  // Send email
  return transporter.sendMail(mailOptions);
};
