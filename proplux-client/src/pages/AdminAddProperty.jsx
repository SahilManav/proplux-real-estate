import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminAddProperty = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    address: "",
    city: "",
    country: "",
    image: "",
    rooms: "",
    amenities: [],
    roomsDetail: [],
  });

  /* ---------------- BASIC FIELDS ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ---------------- CLOUDINARY UPLOAD (SAFE) ---------------- */
  const uploadImage = async (file) => {
    if (!file) {
      throw new Error("No file selected");
    }

    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", "proplux_uploads");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dqmyi3x1y/image/upload",
      {
        method: "POST",
        body: fd,
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("Cloudinary error:", data);
      throw new Error(data.error?.message || "Image upload failed");
    }

    return data.secure_url;
  };

  /* ---------------- COVER IMAGE ---------------- */
  const handleCoverUpload = async (e) => {
    try {
      const file = e.target.files[0];
      const url = await uploadImage(file);
      setFormData((prev) => ({ ...prev, image: url }));
      toast.success("Cover image uploaded");
    } catch (err) {
      toast.error(err.message);
    }
  };

  /* ---------------- ROOMS & SPACES ---------------- */
  const addRoom = () => {
    setFormData((prev) => ({
      ...prev,
      roomsDetail: [...prev.roomsDetail, { name: "", image: "" }],
    }));
  };

  const updateRoom = (index, field, value) => {
    const updated = [...formData.roomsDetail];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, roomsDetail: updated }));
  };

  const uploadRoomImage = async (index, file) => {
    if (!file) {
      toast.error("No file selected");
      return;
    }

    try {
      const url = await uploadImage(file);
      updateRoom(index, "image", url);
      toast.success("Room image uploaded");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const removeRoom = (index) => {
    const updated = formData.roomsDetail.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, roomsDetail: updated }));
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ basic validation
    if (!formData.image) {
      toast.error("Cover image is required");
      return;
    }

    if (formData.roomsDetail.length === 0) {
      toast.error("Add at least one room");
      return;
    }

    for (const room of formData.roomsDetail) {
      if (!room.name || !room.image) {
        toast.error("Each room must have a name and image");
        return;
      }
    }

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

      toast.success("🏡 Property added successfully");
      navigate("/admin/manage-properties");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl text-gold font-bold mb-10 text-center">
        Add Luxury Property
      </h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl space-y-6">
        <input name="title" placeholder="Title" className="form-field" onChange={handleChange} required />
        <input name="price" placeholder="Price" type="number" className="form-field" onChange={handleChange} required />
        <input name="address" placeholder="Address" className="form-field" onChange={handleChange} />
        <input name="city" placeholder="City" className="form-field" onChange={handleChange} />
        <input name="country" placeholder="Country" className="form-field" onChange={handleChange} />
        <input name="rooms" placeholder="Total Rooms" type="number" className="form-field" onChange={handleChange} />

        <textarea
          name="description"
          placeholder="Description"
          className="form-field"
          rows="3"
          onChange={handleChange}
        />

        {/* COVER IMAGE */}
        <div className="space-y-2">
          <label className="font-semibold">Cover Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={handleCoverUpload}
          />

          {formData.image && (
            <img
              src={formData.image}
              alt="Cover Preview"
              className="h-40 rounded-lg mt-2 shadow-md"
            />
          )}
        </div>

        {/* ROOMS & SPACES */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Rooms & Spaces</h2>
            <button
              type="button"
              onClick={addRoom}
              className="bg-gold px-4 py-1 rounded"
            >
              + Add Room
            </button>
          </div>

          {formData.roomsDetail.map((room, i) => (
            <div key={i} className="border p-4 rounded-lg mb-4 space-y-2">
              <input
                placeholder="Room Name (Master Bedroom)"
                className="form-field"
                value={room.name}
                onChange={(e) => updateRoom(i, "name", e.target.value)}
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  uploadRoomImage(i, e.target.files && e.target.files[0])
                }
              />

              {room.image && (
                <img
                  src={room.image}
                  alt={room.name}
                  className="h-32 rounded mt-2"
                />
              )}

              <button
                type="button"
                onClick={() => removeRoom(i)}
                className="text-red-600"
              >
                Remove Room
              </button>
            </div>
          ))}
        </div>

        <button
          disabled={loading}
          className="w-full py-3 bg-gold text-black font-bold rounded-xl"
        >
          {loading ? "Adding..." : "Add Property"}
        </button>
      </form>
    </div>
  );
};

export default AdminAddProperty;
