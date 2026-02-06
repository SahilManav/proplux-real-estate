import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchFavorites = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/favorites`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load favorites");

      setFavorites(data);
    } catch (err) {
      toast.error(err.message || "Error loading favorites");
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/favorites/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Failed to remove from favorites");

      setFavorites((prev) => prev.filter((fav) => fav._id !== id));
      toast.info("Removed from favorites");
    } catch (err) {
      toast.error(err.message || "Error removing favorite");
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-300">
        Loading your favorites...
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-14 text-white">
      {/* Heading */}
      <div className="text-center mb-14">
        <h1
          className="text-4xl md:text-5xl font-extrabold tracking-wide
          bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500
          bg-clip-text text-transparent"
        >
          Your Favorite Properties
        </h1>
        <div className="mx-auto mt-4 h-[2px] w-28 bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full" />
      </div>

      {/* EMPTY STATE */}
      {favorites.length === 0 ? (
        <div className="text-center mt-20 space-y-6">
          <div className="text-6xl">💛</div>
          <p className="text-gray-400 text-lg">
            You haven’t added any properties to favorites yet.
          </p>

          <Link
            to="/properties"
            className="inline-block mt-4 px-8 py-3 rounded-full
            bg-gradient-to-r from-yellow-400 to-yellow-500
            text-black font-semibold text-lg
            hover:shadow-[0_0_25px_rgba(234,179,8,0.6)] transition"
          >
            Explore Properties
          </Link>
        </div>
      ) : (
        <>
          {/* FAVORITES GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {favorites.map((property) => (
              <div
                key={property._id}
                className="group bg-black rounded-2xl overflow-hidden
                border border-yellow-500/20 shadow-xl
                hover:shadow-[0_0_30px_rgba(234,179,8,0.3)]
                transition-all duration-500 hover:-translate-y-2"
              >
                {/* IMAGE */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover
                    group-hover:scale-110 transition duration-700"
                  />

                  <span className="absolute top-4 left-4
                    bg-black/80 text-yellow-400
                    px-4 py-1 rounded-full text-sm font-semibold">
                    ₹ {property.price?.toLocaleString()}
                  </span>
                </div>

                {/* CONTENT */}
                <div className="p-5 space-y-2">
                  <h2 className="text-xl font-bold">
                    {property.title}
                  </h2>

                  <p className="text-sm text-gray-400">
                    {property.city || "Unknown City"}
                    {property.country ? `, ${property.country}` : ""}
                  </p>

                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => navigate(`/properties/${property._id}`)}
                      className="text-sm font-semibold text-yellow-400
                      hover:text-yellow-300 transition"
                    >
                      View Details →
                    </button>

                    <button
                      onClick={() => removeFavorite(property._id)}
                      className="text-sm font-semibold text-red-400
                      hover:text-red-500 transition"
                    >
                      ❌ Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-20">
            <Link
              to="/properties"
              className="inline-block px-8 py-3 rounded-full
              border border-yellow-400 text-yellow-400 font-semibold
              hover:bg-yellow-400 hover:text-black transition"
            >
              Browse More Properties
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;
