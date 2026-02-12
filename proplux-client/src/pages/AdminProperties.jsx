import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL; // ✅ Production API

  const fetchProperties = async () => {
    try {
      const res = await fetch(`${API}/api/properties`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch properties");

      setProperties(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this property?")) return;

    try {
      const res = await fetch(`${API}/api/properties/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");

      setProperties((prev) => prev.filter((p) => p._id !== id));
      toast.success("Deleted successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-white">
        Manage All Properties
      </h1>

      <div className="grid gap-6">
        {loading ? (
          <p className="text-gray-300">Loading...</p>
        ) : properties.length === 0 ? (
          <p className="text-gray-400">No properties found.</p>
        ) : (
          properties.map((p) => (
            <div
              key={p._id}
              className="bg-white text-black p-5 rounded-xl shadow-xl card-shadow flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-bold">{p.title}</h2>
                <p className="text-sm">
                  {p.city}, {p.country}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => navigate(`/edit-property/${p._id}`)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminProperties;
