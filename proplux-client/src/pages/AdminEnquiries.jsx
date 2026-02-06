import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = async () => {
    try {
      const res = await fetch("/api/enquiries", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch enquiries");

      setEnquiries(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");

      setEnquiries((prev) => prev.filter((e) => e.id !== id));
      toast.success("Enquiry deleted");
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-white">
      <h1 className="text-3xl font-bold mb-6">All Enquiries</h1>

      {loading ? (
        <p>Loading...</p>
      ) : enquiries.length === 0 ? (
        <p>No enquiries found.</p>
      ) : (
        <ul className="space-y-4">
          {enquiries.map((enquiry) => (
            <li key={enquiry.id} className="bg-white text-black p-4 rounded-xl">
              <p><strong>Name:</strong> {enquiry.name}</p>
              <p><strong>Email:</strong> {enquiry.email}</p>
              <p><strong>Message:</strong> {enquiry.message}</p>
              <button
                onClick={() => handleDelete(enquiry.id)}
                className="mt-2 bg-red-600 text-white px-4 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminEnquiries;
