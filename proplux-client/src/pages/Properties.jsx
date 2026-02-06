import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PropertyCard from "../components/PropertyCard";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const RECENT_KEY = "recentlyViewed";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [processingId, setProcessingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState("");
  const [sortOption, setSortOption] = useState("");
  const navigate = useNavigate();

  const fetchProperties = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/properties`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load properties");
      setProperties(data);
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/favorites`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setFavorites(data.filter((p) => p?._id).map((p) => p._id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProperties();
    fetchFavorites();

    const stored = JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
    setRecentlyViewed(stored);
  }, []);

  const handleView = (property) => {
    const stored = JSON.parse(localStorage.getItem(RECENT_KEY)) || [];

    const updated = [
      property,
      ...stored.filter((p) => p._id !== property._id),
    ].slice(0, 4);

    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
    setRecentlyViewed(updated);

    navigate(`/properties/${property._id}`);
  };

  const toggleFavorite = async (id) => {
    if (processingId === id) return;
    setProcessingId(id);

    try {
      const isFav = favorites.includes(id);
      const res = await fetch(`${API_BASE_URL}/favorites/${id}`, {
        method: isFav ? "DELETE" : "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setFavorites((prev) =>
        isFav ? prev.filter((fid) => fid !== id) : [...prev, id]
      );

      toast[isFav ? "info" : "success"](
        isFav ? "Removed from favorites" : "Added to favorites"
      );
    } catch (err) {
      toast.error(err.message || "Failed to update favorite");
    } finally {
      setProcessingId(null);
    }
  };

  const cities = [...new Set(properties.map((p) => p.city).filter(Boolean))];

  const filtered = properties
    .filter((p) => (selectedCity ? p.city === selectedCity : true))
    .sort((a, b) => {
      if (sortOption === "low") return a.price - b.price;
      if (sortOption === "high") return b.price - a.price;
      return 0;
    });

  if (loading) {
    return <p className="text-center text-white mt-20">Loading properties...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-14">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1
          className="text-4xl md:text-5xl font-extrabold tracking-wide
          bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500
          bg-clip-text text-transparent"
        >
          Explore Luxury Properties
        </h1>
        <div className="mx-auto mt-4 h-[2px] w-24 bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full" />
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="bg-black/50 backdrop-blur-md text-yellow-300
          border border-yellow-500/40 rounded-full px-6 py-2
          shadow-lg hover:shadow-yellow-500/30 transition"
        >
          <option value="">All Cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="bg-black/50 backdrop-blur-md text-yellow-300
          border border-yellow-500/40 rounded-full px-6 py-2
          shadow-lg hover:shadow-yellow-500/30 transition"
        >
          <option value="">Sort by Price</option>
          <option value="low">Low → High</option>
          <option value="high">High → Low</option>
        </select>
      </div>

      {/* All Properties */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
        {filtered.map((property) => (
          <PropertyCard
            key={property._id}
            property={property}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            processingId={processingId}
            navigate={() => handleView(property)}
          />
        ))}
      </div>

      {/* Recently Viewed (BOTTOM) */}
      {recentlyViewed.length > 0 && (
        <div className="border-t border-yellow-500/20 pt-14">
          <h2 className="text-3xl font-bold text-yellow-400 mb-8">
            Recently Viewed
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {recentlyViewed.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                processingId={processingId}
                navigate={() => handleView(property)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Properties;
