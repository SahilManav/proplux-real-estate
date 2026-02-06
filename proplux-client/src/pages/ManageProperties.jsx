// src/pages/ManageProperties.jsx

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ManageProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProperties = async () => {
    try {
      const res = await fetch("/api/properties");
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
    if (!window.confirm("Are you sure you want to delete this property?")) return;

    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete property");

      toast.success("Property deleted successfully");
      fetchProperties();
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-white mb-8 border-b-4 border-gold inline-block pb-2">
        Manage Properties
      </h1>

      {/* Add Property Button */}
      <div className="flex justify-end mb-8">
        <Link
          to="/admin/add-property"
          className="inline-flex items-center gap-2 bg-gold text-black font-bold px-6 py-3 rounded-xl hover:bg-yellow-500 transition"
        >
          <span className="text-lg">➕</span> Add New Property
        </Link>
      </div>

      {/* Properties List */}
      {loading ? (
        <p className="text-gray-300 text-center">Loading...</p>
      ) : properties.length === 0 ? (
        <div className="text-center text-gray-400 text-lg mt-20">
          <p>No properties available yet.</p>
          <p className="text-sm mt-2">Start by adding your first luxury listing ✨</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {properties.map((property) => (
            <div key={property._id} className="bg-white text-black p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">
              <h2 className="text-2xl font-bold mb-2">{property.title}</h2>
              <p className="text-gray-600 mb-4">{property.address}</p>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => navigate(`/edit-property/${property._id}`)}
                  className="px-4 py-2 bg-gold text-black rounded-lg hover:bg-yellow-500 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(property._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageProperties;
