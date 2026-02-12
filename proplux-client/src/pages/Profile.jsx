import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL; // ✅ Production API URL

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBookings, setShowBookings] = useState(false);

  const fetchBookings = async () => {
    try {
      const res = await fetch(`${API}/api/bookings/my`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch bookings");
      setBookings(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      const res = await fetch(`${API}/api/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Cancel failed");
      toast.success("Booking cancelled");
      fetchBookings();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate("/login");
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 text-white">

      {/* PROFILE HERO CARD */}
      <div className="bg-gradient-to-br from-[#111] to-[#1c1c1c] border border-gold rounded-2xl p-8 shadow-2xl flex flex-col md:flex-row items-center gap-8">
        {user?.image ? (
          <img
            src={user.image}
            alt="Profile"
            referrerPolicy="no-referrer"
            className="w-28 h-28 rounded-full border-4 border-gold object-cover shadow-lg"
          />
        ) : (
          <div className="w-28 h-28 rounded-full border-4 border-gold flex items-center justify-center text-gold text-4xl font-bold shadow-lg">
            {user?.name?.charAt(0)}
          </div>
        )}

        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-1">
            Hello, {user?.name}
          </h1>
          <p className="text-gray-400">
            {user?.email}
          </p>
          <p className="text-gold mt-1">
            Role: {user?.isAdmin ? "Admin" : "User"}
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={handleLogout}
              className="bg-red-600 px-6 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>

            <button
              onClick={() => setShowBookings((prev) => !prev)}
              className="bg-gold text-black px-6 py-2 rounded-lg hover:bg-yellow-500 transition"
            >
              {showBookings ? "Hide Bookings" : "View Bookings"}
            </button>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
        <div className="bg-[#111] border border-gold rounded-xl p-6 text-center hover:scale-[1.02] transition">
          <p className="text-gray-400">Total Bookings</p>
          <p className="text-4xl font-bold text-gold mt-2">
            {bookings.length}
          </p>
        </div>

        <div className="bg-[#111] border border-gold rounded-xl p-6 text-center hover:scale-[1.02] transition">
          <p className="text-gray-400">Account Type</p>
          <p className="text-3xl font-bold text-gold mt-2">
            {user?.isAdmin ? "Admin" : "User"}
          </p>
        </div>
      </div>

      {/* BOOKINGS */}
      {showBookings && (
        <div className="mt-12 bg-white text-black rounded-2xl p-6 shadow-xl">
          <h2 className="text-2xl font-bold mb-6">
            My Bookings
          </h2>

          {loading ? (
            <p>Loading...</p>
          ) : bookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            bookings.map((b) => (
              <div
                key={b._id}
                className="border rounded-lg p-4 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition"
              >
                <div>
                  <p className="font-bold text-lg">
                    🏡 {b.property?.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    📍 {b.property?.address}, {b.property?.city}, {b.property?.country}
                  </p>
                  <p className="text-sm text-gray-700">
                    📅 {new Date(b.visitDate).toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={() => cancelBooking(b._id)}
                  className="bg-red-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Cancel Booking
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* ADMIN PANEL */}
      {user?.isAdmin && (
        <div className="mt-14 bg-[#111] border border-gold rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-gold mb-4">
            Admin Panel
          </h2>
          <p className="text-gray-400 mb-6">
            Manage listings, properties and platform data
          </p>
          <Link
            to="/admin/manage-properties"
            className="inline-block bg-gold text-black px-8 py-3 rounded-lg hover:bg-yellow-500 transition"
          >
            Go to Manage Properties
          </Link>
        </div>
      )}
    </div>
  );
};

export default Profile;
