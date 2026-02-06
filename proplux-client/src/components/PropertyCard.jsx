const PropertyCard = ({
  property,
  favorites,
  toggleFavorite,
  processingId,
  navigate,
}) => {
  return (
    <div
      className="group relative rounded-2xl overflow-hidden
      bg-black shadow-xl hover:shadow-yellow-500/40
      transition-all duration-500 hover:-translate-y-2"
    >
      {/* Image */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover
          group-hover:scale-110 transition duration-700"
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t
          from-black/90 via-black/50 to-transparent"
        />

        {/* Price badge */}
        <span
          className="absolute top-4 left-4
          bg-black/80 text-yellow-400
          px-4 py-1 rounded-full text-sm font-semibold backdrop-blur"
        >
          ₹ {property.price.toLocaleString()}
        </span>

        {/* Title on image */}
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-lg font-bold text-white leading-tight">
            {property.title}
          </h2>
          <p className="text-sm text-gray-300">
            {property.city || "Prime Location"}
          </p>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="flex justify-between items-center px-5 py-4 bg-black">
        <button
          onClick={() => toggleFavorite(property._id)}
          disabled={processingId === property._id}
          className={`text-sm font-semibold transition ${
            favorites.includes(property._id)
              ? "text-red-500"
              : "text-gray-400 hover:text-white"
          }`}
        >
          {favorites.includes(property._id) ? "❤️ Favorited" : "🤍 Favorite"}
        </button>

        <button
          onClick={() => navigate(`/properties/${property._id}`)}
          className="text-sm font-semibold text-yellow-400
          hover:text-yellow-300 transition"
        >
          View Details →
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
