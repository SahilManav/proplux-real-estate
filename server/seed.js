import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Property from './models/Property.js'; // Adjust the path if needed

dotenv.config();

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('🌿 MongoDB connected');
    seedData();
  })
  .catch((err) => console.error('❌ MongoDB connection failed', err));

// Sample Luxury Properties
const properties = [
  {
    title: "Oceanfront Villa",
    address: "Palm Beach",
    city: "Miami",
    country: "USA",
    price: 65000000,
    description: "A stunning modern villa with private beach access and panoramic ocean views.",
    rooms: 6,
    bathrooms: 8,
    area: "8500 sq ft",
    images: [
      "https://images.unsplash.com/photo-1560448070-c57b7b580d4e",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
    ],
    amenities: ["Infinity Pool", "Private Cinema", "Wine Cellar"],
    location: { lat: 25.7906, lng: -80.1300 },
  },
  {
    title: "Skyline Penthouse",
    address: "Downtown",
    city: "New York",
    country: "USA",
    price: 92000000,
    description: "Luxury penthouse with a rooftop garden, floor-to-ceiling glass, and skyline views.",
    rooms: 5,
    bathrooms: 6,
    area: "7800 sq ft",
    images: [
      "https://images.unsplash.com/photo-1616627989397-26cda010f4be",
      "https://images.unsplash.com/photo-1599423300746-b62533397364"
    ],
    amenities: ["Smart Home", "Elevator", "Doorman Service"],
    location: { lat: 40.7128, lng: -74.0060 },
  },
  {
    title: "Modern Mountain Retreat",
    address: "Aspen Peaks",
    city: "Aspen",
    country: "USA",
    price: 54000000,
    description: "A serene getaway nestled in the mountains, featuring wooden architecture and ski access.",
    rooms: 4,
    bathrooms: 5,
    area: "6500 sq ft",
    images: [
      "https://images.unsplash.com/photo-1600585153943-838e930d5042",
      "https://images.unsplash.com/photo-1600607687540-c3d3e2e91dc6"
    ],
    amenities: ["Fireplace", "Ski Room", "Heated Garage"],
    location: { lat: 39.1911, lng: -106.8175 },
  },
  {
    title: "Royal Estate Mansion",
    address: "Beverly Hills",
    city: "Los Angeles",
    country: "USA",
    price: 125000000,
    description: "A classic estate with formal gardens, fountains, and luxury throughout.",
    rooms: 10,
    bathrooms: 12,
    area: "12000 sq ft",
    images: [
      "https://images.unsplash.com/photo-1593697820734-151c8e9dc92f",
      "https://images.unsplash.com/photo-1602319684700-7e6fba7b7140"
    ],
    amenities: ["Grand Ballroom", "Library", "Tennis Court"],
    location: { lat: 34.0900, lng: -118.4068 },
  },
];

const seedData = async () => {
  try {
    await Property.deleteMany(); // Clears existing properties
    await Property.insertMany(properties);
    console.log('✅ Properties seeded successfully');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding failed', err);
    process.exit(1);
  }
};
