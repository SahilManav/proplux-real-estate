import Favorite from '../models/Favorite.js';

export const getAllUserFavorites = async (req, res) => {
  const favorites = await Favorite.find({})
    .populate('user', 'name email')
    .populate('property', 'title image');

  const grouped = {};

  favorites.forEach((fav) => {
    const userEmail = fav.user?.email || "Unknown";
    if (!grouped[userEmail]) {
      grouped[userEmail] = {
        name: fav.user?.name || "No Name",
        email: userEmail,
        properties: [],
      };
    }

    grouped[userEmail].properties.push({
      title: fav.property?.title,
      image: fav.property?.image,
      id: fav.property?._id,
    });
  });

  res.json(Object.values(grouped));
};
