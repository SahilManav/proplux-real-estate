import Favorite from '../models/Favorite.js';

// Add to favorites
export const addFavorite = async (req, res) => {
  const exists = await Favorite.findOne({
    user: req.user._id,
    property: req.params.id,
  });

  if (exists) return res.status(400).json({ message: 'Already in favorites' });

  const fav = await Favorite.create({
    user: req.user._id,
    property: req.params.id,
  });

  res.status(201).json(fav);
};

// ✅ Safe remove from favorites
export const removeFavorite = async (req, res) => {
  console.log("Trying to remove favorite for user:", req.user._id, "property:", req.params.id);

  const removed = await Favorite.findOneAndDelete({
    user: req.user._id,
    property: req.params.id,
  });

  if (!removed) {
    return res.status(400).json({ message: 'Favorite not found' });
  }

  res.json({ message: 'Removed from favorites' });
};

// Get all favorites for logged-in user
export const getUserFavorites = async (req, res) => {
  const favorites = await Favorite.find({ user: req.user._id }).populate('property');
  const validProperties = favorites
    .filter((fav) => fav.property !== null)
    .map((fav) => fav.property);
  res.json(validProperties);
};
