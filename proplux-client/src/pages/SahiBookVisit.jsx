import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2"; // ✨ imported

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
      const res = await fetch(`/api/bookings/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ visitDate: date }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Booking failed");

      // 🎉 Confetti Modal
      Swal.fire({
        title: "Booking Confirmed! 🎉",
        text: "Your visit has been successfully booked.",
        icon: "success",
        confirmButtonColor: "#FFD700", // gold color
        backdrop: `
          rgba(0,0,0,0.5)
          url("https://sweetalert2.github.io/images/nyan-cat.gif")
          center top
          no-repeat
        `,
        customClass: {
          popup: 'animated tada faster'
        }
      }).then(() => {
        navigate("/profile"); // after success, go to profile
      });

    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchProperty = async () => {
    try {
      const res = await fetch(`/api/properties/${id}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch property details");

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
          <span className="text-lg font-semibold mb-2 block">Select a date:</span>
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
            )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
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
