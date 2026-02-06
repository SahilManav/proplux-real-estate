import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const AdminFavorites = () => {
  const [data, setData] = useState([]);

  const fetchFavorites = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/favorites`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to load favorites");

      setData(result);
    } catch (err) {
      toast.error(err.message || "Error loading favorites");
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold text-gold mb-6 text-center">
        Admin - Favorites Overview
      </h1>

      {data.length === 0 ? (
        <p className="text-center text-gray-400">No favorites found.</p>
      ) : (
        data.map((user, i) => (
          <div key={i} className="mb-10 border-b border-gold pb-6">
            <h2 className="text-xl font-semibold mb-3">
              {user.name} ({user.email})
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {user.properties.map((prop, index) =>
                prop && prop.image && prop.title ? (
                  <div key={prop.id || index} className="bg-white text-black p-4 rounded-xl shadow-lg">
                    <img
                      src={prop.image}
                      alt={prop.title}
                      className="w-full h-40 object-cover rounded-lg mb-2"
                    />
                    <p className="font-semibold">{prop.title}</p>
                  </div>
                ) : (
                  <div key={index} className="bg-gray-800 text-white p-4 rounded-xl shadow-inner">
                    <p className="text-sm italic text-gray-400">❌ Deleted or broken property</p>
                  </div>
                )
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminFavorites;
