import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const BookVisit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [property, setProperty] = useState(null);

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/bookings/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ visitDate: date }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Booking failed");

      Swal.fire({
        icon: "success",
        title: "Booking Confirmed 🎉",
        html: `
          <p><strong>${property.title}</strong></p>
          <p>${property.city}, ${property.country}</p>
          <p>Date: ${new Date(date).toLocaleDateString()}</p>
        `,
        confirmButtonText: "OK",
        confirmButtonColor: "#000",
        customClass: {
          popup: "rounded-xl",
        },
      }).then(() => {
        navigate("/properties");
      });
    } catch (err) {
      toast.error(err.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  const fetchProperty = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/properties/${id}`);
      const data = await res.json();
      if (!res.ok) throw new Error("Failed to fetch property");
      setProperty(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchProperty();
  }, [id]);

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-gold">
        Book Your Property Visit
      </h2>

      <form
        onSubmit={handleBooking}
        className="space-y-6 bg-white p-6 rounded-2xl shadow-2xl text-black"
      >
        <label className="block">
          <span className="text-lg font-semibold mb-2 block">
            Select a date:
          </span>
          <input
            type="date"
            className="form-field"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gold text-black font-bold py-3 rounded-lg hover:opacity-90 transition duration-300"
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </form>

      {property && (
        <div className="mt-10 rounded-xl overflow-hidden shadow-2xl">
          <iframe
            title="property-map"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(
              property.city || "India"
            )}&z=13&output=embed`}
            width="100%"
            height="300"
            loading="lazy"
            className="rounded-xl"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default BookVisit;
