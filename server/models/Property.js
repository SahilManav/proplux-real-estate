import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  address: String,
  city: String,
  country: String,

  // Cover image (used in listing)
  image: {
    type: String,
  },

  // Main gallery (slider at top)
  photos: [String],

  // 🏡 Rooms & Spaces (THIS is what you want)
  roomsDetail: [
    {
      name: {
        type: String, // Master Bedroom, Kitchen, etc.
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
  ],

  price: {
    type: Number,
    required: true,
  },

  description: String,

  // Keep count if you want (optional)
  rooms: Number,
  bathrooms: Number,
  area: String,

  amenities: [String],

  location: {
    lat: Number,
    lng: Number,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Property = mongoose.model("Property", propertySchema);
export default Property;
