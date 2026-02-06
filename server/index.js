import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js'; // 🔗 Import auth routes
import propertyRoutes from './routes/propertyRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
// import enquiryRoutes from './routes/enquiryRoutes.js';


dotenv.config({ path: './.env' });
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? '✅ Loaded' : '❌ Not Loaded');


const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.use('/api/auth', authRoutes); // 🧠 Register/Login routes
app.use('/api/properties', propertyRoutes);// 🏠 Property routes
app.use('/api/favorites', favoriteRoutes);// 🏷️ Favorite routes
app.use('/api/bookings', bookingRoutes);// 🏷️ Booking routes
// app.use('/api/enquiries', enquiryRoutes);// 🏷️ Enquiry routes
app.use('/api/admin', adminRoutes); // 🏷️ Admin routes

// Test route
app.get('/', (req, res) => {
  res.send('PropLux Backend Working!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
