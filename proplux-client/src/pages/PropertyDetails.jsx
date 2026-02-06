import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH PROPERTY ---------------- */
  const fetchProperty = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/properties/${id}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch property");
      }

      setProperty(data);
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperty();
  }, [id]);

  /* ---------------- STATES ---------------- */
  if (loading) {
    return (
      <p className="text-center mt-10 text-lg text-gray-300">
        Loading property...
      </p>
    );
  }

  if (!property) {
    return (
      <p className="text-center text-red-500 mt-10">
        Property not found
      </p>
    );
  }

  /* ---------------- IMAGE SLIDER (NO DUPLICATES) ---------------- */
  const sliderImages = Array.from(
    new Set([
      ...(property.photos || []),
      ...(property.image ? [property.image] : []),
    ])
  );

  const sliderSettings = {
    dots: true,
    infinite: sliderImages.length > 1,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: sliderImages.length > 1,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-white">

      {/* 🔥 IMAGE SLIDER */}
      {sliderImages.length > 0 && (
        <Slider
          {...sliderSettings}
          className="rounded-xl mb-12 overflow-hidden shadow-lg"
        >
          {sliderImages.map((img, idx) => (
            <div key={idx}>
              <img
                src={img}
                alt={`Property ${idx + 1}`}
                className="w-full h-[600px] object-contain bg-black"
                loading="lazy"
              />
            </div>
          ))}
        </Slider>
      )}

      {/* TITLE & LOCATION */}
      <h1 className="text-4xl font-bold mb-2">
        {property.title}
      </h1>
      <p className="text-lg text-gray-400 mb-8">
        {property.address}, {property.city}, {property.country}
      </p>

      {/* DETAILS */}
      <div className="bg-[#1a1a1a] p-6 rounded-2xl shadow-lg mb-12 space-y-3">
        <p><strong>Price:</strong> ₹{property.price}</p>
        <p><strong>Total Rooms:</strong> {property.rooms}</p>
        <p>
          <strong>Amenities:</strong>{" "}
          {property.amenities?.length > 0
            ? property.amenities.join(", ")
            : "N/A"}
        </p>
        <p><strong>Description:</strong> {property.description}</p>
      </div>

      {/* 🏡 ROOMS & SPACES */}
      {property.roomsDetail?.length > 0 && (
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gold">
            Rooms & Spaces
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {property.roomsDetail.map((room, index) => (
              <div
                key={index}
                className="bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-xl hover:scale-[1.02] transition"
              >
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
                <div className="p-4 text-center">
                  <h3 className="text-xl font-semibold">
                    {room.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MAP */}
      <div className="rounded-xl overflow-hidden shadow-2xl mb-12">
        <iframe
          title="property-map"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(
            property.city || "India"
          )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
          width="100%"
          height="320"
          loading="lazy"
        />
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex items-center gap-6">
        <button
          onClick={() => navigate(`/book/${id}`)}
          className="bg-gold text-black px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition"
        >
          Book Your Visit
        </button>

        <button
          onClick={() => toast.success("Added to favorites!")}
          className="bg-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-600 transition"
        >
          ❤️ Favorite
        </button>
      </div>
    </div>
  );
};

export default PropertyDetails;
