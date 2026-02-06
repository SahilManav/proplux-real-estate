import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    address: "",
    city: "",
    country: "",
    image: "",
    photos: [],
    rooms: "",
    facilities: [],
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`/api/properties/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        setFormData({
          ...data,
          photos: data.photos?.join(",") || "",
          facilities: data.facilities?.join(",") || "",
        });
      } catch {
        toast.error("Failed to fetch property details");
      }
    };

    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "photos" || name === "facilities") {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedData = {
        ...formData,
        photos: formData.photos.split(","),
        facilities: formData.facilities.split(","),
      };

      const res = await fetch(`/api/properties/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Update failed");

      toast.success("Property updated");
      navigate("/admin/properties");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-white">Edit Property</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-xl space-y-4 text-black">
        <input name="title" value={formData.title} placeholder="Title" className="form-field" onChange={handleChange} />
        <input name="description" value={formData.description} placeholder="Description" className="form-field" onChange={handleChange} />
        <input name="price" value={formData.price} type="number" placeholder="Price" className="form-field" onChange={handleChange} />
        <input name="address" value={formData.address} placeholder="Address" className="form-field" onChange={handleChange} />
        <input name="city" value={formData.city} placeholder="City" className="form-field" onChange={handleChange} />
        <input name="country" value={formData.country} placeholder="Country" className="form-field" onChange={handleChange} />
        <input name="image" value={formData.image} placeholder="Cover Image URL" className="form-field" onChange={handleChange} />
        <input name="photos" value={formData.photos} placeholder="Image URLs (comma-separated)" className="form-field" onChange={handleChange} />
        <input name="rooms" value={formData.rooms} type="number" placeholder="Rooms" className="form-field" onChange={handleChange} />
        <input name="facilities" value={formData.facilities} placeholder="Facilities (comma-separated)" className="form-field" onChange={handleChange} />

        <button type="submit" disabled={loading} className="w-full bg-gold text-white py-2 rounded-lg hover:opacity-90">
          {loading ? "Updating..." : "Update Property"}
        </button>
      </form>
    </div>
  );
};

export default EditProperty;
