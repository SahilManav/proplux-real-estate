import { useState } from "react";
import { toast } from "react-toastify";

const AddProperty = () => {
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
    facilities: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "photos") {
      setFormData({ ...formData, photos: value.split(",") });
    } else if (name === "facilities") {
      setFormData({ ...formData, facilities: value.split(",") });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add property");

      toast.success("Property added successfully");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-white">Add New Property</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-xl space-y-4 text-black">
        <input name="title" placeholder="Title" className="form-field" onChange={handleChange} required />
        <input name="description" placeholder="Description" className="form-field" onChange={handleChange} required />
        <input name="price" placeholder="Price" type="number" className="form-field" onChange={handleChange} required />
        <input name="address" placeholder="Address" className="form-field" onChange={handleChange} />
        <input name="city" placeholder="City" className="form-field" onChange={handleChange} />
        <input name="country" placeholder="Country" className="form-field" onChange={handleChange} />
        <input name="image" placeholder="Cover Image URL" className="form-field" onChange={handleChange} />
        <input name="photos" placeholder="Image URLs (comma-separated)" className="form-field" onChange={handleChange} />
        <input name="rooms" placeholder="Rooms" type="number" className="form-field" onChange={handleChange} />
        <input name="facilities" placeholder="Facilities (comma-separated)" className="form-field" onChange={handleChange} />

        <button type="submit" disabled={loading} className="w-full bg-gold text-white py-2 rounded-lg hover:opacity-90">
          {loading ? "Adding..." : "Add Property"}
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
